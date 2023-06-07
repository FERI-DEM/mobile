import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from "react-native";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import Button from "../components/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import useCalibrationMutation from "../hooks/useCalibrationMutation";
import {CalibrationDataType} from "../types/powerPlant.types";
import {CalibrationDataSchema} from "../schemas/calibration.schema";
import {usePowerPlantStore} from "../store/power-plant-store";
import {ApiError, FormMessage, FormMessageType} from "../types/common.types";
import {useToastStore} from "../store/toast-store";
import {PowerPlantsTab, useDashboardTabsStore} from "../store/dashboard-tabs-store";
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";
import {useUserStore} from "../store/user-store";
import {UserState} from "../types/user.types";
import {ToastTypes} from "../types/toast.types";

const DefaultCalibrationData: CalibrationDataType = {
    production: 0,
}

const CalibrationForm: FC = () => {
    const selectedPowerPlant = usePowerPlantStore(state => state.selectedPowerPlant)
    const setActiveTab = useDashboardTabsStore(state => state.setActiveTab)
    const {mutate: calibrate, isLoading: calibrateLoading} = useCalibrationMutation();
    const [message, setMessage] = useState<FormMessage>({type: FormMessageType.DEFAULT, text: ''});
    const setUserState = useUserStore(state => state.setUserState)

    const { showToast } = useToastStore();


    const form = useForm({
        resolver: zodResolver(CalibrationDataSchema),
        defaultValues: DefaultCalibrationData
    });
    const onSubmit: SubmitHandler<CalibrationDataType> = (data) => {
        if(selectedPowerPlant) {
            calibrate({id: selectedPowerPlant.id, power: data.production}, {
                onSuccess: () => {
                    form.reset();
                    console.log('CALIBRATED')
                    setUserState(UserState.USER)
                    setActiveTab(PowerPlantsTab.DASHBOARD)
                    navigate(Routes.DASHBOARD)
                    showToast('Uspešno kalibrirano!', ToastTypes.SUCCESS)
                },
                onError: (err: ApiError) => {
                    showToast('Napaka pri kalibriranju!', ToastTypes.ERROR)
                    setMessage({type: FormMessageType.ERROR, text: err.error})
                }
            });
        }
    }

    return (
        <View className="dark:bg-dark-main flex-1 px-3">
            <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
                <View className='px-2'>
                    <FormProvider {...form}>
                        <ControlledInput
                            name="production"
                            label="Trenutna proizvodnja elektrarne"
                            placeholder="Proizvodnja"
                        />
                        <Text className={`pl-0.5 mt-2 ${message.type === FormMessageType.SUCCESS ? 'text-tint' : 'text-warning'}`}>{message.text}</Text>
                        <Button
                            text="Potrdi"
                            classname='mt-2 w-24 h-11'
                            onPress={form.handleSubmit(onSubmit)}
                            loading={calibrateLoading}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    );
};

export default CalibrationForm;
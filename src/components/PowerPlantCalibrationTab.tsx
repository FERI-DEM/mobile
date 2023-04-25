import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from "react-native";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import Button from "../components/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import useCalibration from "../hooks/useCalibration";
import {CalibrationDataType} from "../types/powerPlant.types";
import {CalibrationDataSchema} from "../schemas/calibration.schema";
import {usePowerPlantStore} from "../store/power-plant-store";
import {ApiError, FormMessage, FormMessageType} from "../types/common.types";

const DefaultCalibrationData: CalibrationDataType = {
    production: 0,
}

const PowerPlantCalibrationTab: FC = () => {
    const {id: selectedPowerPlantID} = usePowerPlantStore(state => state.selectedPowerPlant)
    const {mutate: calibrate} = useCalibration();
    const [message, setMessage] = useState<FormMessage>({type: FormMessageType.DEFAULT, text: ''});

    const form = useForm({
        resolver: zodResolver(CalibrationDataSchema),
        defaultValues: DefaultCalibrationData
    });
    const onSubmit: SubmitHandler<CalibrationDataType> = (data) => {
        calibrate({id: selectedPowerPlantID, power: data.production},{
            onSuccess: () => {
                form.reset();
                setMessage({type: FormMessageType.SUCCESS, text: 'Uspešno kalibrirano!'})
            },
            onError: (err: ApiError) => {
                setMessage({type: FormMessageType.ERROR, text: err.error})
            }
        });
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
                        <Text className={`pl-0.5 mt-2 ${message.type === 'success' ? 'text-tint' : 'text-warning'}`}>{message.text}</Text>
                        <Button
                            text="Potrdi"
                            classname='mt-2'
                            onPress={form.handleSubmit(onSubmit)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    );
};

export default PowerPlantCalibrationTab;
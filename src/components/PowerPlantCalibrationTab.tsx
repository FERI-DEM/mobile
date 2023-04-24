import React, {FC} from 'react';
import {ScrollView, View} from "react-native";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import Button from "../components/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import useCalibration from "../hooks/useCalibration";
import {CalibrationDataType} from "../types/powerPlant.types";
import {CalibrationDataSchema} from "../schemas/calibration.schema";
import {usePowerPlantStore} from "../store/power-plant-store";

const DefaultCalibrationData: CalibrationDataType = {
    production: 0,
}

const PowerPlantCalibrationTab: FC = () => {
    const {id: selectedPowerPlantID} = usePowerPlantStore(state => state.selectedPowerPlant)
    const {mutate} = useCalibration();

    const form = useForm({
        resolver: zodResolver(CalibrationDataSchema),
        defaultValues: DefaultCalibrationData
    });
    const onSubmit: SubmitHandler<CalibrationDataType> = (data) => {
        mutate({id: selectedPowerPlantID, power: data.production});
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
                        <Button
                            text="Potrdi"
                            classname='mt-7'
                            onPress={form.handleSubmit(onSubmit)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    );
};

export default PowerPlantCalibrationTab;
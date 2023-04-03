import React, {FC} from 'react';
import {ScrollView, View} from "react-native";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "../components/ControlledInput";
import Button from "../components/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import useCalibration from "../hooks/usePowerPlant";
import {CalibrationDataType} from "../types/powerPlant.types";
import {CalibrationDataSchema} from "../schemas/calibration.schema";

const DefaultCalibrationData: CalibrationDataType = {
    production: 0,
}

const CalibrationScreen: FC = () => {
    const form = useForm({
        resolver: zodResolver(CalibrationDataSchema),
        defaultValues: DefaultCalibrationData
    });

    //hardcoded id!
    const {mutate} = useCalibration();
    const onSubmit: SubmitHandler<CalibrationDataType> = (data) => {
        console.log("Submitted data: ", data);
        mutate({id: '6426e931890371798019f58e', power: data.production});
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

export default CalibrationScreen;
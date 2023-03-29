import React, {FC} from 'react';
import {ScrollView, View} from "react-native";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "../components/ControlledInput";
import Button from "../components/Button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import useCalibration from "../hooks/usePowerPlant";

const CalibrationDataSchema = z.object({
    production: z.coerce.number().min(0, { message: "Production cannot be lower than 0"}).max(1000000, { message: "Production cannot be over 1000000" }),
});

type CalibrationDataType = z.infer<typeof CalibrationDataSchema>

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
        mutate({id: '641496bb20b52f8b894f9462', power: data.production});
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
import React, {FC} from 'react';
import {ScrollView, View} from "react-native";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "../components/ControlledInput";
import Button from "../components/Button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Header} from "../store/header-store";

const CalibrationDataSchema = z.object({
    production: z.coerce.number().min(0, { message: "Production cannot be lower than 0"}).max(1000000, { message: "Production cannot be over 1000000" }),
});

type CalibrationDataType = z.infer<typeof CalibrationDataSchema>

const DefaultCalibrationData: CalibrationDataType = {
    production: 0,
}

const CalibrationScreen: FC = () => {
    const methods = useForm({
        resolver: zodResolver(CalibrationDataSchema),
        defaultValues: DefaultCalibrationData
    });

    const onSubmit: SubmitHandler<CalibrationDataType> = (data) => {
        console.log("Submitted data: ", data);
    }

    return (
        <View className="dark:bg-dark-main flex-1 px-3">
            <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
                <View className='px-2'>
                    <FormProvider {...methods}>
                        <ControlledInput
                            name="production"
                            label="Trenutna proizvodnja elektrarne"
                            placeholder="Proizvodnja"
                        />
                        <Button
                            text="Potrdi"
                            classname='mt-7'
                            onPress={methods.handleSubmit(onSubmit)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    );
};

export default CalibrationScreen;
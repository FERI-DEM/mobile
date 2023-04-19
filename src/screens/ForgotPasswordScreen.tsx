import React, {FC, useState} from 'react';
import {Text, View} from "react-native";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "../components/ControlledInput";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {ForgotPasswordSchema} from "../schemas/user.schema";
import Button from "../components/Button";
import {ForgotPasswordType} from "../types/user.types";
import {passwordReset} from "../config/firebase";

const DefaultResetPasswordData = {
    email: ''
}
const ForgotPasswordScreen:FC = () => {
    const [success, setSuccess] = useState<string | null>()

    const form = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: DefaultResetPasswordData
    });

    const onSubmit: SubmitHandler<ForgotPasswordType> = async (data) => {
        await passwordReset(data.email).then(() => {
            setSuccess('Na vaš elektronski naslov smo poslali povezavo za ponastavitev gesla');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <View className='flex-1 bg-dark-main px-3 pt-5'>
            <View className='px-6 mt-5'>
                <FormProvider {...form}>
                    <ControlledInput
                        name="email"
                        label="Elektronski naslov"
                        placeholder="jon.doe@email.com"
                        keyboardType="email-address"
                    />
                    {success && <Text className='pl-0.5 text-tint pt-1.5'>{success}</Text>}
                    <Button
                        text="Pošlji"
                        classname='mt-7'
                        onPress={form.handleSubmit(onSubmit)}
                    />
                </FormProvider>
            </View>
        </View>
    );
};

export default ForgotPasswordScreen;
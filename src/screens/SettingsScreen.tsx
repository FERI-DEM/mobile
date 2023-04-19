import {ScrollView, Text, View} from "react-native";
import Button from "../components/Button";
import {auth, updatePasswordFoo} from "../config/firebase";
import {signOut} from 'firebase/auth'
import {useAuthentication} from "../hooks/useAuthentication";
import React, {useEffect, useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "../components/ControlledInput";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangePasswordSchema} from "../schemas/user.schema";
import {ChangePasswordType} from "../types/user.types";
import {twMerge} from "tailwind-merge";

const DefaultChangePasswordData: ChangePasswordType = {
    password: '',
    confirmPassword: ''
}

const SettingsScreen = () => {
    const {user} = useAuthentication();
    const [provider, setProvider] = useState<string>('')
    const [formOpened, setFormOpened] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>('')

    const form = useForm({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: DefaultChangePasswordData
    });
    const logout = () => {
        signOut(auth).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        user?.providerData.forEach((userInfo) => {
            setProvider(userInfo.providerId);
        })
    }, [user])

    const onSubmit: SubmitHandler<ChangePasswordType> = async (data) => {
        if (data.password !== data.confirmPassword)
            return form.setError('root', {type: 'manual', message: 'Gesli se ne ujemata'});
        await updatePasswordFoo(data.password).then(() => {
            setSuccess('Geslo uspešno spremenjeno');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <View className='flex-1 bg-dark-main px-3 pt-5'>
            <ScrollView className='w-full flex' keyboardShouldPersistTaps='always'>
            {provider === 'password' && (
                <View className='px-2 my-5'>
                    <Text className='text-white text-base font-bold' onPress={() => setFormOpened(!formOpened)}>Spremeni geslo</Text>
                    {formOpened && (
                        <FormProvider {...form}>
                            <ControlledInput
                                name="password"
                                label="Novo geslo"
                                placeholder="********"
                                secureTextEntry
                                classNameContainer='mt-5'
                            />
                            <ControlledInput
                                name="confirmPassword"
                                label="Potrdi novo geslo"
                                placeholder="********"
                                secureTextEntry
                                classNameContainer='mt-5'
                            />
                            {!!form.formState.errors.root?.message && <Text
                                className={twMerge('pl-0.5 text-warning pt-1.5')}>{form.formState.errors.root?.message}</Text>}
                            <Text className='pl-0.5 text-tint pt-1.5'>{success}</Text>
                            <Button
                                text="Posodobi"
                                classname='mt-7'
                                onPress={form.handleSubmit(onSubmit)}
                            />
                        </FormProvider>
                        )}
                </View>
            )}
            </ScrollView>
            <Button text='Odjava' onPress={logout} classname='bg-danger m-auto'/>
        </View>
    );
}
export default SettingsScreen
import {ScrollView, Text, View} from "react-native";
import Button from "../components/Button";
import {auth, updatePasswordFoo} from "../config/firebase";
import {signOut} from 'firebase/auth'
import React, {useEffect, useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "../components/ControlledInput";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangePasswordSchema} from "../schemas/user.schema";
import {ChangePasswordType} from "../types/user.types";
import {twMerge} from "tailwind-merge";
import {useUserStore} from "../store/user-store";
import {useToastStore} from "../store/toast-store";
import {ToastTypes} from "../types/toast.types";

const DefaultChangePasswordData: ChangePasswordType = {
    password: '',
    confirmPassword: ''
}

const SettingsScreen = () => {
    const {user} = useUserStore();
    const [provider, setProvider] = useState<string>('')
    const [formOpened, setFormOpened] = useState<boolean>(true)
    const showToast = useToastStore(state => state.showToast);

    const form = useForm({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: DefaultChangePasswordData
    });
    const logout = async () => {
        try{
            await signOut(auth)
        }
        catch (e) {
            showToast('Napaka pri odjavi', ToastTypes.ERROR)
        }
    }

    useEffect(() => {
        user?.providerData.forEach((userInfo) => {
            setProvider(userInfo.providerId);
        })
    }, [user])

    const onSubmit: SubmitHandler<ChangePasswordType> = async (data) => {
        if (data.password !== data.confirmPassword)
            return form.setError('root', {type: 'manual', message: 'Gesli se ne ujemata'});
        try{
            await updatePasswordFoo(data.password)
            showToast('Geslo uspešno posodobljeno', ToastTypes.SUCCESS)
        }
        catch (e) {
            showToast('Napaka pri posodabljanju gesla', ToastTypes.ERROR)
        }
    }

    return (
        <View className='flex-1 bg-dark-main px-3 pt-5'>
            <ScrollView className='w-full flex flex-1' contentContainerStyle={{flexGrow: 1}}  keyboardShouldPersistTaps='always'>
               <View className='h-full'>
                   <View className='px-2'>
                       <Text className='text-white text-base font-bold mb-2'>Profil</Text>
                       <Text className='text-white text-base mb-4'>{user?.email}</Text>
                   </View>
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
                                   <Button
                                       text="Posodobi"
                                       classname='mt-7'
                                       onPress={form.handleSubmit(onSubmit)}
                                   />
                               </FormProvider>
                           )}
                       </View>
                   )}
                   <Button text='Odjava' onPress={logout} classname='bg-danger m-auto mb-4'/>
               </View>
            </ScrollView>
        </View>
    );
}
export default SettingsScreen
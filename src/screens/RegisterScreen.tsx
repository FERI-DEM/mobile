import { ScrollView, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Button from '../components/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ControlledInput } from '../components/ControlledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import { BaseRegisterType } from '../types/user.types';
import { BaseRegisterSchema } from '../schemas/user.schema';


const DefaultRegisterData: BaseRegisterType = {
    email: '',
    password: '',
    confirmPassword: ''
}

const RegisterScreen = () => {
    const form = useForm({
        resolver: zodResolver(BaseRegisterSchema),
        defaultValues: DefaultRegisterData
    });


    const createAccount: SubmitHandler<BaseRegisterType> = async (data) => {
        if (data.password !== data.confirmPassword)
            return form.setError('root', {type: 'manual', message: 'Gesli se ne ujemata'})
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
        } catch (e) {
            form.setError('root', {
                type: 'manual',
                message: 'Registracija ni uspela. Poskusite ponovno čez nekaj časa.'
            })
        }
    };


    return (
        <View className='flex-1 items-center dark:bg-dark-main'>
            <View className='flex w-full justify-center'>
                <Svg width="100%" height="263" viewBox="0 0 390 263" fill="none">
                    <Path fill-rule="evenodd" clip-rule="evenodd"
                          d="M190.39 -133.382C255.918 -127.803 327.827 -139.887 373.896 -98.7146C424.524 -53.4683 436.472 13.7329 424.97 76.2637C412.34 144.931 381.081 215.767 310.255 247.284C238.063 279.408 155.138 256.577 80.2113 229.675C-3.05431 199.779 -96.7114 167.391 -122.491 91.9084C-149.618 12.4795 -117.236 -81.6408 -44.0973 -134.305C19.4134 -180.036 108.541 -140.351 190.39 -133.382Z"
                          fill="#236BFE"/>
                </Svg>
                <Text className='text-4xl text-white font-bold text-center absolute ml-6'>Registracija</Text>
            </View>
            <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
                <View className='px-6'>
                    <FormProvider {...form}>
                        <ControlledInput
                            name="email"
                            label="Elektronski naslov"
                            placeholder="jon.doe@email.com"
                            keyboardType="email-address"
                        />
                        <ControlledInput
                            name="password"
                            label="Geslo"
                            secureTextEntry
                            classNameContainer='mt-5'
                            placeholder="**********"
                        />
                        <ControlledInput
                            name="confirmPassword"
                            label="Potrdi geslo"
                            secureTextEntry
                            classNameContainer='mt-5'
                            placeholder="**********"
                        />
                        {!!form.formState.errors.root?.message && <Text
                            className={twMerge('pl-0.5 text-warning pt-1.5')}>{form.formState.errors.root?.message}</Text>}
                        <Button
                            loading={form.formState.isSubmitting}
                            text="Potrdi"
                            classname='mt-7 w-20 h-11'
                            onPress={form.handleSubmit(createAccount)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    )
}
export default RegisterScreen
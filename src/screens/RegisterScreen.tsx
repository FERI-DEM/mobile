import {ScrollView, Text, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import Button from "../components/Button";
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import {ControlledInput} from "../components/ControlledInput";
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";

const RegisterDataSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
});

type RegisterDataType = z.infer<typeof RegisterDataSchema>

const DefaultRegisterData: RegisterDataType = {
    email: '',
    password: ''
}

const RegisterScreen = () => {
    const methods = useForm({
        resolver: zodResolver(RegisterDataSchema),
        defaultValues: DefaultRegisterData
    });

    const onSubmit: SubmitHandler<RegisterDataType> = (data) => {
        console.log({data});
        navigate(Routes.REGISTER_DETAILS)
    };

    const onError: SubmitErrorHandler<RegisterDataType> = (errors, e) => {
        return console.log({errors})
    }

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
                    <FormProvider {...methods}>
                        <ControlledInput
                            name="email"
                            label="Email"
                            placeholder="jon.doe@email.com"
                            keyboardType="email-address"
                        />
                        <ControlledInput
                            name="password"
                            label="Password"
                            secureTextEntry
                            classNameContainer='mt-5'
                            placeholder="**********"
                        />
                        <Button
                            text="Potrdi"
                            classname='mt-7'
                            onPress={methods.handleSubmit(onSubmit, onError)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    )
}
export default RegisterScreen
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ControlledInput } from '../components/ControlledInput';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { ForgotPasswordSchema } from '../schemas/user.schema';
import Button from '../components/Button';
import { ForgotPasswordType } from '../types/user.types';
import { passwordReset } from '../config/firebase';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants/colors';

const DefaultResetPasswordData = {
  email: '',
};
const ForgotPasswordScreen: FC = () => {
  const { showToast } = useToastStore();

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: DefaultResetPasswordData,
  });

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (data) => {
    await passwordReset(data.email)
      .then(() => {
        showToast(
          'Na vaš elektronski naslov smo poslali povezavo za ponastavitev gesla!',
          ToastTypes.INFORMATION
        );
      })
      .catch(() => {
        showToast(
          'Napaka pri pošiljanju povezave za ponastavitev gesla. Poskusite kasneje!',
          ToastTypes.ERROR
        );
      });
  };

  return (
    <View className="flex-1 bg-dark-main ">
      <View className="flex w-full justify-center">
        <Svg width="100%" height="263" viewBox="0 0 390 263" fill="none">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M190.39 -133.382C255.918 -127.803 327.827 -139.887 373.896 -98.7146C424.524 -53.4683 436.472 13.7329 424.97 76.2637C412.34 144.931 381.081 215.767 310.255 247.284C238.063 279.408 155.138 256.577 80.2113 229.675C-3.05431 199.779 -96.7114 167.391 -122.491 91.9084C-149.618 12.4795 -117.236 -81.6408 -44.0973 -134.305C19.4134 -180.036 108.541 -140.351 190.39 -133.382Z"
            fill={colors.common.tint}
          />
        </Svg>
        <Text className="text-3xl text-white font-bold text-center absolute ml-6">
          Ponastavitev gesla
        </Text>
      </View>
      <View className="px-6 mt-5">
        <FormProvider {...form}>
          <ControlledInput
            name="email"
            label="Elektronski naslov"
            placeholder="janez.novak@gmail.com"
            keyboardType="email-address"
          />
          <Text className="text-gray-500 my-2">
            {
              'Vnesite vaš email, kamor vam bomo poslali napotke za ponastavitev gesla.'
            }
          </Text>
          <Button
            text="Pošlji"
            classname="mt-7"
            onPress={form.handleSubmit(onSubmit)}
          />
        </FormProvider>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

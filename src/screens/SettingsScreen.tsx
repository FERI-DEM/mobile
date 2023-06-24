import { ScrollView, Text, View } from 'react-native';
import Button from '../components/Button';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ControlledInput } from '../components/ControlledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema } from '../schemas/user.schema';
import { ChangePasswordType } from '../types/user.types';
import { twMerge } from 'tailwind-merge';
import { useUserStore } from '../store/user-store';
import useSignOut from '../hooks/useSignOut';
import useUpdatePasswordMutation from '../hooks/useUpdatePasswordMutation';
import ColorSchemeToggle from "../components/ColorSchemeToggle";

const DefaultChangePasswordData: ChangePasswordType = {
  password: '',
  confirmPassword: '',
};

const SettingsScreen = () => {
  const { user } = useUserStore();
  const [provider, setProvider] = useState<string>('');
  const [formOpened, setFormOpened] = useState<boolean>(true);
  const { mutate: signOut, isLoading: isSignOutLoading } = useSignOut();
  const { mutate: updatePassword, isLoading: isUpdatePasswordLoading } =
    useUpdatePasswordMutation();

  const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: DefaultChangePasswordData,
  });

  useEffect(() => {
    user?.providerData.forEach((userInfo) => {
      setProvider(userInfo.providerId);
    });
  }, [user]);

  const onSubmit: SubmitHandler<ChangePasswordType> = async (data) => {
    if (data.password !== data.confirmPassword)
      return form.setError('root', {
        type: 'manual',
        message: 'Gesli se ne ujemata',
      });
    updatePassword(data.password);
  };

  return (
    <View className="flex-1 bg-light-main dark:bg-dark-main px-3 pt-5">
      <ScrollView
        className="w-full flex flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View className="h-full">
          <View className="px-2">
            <Text className="dark:text-white text-base font-bold mb-2">
              Vaš e-mail
            </Text>
            <Text className="dark:text-white text-base mb-4">{user?.email}</Text>
          </View>
          {provider === 'password' && (
            <View className="px-2 my-5">
              <Text
                className="dark:text-white text-base font-bold"
                onPress={() => setFormOpened(!formOpened)}
              >
                Spremeni geslo
              </Text>
              {formOpened && (
                <FormProvider {...form}>
                  <ControlledInput
                    name="password"
                    label="Novo geslo *"
                    placeholder="********"
                    secureTextEntry
                    classNameContainer="mt-5"
                  />
                  <ControlledInput
                    name="confirmPassword"
                    label="Potrdi novo geslo *"
                    placeholder="********"
                    secureTextEntry
                    classNameContainer="mt-5"
                  />
                  {!!form.formState.errors.root?.message && (
                    <Text className={twMerge('pl-0.5 text-warning pt-1.5')}>
                      {form.formState.errors.root?.message}
                    </Text>
                  )}
                  <Button
                    loading={isUpdatePasswordLoading}
                    text="Posodobi"
                    classname="w-28 h-11 mt-7"
                    onPress={form.handleSubmit(onSubmit)}
                  />
                </FormProvider>
              )}
            </View>
          )}
          <Text
              className="dark:text-white text-base font-bold mb-4 mt-5">
            Temni način
          </Text>
          <ColorSchemeToggle />
          <Button
            loading={isSignOutLoading}
            text="Odjava"
            onPress={signOut}
            classname="w-24 h-11 bg-danger m-auto mb-4"
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default SettingsScreen;

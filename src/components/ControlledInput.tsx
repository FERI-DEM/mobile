import React, {FC} from 'react';
import { View, TextInput as RNTextInput, TextInputProps as RNTextInputProps, Text } from 'react-native';
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import {twMerge} from "tailwind-merge";

interface TextInputProps extends RNTextInputProps, UseControllerProps {
    label: string
    name: string
    defaultValue?: string
    classNameContainer?: string
    classNameLabel?: string
    classNameInput?: string
}

const ControlledInputInner:FC<TextInputProps> = ({ name, label, rules, defaultValue, classNameContainer, classNameLabel, classNameInput, ...inputProps}) => {
    const formContext = useFormContext();
    const { formState } = formContext;

    const { field } = useController({ name, rules, defaultValue });

    const errorMessage = formState.errors[name]?.message?.toString();

    return (

        <View className={twMerge('bg-transparent w-full', classNameContainer)}>
            <Text className={twMerge('dark:text-white mb-3 ml-0.5', classNameLabel)}>{label}</Text>
            <View>
                <RNTextInput
                    autoCapitalize="none"
                    textAlign="left"
                    className={twMerge('shadow-lg shadow-black rounded-md dark:bg-dark-element dark:text-white py-3 px-4', classNameInput)}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    placeholderTextColor={'rgba(175,175,175,0.42)'}
                    {...inputProps}
                />

                {!!errorMessage && <Text className={twMerge('pl-0.5 text-warning pt-1.5')}>{errorMessage}</Text>}

            </View>
        </View>

    );
}

export const ControlledInput:FC<TextInputProps> = ({name, ...props}) => {
    const formContext = useFormContext();

    if (!formContext || !name) {
        const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
        console.error(msg)
        return null
    }

    return <ControlledInputInner name={name} {...props} />;

};
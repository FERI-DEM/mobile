import React, { FC, useState } from 'react';
import {
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  name: string;
  defaultValue?: string;
  classNameContainer?: string;
  classNameLabel?: string;
  classNameInput?: string;
}

const ControlledInputInner: FC<TextInputProps> = ({
  name,
  label,
  rules,
  defaultValue,
  classNameContainer,
  classNameLabel,
  classNameInput,
  editable = true,
  ...inputProps
}) => {
  const formContext = useFormContext();
  const { formState } = formContext;

  const { field } = useController({ name, rules, defaultValue });
  const [isFocused, setIsFocused] = useState(false);

  const errorMessage = formState.errors[name]?.message?.toString();

  const onBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  return (
    <View className={twMerge('bg-transparent w-full', classNameContainer)}>
      <Text className={twMerge('dark:text-white mb-3 ml-0.5', classNameLabel)}>
        {label}
      </Text>
      <View>
        <RNTextInput
          autoCapitalize="none"
          textAlign="left"
          className={twMerge(
            'shadow-lg shadow-black rounded-md bg-light-element dark:bg-dark-element dark:text-white py-3 px-4',
            classNameInput,
            isFocused ? 'border-tint border' : 'border border-light-element dark:border-dark-element',
            editable ? 'opacity-100' : 'opacity-60'
          )}
          onChangeText={field.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={onBlur}
          value={field.value}
          placeholderTextColor={'rgba(175,175,175,0.42)'}
          {...inputProps}
        />

        {!!errorMessage && (
          <Text className={twMerge('pl-0.5 text-warning pt-1.5')}>
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

export const ControlledInput: FC<TextInputProps> = ({ name, ...props }) => {
  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  return <ControlledInputInner name={name} {...props} />;
};

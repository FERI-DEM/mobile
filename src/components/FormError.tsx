import {UseFormReturn} from "react-hook-form";
import React, {FC} from "react";
import {Text} from "react-native";
import {twMerge} from "tailwind-merge";
import {FieldValues} from "react-hook-form/dist/types/fields";

interface FormErrorProps<TFieldValues extends FieldValues = FieldValues, TContext = any> {
    form: UseFormReturn<TFieldValues, TContext>;
}
const FormError = <TFieldValues extends FieldValues, TContext>({form}: FormErrorProps<TFieldValues, TContext>) => {
    if(!form.formState.errors.root?.message) return null;
    return <Text className={twMerge('pl-0.5 text-warning pt-1.5')}>{form.formState.errors.root?.message}</Text>

}
export default FormError;
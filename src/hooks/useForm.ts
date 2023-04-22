import {UseFormProps, useForm as useFormLibrary} from 'react-hook-form'
import {useEffect} from "react";
import {FieldValues} from "react-hook-form/dist/types/fields";

export default function useForm<TFieldValues extends FieldValues = FieldValues, TContext = any>(props: UseFormProps<TFieldValues, TContext>) {
    const form = useFormLibrary<TFieldValues, TContext>(props)

    useEffect(() => {
        form.reset((props?.defaultValues || {}) as TFieldValues)
    }, [JSON.stringify(props?.defaultValues)])

    return form
};

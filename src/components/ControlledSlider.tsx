import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {useController, UseControllerProps, useFormContext} from 'react-hook-form';
import {twMerge} from "tailwind-merge";
import Slider from "@react-native-community/slider";

export interface SliderProps extends UseControllerProps {
    label?: string
    name: string
    classNameSlider?: string
    classNameContainer?: string
    classNameLabel?: string
    displayValuePostfix?: string
    showValueDisplay?: boolean
    minimumValue?: number
    maximumValue?: number
    step?: number
    minimumTrackTintColor?: string
    maximumTrackTintColor?: string
    thumbTintColor?: string

}

const ControlledSliderInner: FC<SliderProps> = ({
                                                    name,
                                                    classNameSlider,
                                                    label,
                                                    classNameContainer,
                                                    showValueDisplay= true,
                                                    rules,
                                                    defaultValue,
                                                    classNameLabel,
                                                    displayValuePostfix,
                                                    ...props
                                                }) => {
    const formContext = useFormContext();

    const {field} = useController({name, rules, defaultValue});
    console.log(field.value)

    return (

        <View className={twMerge('mt-7', classNameContainer)}>
            {label && <View className='flex flex-row items-center justify-between'>
                <Text className={twMerge('dark:text-white ml-0.5', classNameLabel)}>{label}</Text>
                {showValueDisplay && <Text className='dark:text-white text-right'>{`${field.value} ${displayValuePostfix}`}</Text>}
            </View>}
            <Slider
                className={twMerge('w-full', classNameContainer)}
                style={{height: 40}}
                minimumValue={1}
                maximumValue={500}
                value={field.value}
                step={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => formContext.setValue(name, value)}
                thumbTintColor='#FFFFFF'
                {...props}
            />
        </View>

    );
}

export const ControlledSlider: FC<SliderProps> = ({name, ...props}) => {
    const formContext = useFormContext();

    if (!formContext || !name) {
        const msg = !formContext ? "Slider must be wrapped by the FormProvider" : "Name must be defined"
        console.error(msg)
        return null
    }

    return <ControlledSliderInner name={name} {...props}  />;

};
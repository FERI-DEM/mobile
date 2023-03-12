import {TextInput, View, Text, TextInputProps} from "react-native";
import {FC} from "react";
import {twMerge} from "tailwind-merge";

interface InputProps extends TextInputProps{
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    className?: string;
    classNameLabel?: string;
    classNameContainer?: string;

}
const Input:FC<InputProps> = ({label, value, onChangeText, className, classNameLabel, classNameContainer, ...props}) => {
    return (
        <View className={twMerge('bg-transparent w-full', classNameContainer)}>
            <Text className={twMerge('dark:text-white mb-3 ml-0.5', classNameLabel)}>{label}</Text>
            <TextInput
                className={twMerge('shadow-lg shadow-black rounded-md dark:bg-dark-element dark:text-white py-3 px-4', className)}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={'#7b7b7b'}
                {...props}
            />
        </View>
    );
}
export default Input;
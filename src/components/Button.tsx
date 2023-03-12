import React, {FC, ReactNode} from 'react';
import {Pressable, View, Text, TouchableOpacity} from "react-native";
import {twMerge} from "tailwind-merge";

interface ButtonProps {
    children?: ReactNode;
    text: string;
    onPress: () => void;
    classname?: string;
    disabled?: boolean;
    classNameText?: string;
}

const Button:FC<ButtonProps> = ({ children, text, onPress, classname, classNameText }) => {
    return (
        <View className={twMerge('bg-tint py-2.5 px-6 rounded-md w-fit self-start', classname)}>
            <TouchableOpacity onPress={onPress}>
                <Text className={twMerge('text-white font-bold', classNameText)}>{text}</Text>
                {children}
            </TouchableOpacity>
        </View>
    );
};

export default Button;
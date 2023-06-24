import { View, Text} from "react-native";
import {FC} from "react";
import {ControlledInput, TextInputProps} from "./ControlledInput";

interface InputProps extends TextInputProps{
    helperText: string;
}
const InputWithIcon:FC<InputProps> = ({ helperText, ...props}) => {
    return (
        <View className={'w-full flex flex-row items-end'}>
            <ControlledInput classNameContainer={'w-auto grow'} classNameInput={'rounded-r-none'}  {...props}></ControlledInput>
            <View className='bg-tint px-5 py-3.5 rounded-r-md'><Text className='dark:text-white text-center'>{helperText}</Text></View>
        </View>
    );
}
export default InputWithIcon;
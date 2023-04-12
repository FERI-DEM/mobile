import { View, Text} from "react-native";
import {FC} from "react";
import {ControlledInput, TextInputProps} from "./ControlledInput";

interface InputProps extends TextInputProps{
    iconText: string;
}
const InputWithIcon:FC<InputProps> = ({ iconText, ...props}) => {
    return (
        <View className={'w-full flex flex-row items-end'}>
            <ControlledInput classNameContainer={'w-auto grow'} classNameInput={'rounded-r-none'}  {...props}></ControlledInput>
            <View className='bg-tint w-24 py-3.5 rounded-r-md'><Text className='text-white text-center'>{iconText}</Text></View>
        </View>
    );
}
export default InputWithIcon;
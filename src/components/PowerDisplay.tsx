import {FC} from "react";
import {Text, View} from "react-native";
import {twMerge} from "tailwind-merge";

interface PowerDisplayProps {
    power: number;
    text: string;
    classNameContainer?: string;
}
const PowerDisplay:FC<PowerDisplayProps> = ({power, text, classNameContainer}) => {
    return <View className={twMerge('p-3 shadow-lg shadow-black rounded-xl w-full dark:bg-dark-element flex item-center', classNameContainer)}>
        <Text className='text-sm text-white opacity-40 text-center'>{text}</Text>
        <Text className='text-lg text-white  text-center'>{power}</Text>
    </View>
}
export default PowerDisplay;
import {FC} from "react";
import {Text, View} from "react-native";
import {twMerge} from "tailwind-merge";

interface PowerDisplayProps {
    power: number;
    text: string;
    classNameContainer?: string;
}
const PowerDisplay:FC<PowerDisplayProps> = ({power, text, classNameContainer}) => {
    return (
        <View className={twMerge('py-6 shadow-lg shadow-black rounded-xl w-full dark:bg-dark-element flex item-center', classNameContainer)}>
            <Text className='text-white opacity-40 text-center text-xs'>{text}</Text>
            <Text className='text-lg pt-2 text-white  text-center font-semibold'>{power + ' kw'}</Text>
        </View>
    )
}
export default PowerDisplay;
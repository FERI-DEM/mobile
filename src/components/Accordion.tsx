import React, {FC, ReactNode, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {ChevronDownIcon} from "react-native-heroicons/solid";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {twMerge} from "tailwind-merge";

interface NotificationCardProps {
    title: string;
    content: ReactNode
    contentHeight: number
    classNameTitle?: string
    classNameContentContainer?: string
}
const Accordion: FC<NotificationCardProps> = ({title, content, contentHeight:targetHeight , classNameContentContainer, classNameTitle}) => {
    const [isOpened, setIsOpened] = useState(false)
    const height = useSharedValue(0)
    const rotate = useSharedValue(90)

    const onPressItem = () => {
        setIsOpened(prevState => !prevState)
    }

    useEffect(() => {
        height.value = withTiming(isOpened ? targetHeight : 0, { duration: 200 })
    }, [isOpened])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
        }
    })
    const arrowDownAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotate: `${rotate.value}deg`}]
        }
    })

    return (
        <TouchableOpacity className='shadow-md shadow-black rounded-md dark:bg-dark-element dark:text-white py-4 px-4 mt-4' activeOpacity={0.8} onPress={onPressItem}>
            <View className='flex justify-between flex-row items-center'>
                <Text className={twMerge('dark:text-white font-bold px-3', classNameTitle)}>{title}</Text>
                <Animated.View style={arrowDownAnimatedStyle}><ChevronDownIcon color='white' size={20}/></Animated.View>
            </View>
            <Animated.View style={animatedStyle}>
                <View className={twMerge('pt-2 overflow-hidden', classNameContentContainer)}>
                    {content}
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default Accordion;
import {Text, TouchableOpacity, View} from "react-native";
import {ReactNode, useEffect, useState} from "react";
import {ChevronDownIcon} from "react-native-heroicons/solid";
import {Routes} from "../navigation/routes";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

export interface NavigationAccordionItem<T> {
    title: string
    route?: Routes
    onPressItem: (item: NavigationAccordionItem<T>) => void
    icon: ReactNode
}
export interface NavigationAccordionProps<T> {
    item: NavigationAccordionItem<T> & {
        onPressItem?: (item: NavigationAccordionItem<T>) => void
        subItems?: NavigationAccordionItem<T>[]
    }
}
const NavigationAccordion = <T extends string> ({item}: NavigationAccordionProps<T>) => {
    const [isOpened, setIsOpened] = useState(false)
    const height = useSharedValue(0)
    const rotate = useSharedValue(90)

    const onPressItem = () => {
        console.log(item.onPressItem)
        setIsOpened(prevState => !prevState)
        !item.subItems && item.onPressItem?.(item)
    }

    useEffect(() => {
        rotate.value = withTiming(isOpened ? 0 : 90, { duration: 200 })
        height.value = withTiming(isOpened ? (item.subItems?.length || 0) * 35 : 0, { duration: 200 })
    }, [isOpened])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: height.value
        }
    })
    const arrowDownAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotate: `${rotate.value}deg`}]
        }
    })
    return <View>
        <TouchableOpacity className='my-2 flex flex-row items-center'
                          onPress={() => onPressItem()}>
            <View className='w-4 h-4'>
                {item.icon}
            </View>
            <Text className='ml-3 mb-0.5 text-white text-md font-bold mr-3'>{item.title}</Text>
            {item.subItems && <Animated.View className='mt-0.5' style={arrowDownAnimatedStyle}><ChevronDownIcon  size={16} color='white'/></Animated.View>}
        </TouchableOpacity>
        <Animated.View className='flex flex-col overflow-hidden' style={animatedStyle}>
            {item.subItems?.map((item, index) => <TouchableOpacity key={index} className='h-[35px] ml-3 flex flex-row items-center'
                                                           onPress={() => {
                                                               console.log(item.onPressItem)
                                                               item.onPressItem?.(item)}
                                                           }>
                <View className='w-4 h-4'>
                    {item.icon}
                </View>
                <Text className='ml-2 mb-0.5 text-white text-xs'>{item.title}</Text>
            </TouchableOpacity>)}
        </Animated.View>
    </View>
}
export default NavigationAccordion
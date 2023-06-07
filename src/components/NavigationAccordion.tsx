import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ReactNode, useEffect, useState} from "react";
import {ChevronDownIcon} from "react-native-heroicons/solid";
import {Routes} from "../navigation/routes";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

interface SideMenuSubRoute {
    title: string
    icon: ReactNode
    route: Routes
    onPress: (item: SideMenuSubRoute) => void
}
interface SideMenuItem {
    title: string
    icon: ReactNode
    route: Routes
    onPress: () => void
}
interface SideMenuGroup {
    title: string
    icon: ReactNode
    route?: Routes
    subRoutes?: SideMenuSubRoute[]
    items?: SideMenuItem[]
    onPress: (group: SideMenuGroup) => void

}
interface NavigationAccordionProps {
    group: SideMenuGroup
}
const NavigationAccordion = ({group}: NavigationAccordionProps) => {
    const [isOpened, setIsOpened] = useState(false)
    const height = useSharedValue(0)
    const rotate = useSharedValue(90)

    const onPressGroup = () => {
        setIsOpened(prevState => !prevState)
        group.onPress?.(group)
    }

    useEffect(() => {
        rotate.value = withTiming(isOpened ? 0 : 90, { duration: 200 })
        height.value = withTiming(isOpened ? ((group.subRoutes?.length || 0) + (Math.min(group.items?.length || 0, 4))) * 35 : 0, { duration: 200 })
    }, [isOpened, group])

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
                          onPress={() => onPressGroup()}>
            <><View className='w-4 h-4'>
                {group.icon}
            </View>
            <Text className='ml-3 text-white text-md font-bold mr-3'>{group.title}</Text>
            {(group.subRoutes || group.items) && <Animated.View className='mt-1' style={arrowDownAnimatedStyle}><ChevronDownIcon size={16} color='white'/></Animated.View>}
        </></TouchableOpacity>
        <Animated.View className='flex flex-col overflow-hidden' style={animatedStyle}>
            <ScrollView className='max-h-[140px]' indicatorStyle='white' >
                {group.items?.map((item, index) => <TouchableOpacity key={index} className='h-[35px] ml-3 flex flex-row items-center'
                                                                     onPress={() => item.onPress()}>
                    <View className='w-4 h-4'>
                        {item.icon}
                    </View>
                    <Text className='ml-2  text-white text-xs'>{item.title}</Text>
                </TouchableOpacity>)}
            </ScrollView>
            {group.items?.length !== 0 && <View className='w-full h-[1px] bg-white'/>}
            {group.subRoutes?.map((subRoute, index) => <TouchableOpacity key={index} className='h-[35px] ml-3 flex flex-row items-center'
                                                                 onPress={() => subRoute.onPress(subRoute)}>
                <View className='w-4 h-4'>
                    {subRoute.icon}
                </View>
                <Text className='ml-2 mb-0.5 text-white text-xs'>{subRoute.title}</Text>
            </TouchableOpacity>)}
        </Animated.View>
    </View>
}
export default NavigationAccordion
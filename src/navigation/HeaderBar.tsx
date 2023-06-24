import {Text, TouchableOpacity, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import {useSideMenuStore} from "../store/side-menu-store";

interface HeaderBarProps {
    title: string
}
const HeaderBar = ({title}: HeaderBarProps) => {
    const {toggleOpened} = useSideMenuStore()

    return (
        <View className='flex justify-between items-center flex-row bg-light-main dark:bg-dark-main p-4'>
            <View className='flex flex-row items-center'>
                <Text className='text-2xl dark:text-white font-bold'>{title}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={toggleOpened} className='pt-1.5'>
                <View className='w-7 h-7'>
                    <Svg width="100%" height='100%' viewBox="0 0 24 24" fill="none">
                        <Path d="M4 6H20M4 10H20M4 14H20M4 18H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default HeaderBar;
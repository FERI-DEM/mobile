import {ReactNode} from "react";
import {Text, View} from "react-native";

interface IconWithDynamicTextProps {
    icon: ReactNode
    text: string
}
const IconWithText = ({ icon, text }: IconWithDynamicTextProps) => {
    return <View className='relative'>
        {icon}
        <View className='absolute z-50 bottom-0 right-0 bg-dark-main w-1/2 h-1/2 flex flex-row items-start justify-center'>
            <Text className='text-white text-[5px] font-semibold bg-dark-main text-center'>
                {text}
            </Text>
        </View>
    </View>
}
export default IconWithText;
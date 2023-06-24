import {TouchableOpacity, View} from "react-native";
import {useColorScheme} from "nativewind";

const ColorModeToggle = () => {
    const { toggleColorScheme, colorScheme } = useColorScheme();

    const onPress = () => {
        toggleColorScheme();
    }
    console.log(colorScheme)

    return <TouchableOpacity className='w-20 h-20 bg-red-500' onPress={onPress}>

    </TouchableOpacity>
}
export default ColorModeToggle;
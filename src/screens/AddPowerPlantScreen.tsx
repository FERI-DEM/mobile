import {Text, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import AddPowerPlantForm from "../components/AddPowerPlantForm";
import {colors} from "../constants/colors";

const AddPowerPlantScreen = () => {
    return (
        <View className='flex-1 items-center bg-light-main dark:bg-dark-main'>
            <View className='flex w-full justify-center'>
                <Svg width="100%" height="172" viewBox="0 0 390 172" fill="none">
                    <Path fill-rule="evenodd" clip-rule="evenodd"
                          d="M217.117 -78.7162C280.319 -76.0202 321.677 -46.416 362.526 -19.8342C405.571 8.17691 463.141 36.9847 450.128 72.9126C436.901 109.431 364.357 125.608 303.762 142.407C240.901 159.833 174.175 181.319 108.274 167.682C37.0633 152.946 -12.1061 115.211 -25.9716 74.1739C-39.2202 34.9625 -7.5207 -3.52171 40.2717 -33.5807C85.2263 -61.8548 148.914 -81.6256 217.117 -78.7162Z"
                          fill={colors.common.tint}/>
                </Svg>
                <Text className='text-xl mr-5 dark:text-white font-bold absolute ml-6'>Prosimo vnesite podatke o vaši
                    elektrarni </Text>
            </View>
            <AddPowerPlantForm/>
        </View>
    )
}
export default AddPowerPlantScreen
import {Text, View} from "react-native";
import Button from "../components/Button";
import Svg, {Path} from 'react-native-svg';
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";
import {StatusBar} from "../store/status-bar-store";

const LandingScreen = () => {
    return (
        <View className='flex-1 px-5 items-center dark:bg-dark-main'>
            <StatusBar color='#236BFE' />
            <View className='flex items-center justify-center'>
                <Svg width="390" height="393" viewBox="0 0 390 393" fill="none">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M190.39 -126.365C255.918 -119.054 327.827 -134.888 373.896 -80.9411C424.524 -21.6565 436.472 66.3947 424.97 148.326C412.34 238.299 381.081 331.113 310.255 372.407C238.063 414.499 155.138 384.585 80.2113 349.336C-3.05431 310.164 -96.7114 267.727 -122.491 168.825C-149.618 64.7523 -117.236 -58.5699 -44.0973 -127.574C19.4134 -187.493 108.541 -135.496 190.39 -126.365Z" fill="#236BFE"/>
                </Svg>
                <Text className='text-4xl text-white font-bold text-center absolute'>Solar / Cast</Text>
            </View>
            <View className='flex flex-row items-center justify-center mt-28 w-full'>
                <Button text='Prijava' onPress={() => {}} classname='self-center mr-7'/>
                <Button text='Registracija' classname='bg-dark-element self-center' onPress={() => navigate(Routes.REGISTER)}/>
                <Button text='TEST' classname='bg-dark-element self-center' onPress={() => navigate(Routes.CALIBRATION)}/>
            </View>
        </View>
    )
}

export default LandingScreen;
import React, {FC} from 'react';
import {Text, View} from "react-native";
import Svg, {Path} from "react-native-svg";

const SideMenuLogo:FC = () => {
    return (
        <View className='flex flex-row justify-center align-center py-10'>
            <Text className='dark:text-white text-lg font-bold mr-0.5'>Watt</Text>
            <Svg width="13" height="31" viewBox="0 0 23 57" fill="none">
                <Path d="M0.29402 31.8534L16.952 0.326097L11.7587 23.9679L22.3892 24.7577L5.73115 56.285L10.9245 32.6432L0.29402 31.8534Z" fill="#FFD600"/>
            </Svg>
            <Text className='dark:text-white text-lg font-bold ml-0.5'>Cast</Text>
        </View>
    );
};

export default SideMenuLogo;
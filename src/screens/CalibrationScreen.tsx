import {Text, View} from "react-native";
import React from "react";
import CalibrationForm from "../components/CalibrationForm";

const CalibrationScreen = () => {
    return <View className='flex-1 dark:bg-dark-main'>

            <Text className='text-3xl text-white font-bold mb-5 mt-7 pl-5'>Kalibracija</Text>
       <CalibrationForm/>

    </View>
}
export default CalibrationScreen;
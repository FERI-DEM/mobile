import PowerDisplay from "./PowerDisplay";
import {ScrollView, Text, View} from "react-native";
import React from "react";
import AlertCard from "./AlertCard";
import LineChart2 from "./LineChart2";
import usePrediction from "../hooks/usePrediction";
import {usePowerPlantStore} from "../store/power-plant-store";

const PowerPlantDashboardTab = () => {

    const {id: selectedPowerPlantID} = usePowerPlantStore(state => state.selectedPowerPlant)
    const {data: prediction, error} = usePrediction(selectedPowerPlantID)
    return (
        <ScrollView className='dark:bg-dark-main'>
            <View className='flex-1 pt-5'>
                <View className='flex flex-row justify-around'>
                    <PowerDisplay power={15} text='Danes' classNameContainer='w-3/12'/>
                    <PowerDisplay power={22} text='Jutri' classNameContainer='w-3/12'/>
                    <PowerDisplay power={10} text='Pojutrišnjem' classNameContainer='w-3/12'/>
                </View>
                <AlertCard title={'Obvestilo'} message={'Padec energije čez 1h.'} />
                <View className='my-6 m-4 shadow-lg shadow-black rounded-xl dark:bg-dark-element'>
                    <Text className='mt-5 text-white opacity-40 text-center text-xs'>Graf napovedi proizvodnje</Text>
                    {prediction &&  <LineChart2 prediction={prediction}/>}
                </View>
                <View className='mx-4 mb-4'>
                    {prediction && <PowerDisplay power={prediction[0].power} text='Čez 15min' classNameContainer='w-3/12'/> }
                </View>
            </View>
        </ScrollView>
    )
}
export default PowerPlantDashboardTab
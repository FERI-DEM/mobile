import PowerDisplay from "./PowerDisplay";
import {ScrollView, View} from "react-native";
import React from "react";
import usePrediction from "../hooks/usePrediction";
import {usePowerPlantStore} from "../store/power-plant-store";
import LineChart from "./LineChart";
import usePredictionByDays from "../hooks/usePredictionByDays";
import {roundToTwoDecimalPlaces} from "../utils/power";

const PowerPlantDashboardTab = () => {
    const selectedPowerPlant = usePowerPlantStore(state => state.selectedPowerPlant)
    const {data: prediction, error} = usePrediction(selectedPowerPlant?.id || '', {enabled: !!selectedPowerPlant});
    const {data: predictionByDays, error: error2} = usePredictionByDays(selectedPowerPlant?.id || '', {enabled: !!selectedPowerPlant});
    return (
        <ScrollView className='dark:bg-dark-main'>
            <View className='flex-1 pt-5'>
                <View className='flex flex-row justify-around px-4'>
                    {predictionByDays &&
                        <>
                            <PowerDisplay power={roundToTwoDecimalPlaces(predictionByDays[0])} text='Danes' classNameContainer='w-1/3 pr-2'/>
                            <PowerDisplay power={roundToTwoDecimalPlaces(predictionByDays[1])} text='Jutri' classNameContainer='w-1/3 px-1'/>
                            <PowerDisplay power={roundToTwoDecimalPlaces(predictionByDays[2])} text='Pojutrišnjem' classNameContainer='w-1/3 pl-2'/>
                        </>
                    }
                </View>

                <View className='my-5'>
                    {prediction && <LineChart data={prediction}/>}
                </View>

                <View className='mx-4 mb-4'>
                    {prediction && <PowerDisplay power={roundToTwoDecimalPlaces(prediction[0].power)} text='Čez 15min' classNameContainer='w-1/3'/> }
                </View>
            </View>
        </ScrollView>
    )
}
export default PowerPlantDashboardTab
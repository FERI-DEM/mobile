import {ScrollView} from "react-native";
import Button from "./Button";
import React from "react";
import {usePowerPlantStore} from "../store/power-plant-store";

const PowerPlantSettingsTab = () => {
    const {id: selectedPowerPlantID} = usePowerPlantStore(state => state.selectedPowerPlant);
    //const {data: powerPlantData} = usePowerPlant(selectedPowerPlantID)
    const deleteCommunity= () => {

    }
    return (
        <ScrollView className='dark:bg-dark-main flex-1 px-3'>
            <Button text='Izbriši' onPress={deleteCommunity} classname='bg-danger'/>
        </ScrollView>
    )
}
export default PowerPlantSettingsTab
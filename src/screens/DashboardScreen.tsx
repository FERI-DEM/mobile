import { Text, View} from "react-native";
import React, {useState} from "react";
import PowerPlantDashboardTab from "../components/PowerPlantDashboardTab";
import PowerPlantSettingsTab from "../components/PowerPlantSettingsTab";

export enum PowerPlantsTabs {
    DASHBOARD = 'Nadzorna plošča',
    SETTINGS = 'Nastavitve',
}

const DashboardScreen = () => {
    const [activeTab, setActiveTab] = useState<PowerPlantsTabs>(PowerPlantsTabs.DASHBOARD);

    return (
        <View className='dark:bg-dark-main flex-1 pt-2'>
            <View className='flex flex-row px-5 gap-5 mb-4'>
                {Object.values(PowerPlantsTabs).map((tab, index) => <Text key={index}
                                                                        className={`text-white opacity-40 ${tab === activeTab && 'text-tint opacity-100'}`}
                                                                        onPress={() => setActiveTab(tab)}>{tab}</Text>)}
            </View>
            {
                activeTab === PowerPlantsTabs.DASHBOARD ? <PowerPlantDashboardTab/> : activeTab === PowerPlantsTabs.SETTINGS && <PowerPlantSettingsTab/>

            }
        </View>
    )
}
export default DashboardScreen;
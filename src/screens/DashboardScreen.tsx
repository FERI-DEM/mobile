import { Text, View, ScrollView} from "react-native";
import React, {useState} from "react";
import PowerPlantDashboardTab from "../components/PowerPlantDashboardTab";
import PowerPlantSettingsTab from "../components/PowerPlantSettingsTab";
import Svg, {Path} from "react-native-svg";

export enum PowerPlantsTabs {
    DASHBOARD = 'Nadzorna plošča',
    SETTINGS = 'Nastavitve',
}
const DashboardScreen = () => {
    const [activeTab, setActiveTab] = useState<PowerPlantsTabs>(PowerPlantsTabs.DASHBOARD);
    const data = [
        {x: 10, y: 20},
        {x: 20, y: 50},
        {x: 30, y: 10},
        {x: 40, y: 20},
        {x: 50, y: 30},
        {x: 60, y: 10},
    ]
    return (
        <View className='dark:bg-dark-main flex-1 pt-2'>
            <View className='flex flex-row px-5 gap-5 mb-4'>
                {Object.values(PowerPlantsTabs).map((tab, index) => <Text key={index}
                                                                        className={`text-white opacity-40 ${tab === activeTab && 'text-tint opacity-100'}`}
                                                                        onPress={() => setActiveTab(tab)}>{tab}</Text>)}
            </View>
            {/*{*/}
            {/*    activeTab === PowerPlantsTabs.DASHBOARD ? <PowerPlantDashboardTab/> : activeTab === PowerPlantsTabs.SETTINGS && <PowerPlantSettingsTab/>*/}

            {/*}*/}
            <Svg viewBox='0 0 60 60' style={{width: 300, height: 300}}>
                {data.map((item, i) => {
                    if(i !== data.length - 1) return <Path
                        fill="red"
                        stroke="#F18F37"
                        strokeWidth="0.5"
                        key={i}
                        d={`M${item.x},${item.y} C${item.x + 5},${item.y} ${data[i + 1].x - 5},${data[i + 1].y} ${data[i + 1].x},${data[i + 1].y}`}/>
                })}
                <Path d="M 10 10 C 10 10, 20 50, 30 10 C 40 50, 30 10, 40 50" stroke="black" fill="none"/>
            </Svg>
        </View>
    )
}
export default DashboardScreen;
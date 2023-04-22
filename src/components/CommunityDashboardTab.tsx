import PowerDisplay from "./PowerDisplay";
import {View} from "react-native";
import React from "react";

const CommunityDashboardTab = () => {
    return <View className='flex flex-row justify-around'>
        <PowerDisplay power={0} text='Včeraj' classNameContainer='w-3/12'/>
        <PowerDisplay power={0} text='Danes' classNameContainer='w-3/12'/>
        <PowerDisplay power={0} text='Jutri' classNameContainer='w-3/12'/>
    </View>
}
export default CommunityDashboardTab
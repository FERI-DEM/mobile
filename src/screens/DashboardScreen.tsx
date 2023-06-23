import {View} from "react-native";
import React, {FC} from "react";
import PowerPlantDashboardTab from "../components/PowerPlantDashboardTab";
import PowerPlantSettingsTab from "../components/PowerPlantSettingsTab";
import {PowerPlantsTab, useDashboardTabsStore} from "../store/dashboard-tabs-store";
import Tabs from "../components/Tabs";
import {usePowerPlantStore} from "../store/power-plant-store";
import {QueryBoundaries} from "../components/QueryBoundaries";
import CalibrationForm from "../components/CalibrationForm";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import CustomTabBar from "../navigation/CustomTabBar";

const Tab = createMaterialTopTabNavigator();

const DashboardScreen:FC = () => {
    const {activeTab, setActiveTab} = useDashboardTabsStore(state => state)
    const selectedPowerPlant = usePowerPlantStore(state => state.selectedPowerPlant)

    return (
        <View className='dark:bg-dark-main flex-1 pt-2' collapsable={false}>
            <QueryBoundaries isLoading={!selectedPowerPlant}>
                <Tab.Navigator screenOptions={{animationEnabled: false}} tabBar={(props) => <CustomTabBar {...props}/>}>
                    <Tab.Screen name="Home" options={{title: 'Home'}} component={PowerPlantDashboardTab} />
                    <Tab.Screen name="Settings"  options={{title: 'Settings'}} component={PowerPlantSettingsTab} />
                    <Tab.Screen name="Calibration" options={{title: 'Calibration'}} component={CalibrationForm} />
                </Tab.Navigator>
            </QueryBoundaries>
        </View>
    );
};

export default DashboardScreen;
import {View} from "react-native";
import React, {FC} from "react";
import PowerPlantDashboardTab from "../components/PowerPlantDashboardTab";
import PowerPlantSettingsTab from "../components/PowerPlantSettingsTab";
import PowerPlantCalibrationTab from "../components/PowerPlantCalibrationTab";
import {PowerPlantsTab, useDashboardTabsStore} from "../store/dashboard-tabs-store";
import Tabs from "../components/Tabs";
import {usePowerPlantStore} from "../store/power-plant-store";
import {QueryBoundaries} from "../components/QueryBoundaries";

const DashboardScreen:FC = () => {
    const {activeTab, setActiveTab} = useDashboardTabsStore(state => state)
    const selectedPowerPlant = usePowerPlantStore(state => state.selectedPowerPlant)
    console.log(selectedPowerPlant)
    return (
        <View className='dark:bg-dark-main flex-1 pt-2'>
            <QueryBoundaries isLoading={!selectedPowerPlant}>
                <Tabs tabs={Object.values(PowerPlantsTab)} onClickTab={setActiveTab} activeTab={activeTab}/>
                <QueryBoundaries isLoading={!selectedPowerPlant}>
                    {activeTab === PowerPlantsTab.DASHBOARD && <PowerPlantDashboardTab />}
                    {activeTab === PowerPlantsTab.SETTINGS && <PowerPlantSettingsTab />}
                    {activeTab === PowerPlantsTab.CALIBRATION && <PowerPlantCalibrationTab />}
                </QueryBoundaries>
            </QueryBoundaries>
        </View>
    );
};

export default DashboardScreen;
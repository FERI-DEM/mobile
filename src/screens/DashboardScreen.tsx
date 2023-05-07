import {View} from "react-native";
import React, {FC} from "react";
import PowerPlantDashboardTab from "../components/PowerPlantDashboardTab";
import PowerPlantSettingsTab from "../components/PowerPlantSettingsTab";
import PowerPlantCalibrationTab from "../components/PowerPlantCalibrationTab";
import {PowerPlantsTab, useDashboardTabsStore} from "../store/dashboard-tabs-store";
import Tabs from "../components/Tabs";

const DashboardScreen:FC = () => {
    const {activeTab, setActiveTab} = useDashboardTabsStore(state => state)

    return (
        <View className='dark:bg-dark-main flex-1 pt-2'>
            <Tabs tabs={Object.values(PowerPlantsTab)} onClickTab={setActiveTab} activeTab={activeTab}/>
            {activeTab === PowerPlantsTab.DASHBOARD && <PowerPlantDashboardTab />}
            {activeTab === PowerPlantsTab.SETTINGS && <PowerPlantSettingsTab />}
            {activeTab === PowerPlantsTab.CALIBRATION && <PowerPlantCalibrationTab />}
        </View>
    );
};

export default DashboardScreen;
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {Routes, userStackInitialRoute} from "./routes";
import HeaderBar from "./HeaderBar";
import DashboardScreen from "../screens/DashboardScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CalibrationScreen from "../screens/CalibrationScreen";
import MyCommunityScreen from "../screens/MyCommunityScreen";
import SideMenu from "./SideMenu";
import * as React from "react";
import SettingsScreen from "../screens/SettingsScreen";
import {useCommunityStore} from "../store/community-store";
import CommunityHeaderDropdown from "../components/CommunityHeaderDropdown";

const Stack = createNativeStackNavigator<RootStackParamList>();

const UserStack = () => {
    const selectedCommunity = useCommunityStore(state => state.selectedCommunity);

    return (
        <SafeAreaView className='flex-1'>
            <Stack.Navigator initialRouteName={userStackInitialRoute} screenOptions={{headerShown: true, animation: 'none', header: (props) => <HeaderBar title={props.options.title || props.route.name}/>}}>
                <Stack.Screen name={Routes.DASHBOARD} component={DashboardScreen}/>
                <Stack.Screen name={Routes.NOTIFICATIONS} component={NotificationScreen}  />
                <Stack.Screen name={Routes.CALIBRATION} component={CalibrationScreen} />
                <Stack.Screen name={Routes.ORGANIZATION} component={MyCommunityScreen} options={{ headerShown: true, header: () => <HeaderBar title={selectedCommunity.name} helper={<CommunityHeaderDropdown/>}/>}} />
                <Stack.Screen name={Routes.SETTINGS} component={SettingsScreen} />
            </Stack.Navigator>
            <SideMenu/>
        </SafeAreaView>

    );
}

export default UserStack
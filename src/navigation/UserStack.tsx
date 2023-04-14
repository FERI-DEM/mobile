import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {Routes, userStackInitialRoute} from "./routes";
import HeaderBar from "./HeaderBar";
import DashboardScreen from "../screens/DashboardScreen";
import CreateCommunityScreen from "../screens/CreateCommunityScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CalibrationScreen from "../screens/CalibrationScreen";
import MyCommunityScreen from "../screens/MyCommunityScreen";
import SideMenu from "./SideMenu";
import * as React from "react";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const UserStack = () => {
    return (
        <SafeAreaView className='flex-1'>
            <Stack.Navigator initialRouteName={userStackInitialRoute} screenOptions={{headerShown: true, animation: 'none', header: (props) => <HeaderBar title={props.options.title || props.route.name}/>}}>
                <Stack.Screen name={Routes.DASHBOARD} component={DashboardScreen}/>
                <Stack.Screen name={Routes.CREATE_ORGANIZATION} component={CreateCommunityScreen}/>
                <Stack.Screen name={Routes.NOTIFICATIONS} component={NotificationScreen}  />
                <Stack.Screen name={Routes.CALIBRATION} component={CalibrationScreen} />
                <Stack.Screen name={Routes.ORGANIZATION} component={MyCommunityScreen} />
                <Stack.Screen name={Routes.SETTINGS} component={SettingsScreen} />
            </Stack.Navigator>
            <SideMenu/>
        </SafeAreaView>

    );
}

export default UserStack
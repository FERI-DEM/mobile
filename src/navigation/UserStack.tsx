import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {Routes, RoutesParams, userStackInitialRoute} from "./routes";
import HeaderBar from "./HeaderBar";
import DashboardScreen from "../screens/DashboardScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CommunityScreen from "../screens/CommunityScreen";
import * as React from "react";
import SettingsScreen from "../screens/SettingsScreen";
import HeaderBarCommunities from "./HeaderBarCommunities";
import HeaderBarPowerPlants from "../components/HeaderBarPowerPlants";

const Stack = createNativeStackNavigator<RoutesParams>();

const UserStack = () => {
    return (
        <SafeAreaView className='flex-1'>
            <Stack.Navigator initialRouteName={userStackInitialRoute} screenOptions={{headerShown: true, animation: 'none', header: (props) => <HeaderBar title={props.options.title || props.route.name}/>}}>
                <Stack.Screen name={Routes.DASHBOARD} component={DashboardScreen} options={{header: () => <HeaderBarPowerPlants/>}}/>
                <Stack.Screen name={Routes.NOTIFICATIONS} component={NotificationScreen}  />
                <Stack.Screen name={Routes.ORGANIZATION} component={CommunityScreen} options={{header: () => <HeaderBarCommunities/>}} />
                <Stack.Screen name={Routes.SETTINGS} component={SettingsScreen} />
            </Stack.Navigator>
        </SafeAreaView>

    );
}

export default UserStack
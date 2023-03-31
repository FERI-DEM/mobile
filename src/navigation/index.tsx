import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {RootStackParamList} from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import LandingScreen from "../screens/LandingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {initialRoute, Routes} from "./routes";
import RegisterDetailsScreen from "../screens/RegisterDetailsScreen";
import {navigationRef} from "./navigate";
import HeaderBar from "./HeaderBar";
import {SafeAreaView} from "react-native-safe-area-context";
import SideMenu from "./SideMenu";
import DashboardScreen from "../screens/DashboardScreen";
import CreateCommunityScreen from "../screens/CreateCommunityScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CalibrationScreen from "../screens/CalibrationScreen";
import MyCommunityScreen from "../screens/MyCommunityScreen";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            ref={navigationRef}
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <SafeAreaView className='flex-1'>
            <Stack.Navigator initialRouteName={initialRoute} screenOptions={{animation: 'none', header: (props) => <HeaderBar title={props.options.title || props.route.name}/>}}>
                <Stack.Screen name={Routes.LANDING} component={LandingScreen} options={{headerShown: false}}/>
                <Stack.Screen name={Routes.REGISTER} component={RegisterScreen} options={{ headerShown: false}} />
                <Stack.Screen name={Routes.REGISTER_DETAILS} component={RegisterDetailsScreen} options={{ headerShown: false}} />
                <Stack.Screen name={Routes.DASHBOARD} component={DashboardScreen} options={{ headerShown: true}} />
                <Stack.Screen name={Routes.CREATE_ORGANIZATION} component={CreateCommunityScreen} options={{ headerShown: true}} />
                <Stack.Screen name={Routes.NOTIFICATIONS} component={NotificationScreen} options={{ headerShown: true}} />
                <Stack.Screen name={Routes.CALIBRATION} component={CalibrationScreen} options={{ headerShown: true}} />
                <Stack.Screen name={Routes.ORGANIZATION} component={MyCommunityScreen} options={{ headerShown: true}} />
            </Stack.Navigator>
            <SideMenu/>
        </SafeAreaView>

    );
}


import {NavigationContainer, DefaultTheme, DarkTheme, createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {RootStackParamList} from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import LandingScreen from "../screens/LandingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {initialRoute, Routes} from "./routes";
import RegisterDetailsScreen from "../screens/RegisterDetailsScreen";

export const navigationRef = createNavigationContainerRef()

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
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name={Routes.LANDING} component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name={Routes.REGISTER} component={RegisterScreen} options={{ headerShown: false}} />
            <Stack.Screen name={Routes.REGISTER_DETAILS} component={RegisterDetailsScreen} options={{ headerShown: false}} />
        </Stack.Navigator>
    );
}


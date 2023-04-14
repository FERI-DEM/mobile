import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {SafeAreaView} from "react-native-safe-area-context";
import {noUserStackInitialRoute, Routes} from "./routes";
import HeaderBar from "./HeaderBar";
import LandingScreen from "../screens/LandingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterDetailsScreen from "../screens/RegisterDetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import SideMenu from "./SideMenu";
import * as React from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

const NoUserStack = () => {
    return (
        <SafeAreaView className='flex-1'>
            <Stack.Navigator initialRouteName={noUserStackInitialRoute} screenOptions={{headerShown: false, animation: 'none', header: (props) => <HeaderBar title={props.options.title || props.route.name}/>}}>
                <Stack.Screen name={Routes.LANDING} component={LandingScreen}/>
                <Stack.Screen name={Routes.REGISTER} component={RegisterScreen}/>
                <Stack.Screen name={Routes.REGISTER_DETAILS} component={RegisterDetailsScreen} />
                <Stack.Screen name={Routes.LOGIN} component={LoginScreen}/>
            </Stack.Navigator>
            <SideMenu/>
        </SafeAreaView>

    );
}

export default NoUserStack
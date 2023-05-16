import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {noUserStackInitialRoute, Routes, RoutesParams} from "./routes";
import HeaderBar from "./HeaderBar";
import LandingScreen from "../screens/LandingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import SideMenu from "./SideMenu";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator<RoutesParams>();

const NoUserStack = () => {
    return (
        <SafeAreaView className='flex-1'>
            <Stack.Navigator initialRouteName={noUserStackInitialRoute} screenOptions={{headerShown: false, animation: 'none', header: (props) => <HeaderBar title={props.options.title || props.route.name}/>}}>
                <Stack.Screen name={Routes.LANDING} component={LandingScreen}/>
                <Stack.Screen name={Routes.REGISTER} component={RegisterScreen}/>
                <Stack.Screen name={Routes.LOGIN} component={LoginScreen}/>
                <Stack.Screen name={Routes.FORGOT_PASSWORD} component={ForgotPasswordScreen}/>
            </Stack.Navigator>
            <SideMenu/>
        </SafeAreaView>

    );
}

export default NoUserStack
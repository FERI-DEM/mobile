import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {Routes, RoutesParams} from "./routes";
import AddPowerPlantScreen from "../screens/AddPowerPlantScreen";
import SideMenu from "./SideMenu";
import CalibrationScreen from "../screens/CalibrationScreen";

const Stack = createNativeStackNavigator<RoutesParams>();

const IncompleteUserStack = () => {
    return (
        <SafeAreaView className='flex-1'>
            <Stack.Navigator initialRouteName={Routes.ADD_POWER_PLANT} screenOptions={{headerShown: false, animation: 'none'}}>
                <Stack.Screen name={Routes.ADD_POWER_PLANT} component={AddPowerPlantScreen}/>
                <Stack.Screen name={Routes.CALIBRATION} component={CalibrationScreen}/>
            </Stack.Navigator>
            <SideMenu/>
        </SafeAreaView>

    );
}

export default IncompleteUserStack
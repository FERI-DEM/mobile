import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes, RoutesParams } from './routes';
import HeaderBar from './HeaderBar';
import DashboardScreen from '../screens/DashboardScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CommunityScreen from '../screens/CommunityScreen';
import * as React from 'react';
import SettingsScreen from '../screens/SettingsScreen';
import HeaderBarCommunities from './HeaderBarCommunities';
import HeaderBarPowerPlants from '../components/HeaderBarPowerPlants';
import AddPowerPlantForm from '../components/AddPowerPlantForm';
import CreateCommunityScreen from '../screens/CreateCommunityScreen';
import JoinCommunityScreen from '../screens/JoinCommunityScreen';
import AppInitializer from '../components/AppInitializer';
import CalibrationScreen from '../screens/CalibrationScreen';
import SideMenu from './SideMenu';

const Stack = createNativeStackNavigator<RoutesParams>();

const UserStack = () => {
  return (
    <AppInitializer>
      {(initialRoute) => (
        <>
          {console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', initialRoute)}
          <SideMenu />
          <SafeAreaView className="flex-1">
            <Stack.Navigator
              initialRouteName={initialRoute}
              screenOptions={{
                freezeOnBlur: true,
                headerShown: true,
                animation: 'none',
                header: (props) => (
                  <HeaderBar title={props.options.title || props.route.name} />
                ),
              }}
            >
              <Stack.Screen
                name={Routes.DASHBOARD}
                component={DashboardScreen}
                options={{
                  header: () => <HeaderBarPowerPlants />,
                  freezeOnBlur: true,
                }}
              />
              <Stack.Screen
                name={Routes.NOTIFICATIONS}
                component={NotificationScreen}
              />
              <Stack.Screen
                name={Routes.ORGANIZATION}
                component={CommunityScreen}
                options={{ header: () => <HeaderBarCommunities /> }}
              />
              <Stack.Screen name={Routes.SETTINGS} component={SettingsScreen} />
              <Stack.Screen
                name={Routes.ADD_POWER_PLANT}
                component={AddPowerPlantForm}
              />
              <Stack.Screen
                name={Routes.ADD_COMMUNITY}
                component={CreateCommunityScreen}
              />
              <Stack.Screen
                name={Routes.JOIN_COMMUNITY}
                component={JoinCommunityScreen}
              />
              <Stack.Screen
                name={Routes.CALIBRATION}
                component={CalibrationScreen}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </>
      )}
    </AppInitializer>
  );
};

export default UserStack;

import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {ColorSchemeName, Text, View} from 'react-native';
import {navigationRef} from "./navigate";
import {useAuthentication} from "../hooks/useAuthentication";
import UserStack from "./UserStack";
import NoUserStack from "./NoUserStack";
import SideMenu from "./SideMenu";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <View className='flex-1 bg-dark-main'>
            <NavigationContainer
                ref={navigationRef}
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <RootNavigator/>
            </NavigationContainer>
            <SideMenu/>
        </View>
    );
}

function RootNavigator() {
    const {user, loading} = useAuthentication()
    if (loading) return <Text>Loading</Text>

    return user ? <UserStack /> : <NoUserStack />;
}


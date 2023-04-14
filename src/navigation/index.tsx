import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import * as React from 'react';
import {ColorSchemeName, Text} from 'react-native';
import LinkingConfiguration from './LinkingConfiguration';
import {navigationRef} from "./navigate";
import {useAuthentication} from "../hooks/useAuthentication";
import UserStack from "./UserStack";
import NoUserStack from "./NoUserStack";

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

function RootNavigator() {
    const {user, loading} = useAuthentication()
    if (loading) return <Text>Loading</Text>

    return user ? <UserStack /> : <NoUserStack />;
}


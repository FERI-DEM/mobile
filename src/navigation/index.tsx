import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useEffect} from 'react';
import {ColorSchemeName, Text, View} from 'react-native';
import {navigationRef} from "./navigate";
import UserStack from "./UserStack";
import NoUserStack from "./NoUserStack";
import SideMenu from "./SideMenu";
import Toast from "../components/Toast";
import IncompleteUserStack from "./IncompleteUserStack";
import {UserState} from "../types/user.types";
import {User} from "firebase/auth";
import {auth} from "../config/firebase";
import {useUserStore} from "../store/user-store";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <View className='flex-1 bg-dark-main'>
            <NavigationContainer
                ref={navigationRef}
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <RootNavigator/>
            </NavigationContainer>
            <SideMenu/>
            <Toast/>
        </View>
    );
}

function RootNavigator() {
    const { setUser, setUserState, userState, user} = useUserStore();
    console.log(userState, user?.uid, user?.email)

    const onUserStateChange = async (user: User | null) => {
        setUserState(UserState.LOADING)
        if (user) {
            const tokenResponse = await user.getIdTokenResult();
            console.log(tokenResponse.claims.valid)
            if (tokenResponse.claims.valid != null && tokenResponse.claims.valid === true) {
                setUserState(UserState.USER)
            }
            else{
                setUserState(UserState.INCOMPLETE_USER)
            }
            setUser(user);
        } else {
            setUserState(UserState.NO_USER)
            setUser(undefined);
        }
    }

    useEffect(() => {
        setUserState(UserState.LOADING)
        return auth.onAuthStateChanged(onUserStateChange);
    }, []);


    if (userState === UserState.LOADING) return <Text>Loading</Text>
    if(userState === UserState.INCOMPLETE_USER) return <IncompleteUserStack/>
    if(userState === UserState.USER) return <UserStack/>

    return <NoUserStack />;
}


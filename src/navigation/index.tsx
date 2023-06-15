import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { ColorSchemeName, Text, View } from 'react-native';
import { navigationRef } from './navigate';
import UserStack from './UserStack';
import NoUserStack from './NoUserStack';
import Toast from '../components/Toast';
import { UserState } from '../types/user.types';
import { User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useUserStore } from '../store/user-store';
import { apiInstance } from '../api/axios';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <View className="flex-1 bg-dark-main">
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </View>
  );
}

function RootNavigator() {
  const { setUser, setUserState, userState, user } = useUserStore();
  console.log(userState, user?.uid, user?.email);

  const onUserStateChange = async (user: User | null) => {
    setUserState(UserState.LOADING);
    if (user) {
      const tokenResponse = await user.getIdTokenResult(true);
      apiInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokenResponse.token}`;
      console.log(tokenResponse.token);

      setUserState(UserState.USER);
      setUser(user);
    } else {
      setUserState(UserState.NO_USER);
      setUser(undefined);
    }
  };

  useEffect(() => {
    return auth.onAuthStateChanged(onUserStateChange);
  }, []);

  if (userState === UserState.LOADING) return <Text>Loading</Text>;

  return user ? <UserStack /> : <NoUserStack />;
}

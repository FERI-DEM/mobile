import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import {useColorScheme} from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ColorScheme} from "../types/common.types";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const {setColorScheme} = useColorScheme()


  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        const colorScheme = await AsyncStorage.getItem('color-scheme') as ColorScheme
        console.log('colorScheme', colorScheme)
        if (colorScheme) {
            setColorScheme(colorScheme)
        }

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

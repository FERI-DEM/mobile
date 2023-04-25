import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import {useStatusBarStore} from "./src/store/status-bar-store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const queryClient = new QueryClient()

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const {color} = useStatusBarStore();

    if (!isLoadingComplete) {
        return null;
    }
    else {
        return (
            <QueryClientProvider client={queryClient}>
                <GestureHandlerRootView className='flex-1'>
                    <SafeAreaProvider>
                        <Navigation colorScheme={colorScheme}/>
                        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} backgroundColor={color}/>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </QueryClientProvider>
        );
    }
}

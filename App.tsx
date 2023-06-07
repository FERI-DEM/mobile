import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import {useStatusBarStore} from "./src/store/status-bar-store";
import {MutationCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useToastStore} from "./src/store/toast-store";
import {ToastTypes} from "./src/types/toast.types";
import {isFirebaseAuthError} from "./src/utils/type-guards";
import {firebaseAuthErrorMapper} from "./src/utils/error-mapper";


const mutationCache = new MutationCache({
    onError: (err) => {
        if(!isFirebaseAuthError(err)) return useToastStore.setState({isVisible: true, text: 'Prišlo je do napake', type: ToastTypes.ERROR});
        const message = firebaseAuthErrorMapper(err);
        useToastStore.setState({isVisible: true, text: message, type: ToastTypes.ERROR});
    }
})

const queryClient = new QueryClient({
    mutationCache
})

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

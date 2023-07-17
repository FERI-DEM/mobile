import React, {Children, cloneElement, ReactElement, useState} from "react";
import {RefreshControl, View} from "react-native";

interface LoadingWrapperProps {
    children: ReactElement
    loadingComponent: ReactElement
}
const LoadingWrapper = ({children, loadingComponent}: LoadingWrapperProps) => {
    const [loading, setLoading] = useState(true);

    const onLayout = () => {
        console.log('onLayout', new Date())
        setLoading(false);

    }

    return <View className='relative'>
        <View onLayout={onLayout}>{children}</View>
        {loading && <View className='h-72 w-full bg-red-400 absolute top-0'></View>}
    </View>
}
export default LoadingWrapper;
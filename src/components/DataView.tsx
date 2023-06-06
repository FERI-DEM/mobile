import React from "react";
import {ActivityIndicator, Text, View} from "react-native";

interface DataViewProps<T> {
    isLoading: boolean;
    data: T | undefined | null;
    children: (data: NonNullable<T>) => React.ReactNode;
    fallback?: React.ReactNode;
    fallbackText?: string;
    loadingComponent?: React.ReactNode;
}

const DataView = <T,>({isLoading, loadingComponent, data, children, fallback, fallbackText}: DataViewProps<T>) => {
    console.log(data)
    return (
        <>
            {isLoading
                ? loadingComponent ?? <View className='flex-1 bg-dark-main flex items-center justify-center'><ActivityIndicator size={28} className='py-1.5 px-6' color='white'/></View>
                : !data
                    ? fallback ?? <View className='flex-1 bg-dark-main'><Text className='text-white'>{fallbackText || 'Ni podatkov'}</Text></View>
                    : children(data)}
        </>
    );
};
export default DataView;
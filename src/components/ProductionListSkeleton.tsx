import {View} from "react-native";
import Skeleton from "./Skeleton";
import React from "react";

const ProductionListSkeleton = () => {
    return <Skeleton
        classNameContainer={'flex-1 shadow-lg shadow-black bg-light-element dark:bg-dark-element'}
    >
        <View className="border-l-2 border-l-light-skeleton-content dark:border-l-dark-skeleton-content h-16 w-full bg flex flex-row justify-between px-5 items-center border-b-2 border-b-light-main dark:border-b-dark-main">
            <View className="bg-light-skeleton-content dark:bg-dark-skeleton-content w-32 h-5"/>
            <View className="bg-light-skeleton-content dark:bg-dark-skeleton-content w-14 h-5"/>
        </View>
        <View className="border-l-2 border-light-skeleton-content dark:border-dark-skeleton-content h-16 w-full flex flex-row justify-between px-5 items-center border-b-2 border-b-light-main dark:border-b-dark-main">
            <View className="bg-light-skeleton-content dark:bg-dark-skeleton-content w-32 h-5"/>
            <View className="bg-light-skeleton-content dark:bg-dark-skeleton-content w-14 h-5"/>
        </View>
        <View className="border-l-2 border-light-skeleton-content dark:border-dark-skeleton-content h-16 w-full flex flex-row justify-between px-5 items-center">
            <View className="bg-light-skeleton-content dark:bg-dark-skeleton-content w-32 h-5"/>
            <View className="bg-light-skeleton-content dark:bg-dark-skeleton-content w-14 h-5"/>
        </View>
    </Skeleton>
}
export default ProductionListSkeleton;
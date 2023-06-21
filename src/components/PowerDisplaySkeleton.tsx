import {View} from "react-native";
import Skeleton from "./Skeleton";
import React from "react";
import {twMerge} from "tailwind-merge";

interface PowerDisplaySkeletonProps {
    classNameContainer?: string;
}
const PowerDisplaySkeleton = ({classNameContainer}: PowerDisplaySkeletonProps) => {
    return <Skeleton classNameContainer={twMerge('h-36 pt-7 pb-8 shadow-lg shadow-black rounded-xl grow dark:bg-dark-element flex flex-col justify-between items-center', classNameContainer)}>
        <View className="bg-dark-skeleton-content w-10 h-3"></View>
        <View className="bg-dark-skeleton-content w-12 h-6"></View>
        <View className="bg-dark-skeleton-content w-10 h-4"></View>
    </Skeleton>
}
export default PowerDisplaySkeleton;
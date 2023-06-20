import PowerDisplay from "./PowerDisplay";
import {roundToTwoDecimalPlaces} from "../utils/power";
import {View} from "react-native";
import React from "react";
import useCommunitiesPredictionByDays from "../hooks/useCommunitiesPredictionByDays";
import {useCommunityStore} from "../store/community-store";
import DataView from "./DataView";
import Skeleton from "./Skeleton";

const CommunityPowerDisplays = () => {
    const selectedCommunity = useCommunityStore(
        (state) => state.selectedCommunity
    );

    const { data: predictions, isLoading: arePredictionsLoading } =
        useCommunitiesPredictionByDays(selectedCommunity?.id || '', {
            enabled: !!selectedCommunity,
            retry: false,
        });

    return <DataView
        isLoading={arePredictionsLoading}
        data={predictions}
        loadingComponent={<View className='flex flex-row pb-5'>
            <Skeleton classNameContainer='h-36 pt-7 pb-8 shadow-lg shadow-black rounded-xl grow dark:bg-dark-element flex flex-col justify-between items-center'>
                <View className='bg-dark-skeleton-content w-10 h-3'></View>
                <View className='bg-dark-skeleton-content w-12 h-6'></View>
                <View className='bg-dark-skeleton-content w-10 h-4'></View>
            </Skeleton>
            <Skeleton classNameContainer='h-36 pt-7 mx-2 pb-8 shadow-lg shadow-black rounded-xl grow dark:bg-dark-element flex flex-col justify-between items-center'>
                <View className='bg-dark-skeleton-content w-10 h-3'></View>
                <View className='bg-dark-skeleton-content w-12 h-6'></View>
                <View className='bg-dark-skeleton-content w-10 h-4'></View>
            </Skeleton>
            <Skeleton classNameContainer='h-36 pt-7 pb-8 shadow-lg shadow-black rounded-xl grow dark:bg-dark-element flex flex-col justify-between items-center'>
                <View className='bg-dark-skeleton-content w-10 h-3'></View>
                <View className='bg-dark-skeleton-content w-12 h-6'></View>
                <View className='bg-dark-skeleton-content w-10 h-4'></View>
            </Skeleton>
        </View>}
    >
        {predictions => (
            <View className="flex flex-row justify-around pb-5">
                <PowerDisplay
                    power={roundToTwoDecimalPlaces(predictions[0])}
                    text="Danes"
                    unit="kWh"
                />
                <PowerDisplay
                    power={roundToTwoDecimalPlaces(predictions[0])}
                    text="Danes"
                    unit="kWh"
                    classNameContainer='mx-2'
                />
                <PowerDisplay
                    power={roundToTwoDecimalPlaces(predictions[0])}
                    text="Danes"
                    unit="kWh"
                />
            </View>
        )}
    </DataView>
}
export default CommunityPowerDisplays;
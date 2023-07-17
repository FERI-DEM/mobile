import {usePowerPlantStore} from "../store/power-plant-store";
import {useToastStore} from "../store/toast-store";
import usePrediction from "../hooks/usePrediction";
import {navigationRef} from "../navigation/navigate";
import {StackActions} from "@react-navigation/native";
import {Routes} from "../navigation/routes";
import {ToastTypes} from "../types/toast.types";
import PowerDifferenceCard from "./PowerDifferenceCard";
import React, {useMemo} from "react";
import DataView from "./DataView";
import Skeleton from "./Skeleton";
import {View} from "react-native";

const PowerPlantPowerDifferenceCard = () => {
    const selectedPowerPlant = usePowerPlantStore(
        (state) => state.selectedPowerPlant
    );
    const { showToast } = useToastStore();

    const { data: predictions, isFetching: isFetchingPredictions } = usePrediction(
        selectedPowerPlant?.id || '',
        {
            enabled: !!selectedPowerPlant,
            retry: false,
            onError: () => {
                navigationRef.dispatch(StackActions.replace(Routes.CALIBRATION));
                showToast(
                    'Te elektrarne še niste kalibrirali!',
                    ToastTypes.INFORMATION
                );
            },
        }
    );

    const preparedPredictions = useMemo(() => {
        if (!predictions || predictions.length < 2) {
            return null;
        }
        return {
            now: predictions[0],
            next: predictions[1],
        };
    }, [predictions])


    return <DataView
        isLoading={isFetchingPredictions}
        data={preparedPredictions}
        loadingComponent={<Skeleton classNameContainer='h-36 ml-4 pt-7 pb-8 shadow-lg shadow-black rounded-xl flex flex-row justify-around items-center'>
            <View className="bg-dark-skeleton-content w-14 h-10"/>
            <View>
                <View className="bg-dark-skeleton-content w-10 h-5"/>
                <View className="bg-dark-skeleton-content w-10 h-5 mt-5"/>
            </View>
        </Skeleton>
    }>
        {(preparedPredictions) => (
            <PowerDifferenceCard
                date={preparedPredictions.next.date}
                power1={preparedPredictions.now.power}
                power2={preparedPredictions.next.power}
            />
        )}
    </DataView>
}
export default PowerPlantPowerDifferenceCard;
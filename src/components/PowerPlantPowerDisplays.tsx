import PowerDisplay from './PowerDisplay';
import { roundToTwoDecimalPlaces } from '../utils/power';
import { View } from 'react-native';
import React from 'react';
import DataView from './DataView';
import usePredictionByDays from "../hooks/usePredictionByDays";
import {navigationRef} from "../navigation/navigate";
import {StackActions} from "@react-navigation/native";
import {Routes} from "../navigation/routes";
import {ToastTypes} from "../types/toast.types";
import {usePowerPlantStore} from "../store/power-plant-store";
import {useToastStore} from "../store/toast-store";
import PowerDisplaysSkeleton from "./PowerDisplaysSkeleton";

const PowerPlantPowerDisplays = () => {
    const selectedPowerPlant = usePowerPlantStore(
        (state) => state.selectedPowerPlant
    );
    const { showToast } = useToastStore();


    const { data: predictions, isFetching: isFetchingPredictions } =
        usePredictionByDays(selectedPowerPlant?.id || '', {
            enabled: !!selectedPowerPlant,
            retry: false,
            onError: () => {
                navigationRef.dispatch(StackActions.replace(Routes.CALIBRATION));
                showToast('Te elektrarne še niste kalibrirali', ToastTypes.INFORMATION);
            },
        });

    return (
        <DataView
            isLoading={isFetchingPredictions}
            data={predictions}
            loadingComponent={<PowerDisplaysSkeleton/>}
        >
            {(predictions) => (
                <View className="flex flex-row justify-around px-4 pt-1">
                    <PowerDisplay
                        power={roundToTwoDecimalPlaces(predictions[0])}
                        text="Danes"
                        unit="kWh"
                    />
                    <PowerDisplay
                        power={roundToTwoDecimalPlaces(predictions[1])}
                        text="Jutri"
                        unit="kWh"
                        classNameContainer="mx-2"
                    />
                    <PowerDisplay
                        power={roundToTwoDecimalPlaces(predictions[2])}
                        text="Pojutrišnjem"
                        unit="kWh"
                    />
                </View>
            )}
        </DataView>
    );
};
export default PowerPlantPowerDisplays;

import {usePowerPlantStore} from "../store/power-plant-store";
import {useToastStore} from "../store/toast-store";
import usePrediction from "../hooks/usePrediction";
import {navigationRef} from "../navigation/navigate";
import {StackActions} from "@react-navigation/native";
import {Routes} from "../navigation/routes";
import {ToastTypes} from "../types/toast.types";
import DataView from "./DataView";
import {roundToTwoDecimalPlaces} from "../utils/power";
import {getTimeString} from "../utils/date";
import PowerDisplay from "./PowerDisplay";
import React from "react";
import PowerDisplaySkeleton from "./PowerDisplaySkeleton";

const PowerDisplayForNextTimeUnit = () => {
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

    const prediction = predictions ? predictions[0] : undefined;

    return <DataView isLoading={isFetchingPredictions} data={prediction} loadingComponent={<PowerDisplaySkeleton classNameContainer='flex-1 w-1/3'/>}>
        {(prediction) => (
            <PowerDisplay
                power={roundToTwoDecimalPlaces(prediction.power)}
                text={`Ob ${getTimeString(prediction.date)}`}
                unit="kW"
                classNameContainer="w-1/3 max-w-52"
            />
        )}
    </DataView>
}
export default PowerDisplayForNextTimeUnit;
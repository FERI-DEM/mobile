import {usePowerPlantStore} from "../store/power-plant-store";
import usePrediction from "../hooks/usePrediction";
import {navigationRef} from "../navigation/navigate";
import {StackActions} from "@react-navigation/native";
import {Routes} from "../navigation/routes";
import {ToastTypes} from "../types/toast.types";
import {useToastStore} from "../store/toast-store";
import {calculatePowerPercentageDifference} from "../utils/power";
import AlertCard from "./AlertCard";
import React, {useMemo} from "react";

const PowerPlantAlert  = () => {
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

    const difference = useMemo(() => {
        if (!predictions || isFetchingPredictions || predictions.length < 2) {
            return null;
        }
        const now = predictions[0];
        const next = predictions[1];

        return calculatePowerPercentageDifference(now.power, next.power);
    }, [predictions])

    if (!difference || isFetchingPredictions) {
        return null;
    }

    return  <AlertCard
            title={`Pozor padec energije čez ${
                30 - (new Date().getMinutes() % 15)
            } minut!`}
            message={`Čez ${
                30 - (new Date().getMinutes() % 15)
            } min bo proizvodnja padla za ${difference}%.`}
        />
}
export default PowerPlantAlert;
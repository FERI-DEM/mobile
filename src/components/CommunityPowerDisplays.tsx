import PowerDisplay from './PowerDisplay';
import { roundToTwoDecimalPlaces } from '../utils/power';
import { View } from 'react-native';
import React from 'react';
import useCommunitiesPredictionByDays from '../hooks/useCommunitiesPredictionByDays';
import { useCommunityStore } from '../store/community-store';
import DataView from './DataView';
import PowerDisplaysSkeleton from "./PowerDisplaysSkeleton";

const CommunityPowerDisplays = () => {
  const selectedCommunity = useCommunityStore(
    (state) => state.selectedCommunity
  );

  const { data: predictions, isFetching: isFetchingPredictions } =
    useCommunitiesPredictionByDays(selectedCommunity?.id || '', {
      enabled: !!selectedCommunity,
      retry: false,
    });

  return (
    <DataView
      isLoading={isFetchingPredictions}
      data={predictions}
      loadingComponent={<PowerDisplaysSkeleton/>}
    >
      {(predictions) => (
        <View className="flex flex-row justify-around pt-1 px-4">
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
export default CommunityPowerDisplays;

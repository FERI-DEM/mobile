import LineChart from './LineChart';
import usePowerPlantPowerHistory from '../hooks/usePowerPlantPowerHistory';
import { useMemo } from 'react';
import usePrediction from '../hooks/usePrediction';
import { usePowerPlantStore } from '../store/power-plant-store';
import { Text } from 'react-native';

const PowerPlantProductionLineChart = () => {
  const selectedPowerPlant = usePowerPlantStore(
    (state) => state.selectedPowerPlant
  );

  const { data: predictions, isLoading: isLoadingPrediction } = usePrediction(
    selectedPowerPlant?.id || '',
    {
      enabled: !!selectedPowerPlant,
      retry: false,
    }
  );
  const { data: history, isLoading: isHistoryLoading } =
    usePowerPlantPowerHistory(
      {
        id: selectedPowerPlant?.id || '',
        from: new Date(2023, 5, 14, 0, 0, 0, 0),
        to: new Date(),
      },
      { retry: false }
    );

  console.log(history);

  const mergedData = useMemo(() => {
    if (isHistoryLoading || isLoadingPrediction) return undefined;
    const preparedHistory =
      history?.map(({ timestamp, power }) => ({
        date: new Date(
          timestamp - new Date().getTimezoneOffset() * 60000
        ).toISOString(),
        power,
      })) || [];
    return [...preparedHistory, ...(predictions || [])];
  }, [predictions, history]);

  if (!mergedData) return <Text>Loading</Text>;

  return <LineChart data={mergedData} />;
};
export default PowerPlantProductionLineChart;

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
  const {
    data: history,
    isLoading: isHistoryLoading,
    fetchNextPage,
  } = usePowerPlantPowerHistory(selectedPowerPlant?.id || '', {
    retry: false,
    keepPreviousData: true,
    enabled: !!selectedPowerPlant,
  });

  const mergedData = useMemo(() => {
    if (!history || !predictions) return undefined;

    const reversedHistory = [...history.pages].reverse();
    const preparedHistory =
      reversedHistory.flat().map(({ timestamp, power }, index) => ({
        date: new Date(
          timestamp - new Date().getTimezoneOffset() * 60000
        ).toISOString(),
        power,
      })) || [];
    return [...preparedHistory, ...(predictions || [])];
  }, [predictions, history]);

  const onStopScrolling = (scrollX: number) => {
    console.log(scrollX);
    if (scrollX < 0) fetchNextPage();
  };

  if (!mergedData) return <Text>Loading...</Text>;

  return <LineChart data={mergedData} onStopScrolling={onStopScrolling} />;
};
export default PowerPlantProductionLineChart;

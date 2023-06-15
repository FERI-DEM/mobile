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

  const preparedHistory = useMemo(() => {
    if (!history) return undefined;

    const reversedHistory = [...history.pages].reverse();
    const preparedHistory = reversedHistory.flat().map((item) => ({
      date: new Date(
        item.timestamp - new Date().getTimezoneOffset() * 60000
      ).toISOString(),
      power: item.power,
    }));
    return preparedHistory.reverse();
  }, [history]);
  const onStopScrolling = (scrollX: number) => {
    if (scrollX < 0) fetchNextPage();
  };

  if (!predictions || !preparedHistory) return <Text>Loading...</Text>;

  return (
    <LineChart
      predictions={predictions}
      history={preparedHistory}
      onStopScrolling={onStopScrolling}
    />
  );
};
export default PowerPlantProductionLineChart;

import LineChart from './LineChart';
import usePowerPlantPowerHistory from '../hooks/usePowerPlantPowerHistory';
import React, { useMemo } from 'react';
import usePrediction from '../hooks/usePrediction';
import { usePowerPlantStore } from '../store/power-plant-store';
import DataView from './DataView';
import { graphHeight, graphHorizontalMargin } from '../constants/line-chart';
import { useDashboardTabsStore } from '../store/dashboard-tabs-store';

function View() {
  return null;
}

const PowerPlantProductionLineChart = () => {
  const selectedPowerPlant = usePowerPlantStore(
    (state) => state.selectedPowerPlant
  );
  const activeTab = useDashboardTabsStore((state) => state.activeTab);
  const { data: predictions } = usePrediction(selectedPowerPlant?.id || '', {
    enabled: !!selectedPowerPlant,
    retry: false,
  });
  const { data: history, fetchNextPage } = usePowerPlantPowerHistory(
    selectedPowerPlant?.id || '',
    {
      retry: false,
      keepPreviousData: true,
      enabled: !!selectedPowerPlant,
    }
  );

  const onStopScrolling = (scrollX: number) => {
    if (scrollX < 0) fetchNextPage();
  };

  const data = useMemo(() => {
    if (!predictions || !history) return undefined;

    const reversedHistory = [...history.pages].reverse();
    const preparedHistory = reversedHistory.flat().map((item) => ({
      date: new Date(
        item.timestamp - new Date().getTimezoneOffset() * 60000
      ).toISOString(),
      power: item.predictedPower,
    }));

    return { predictions, history: preparedHistory.reverse() };
  }, [predictions, history]);

  return (
    <DataView
      data={data}
      isLoading={!data}
      classNameLoadingContainer={`rounded-lg bg-dark-element shadow-lg shadow-black`}
      styleLoadingContainer={{
        height: graphHeight,
        marginHorizontal: graphHorizontalMargin,
      }}
    >
      {(data) => (
        <LineChart
          key={selectedPowerPlant?.id}
          predictions={data.predictions}
          history={data.history}
          onStopScrolling={onStopScrolling}
        />
      )}
    </DataView>
  );
};
export default PowerPlantProductionLineChart;

import { LineChartData, LineChartInputData } from '../types/powerPlant.types';
import { innerOffset, viewBoxSize, xUnit } from '../constants/line-chart';
import { ChartPoint } from '../types/chart.types';

export const prepareData = (
  predictions: LineChartInputData[],
  history: LineChartInputData[]
) => {
  const preparedPredictions = predictions.map((prediction, index) => ({
    date: prediction.date.slice(0, 16),
    x: xUnit * index,
    y: prediction.power,
  }));
  const preparedHistory = history.map((history, index) => ({
    date: history.date.slice(0, 16),
    x: -xUnit * index - xUnit,
    y: history.power,
  }));
  return {
    predictions: preparedPredictions,
    history: preparedHistory,
  };
};

export const createPathForRoundedCorners = (
  leftBottomCorner: ChartPoint,
  topRightCorner: ChartPoint,
  radius: number
) => {
  const leftBottom = `M ${leftBottomCorner.x},${leftBottomCorner.y} L ${
    leftBottomCorner.x + radius
  },${leftBottomCorner.y} A ${radius},${radius} 0 0,0 ${leftBottomCorner.x},${
    leftBottomCorner.y + radius
  } L ${leftBottomCorner.x},${leftBottomCorner.y}`;
  const rightBottom = `M ${topRightCorner.x},${leftBottomCorner.y} L ${
    topRightCorner.x - radius
  },${leftBottomCorner.y} A ${radius},${radius} 0 0,1 ${topRightCorner.x},${
    leftBottomCorner.y + radius
  } L ${topRightCorner.x},${leftBottomCorner.y}`;
  const topRight = `M ${topRightCorner.x},${topRightCorner.y} L ${
    topRightCorner.x
  },${topRightCorner.y - radius} A ${radius},${radius} 0 0,1 ${
    topRightCorner.x - radius
  },${topRightCorner.y} L ${topRightCorner.x},${topRightCorner.y}`;
  const topLeft = `M ${leftBottomCorner.x},${topRightCorner.y} L ${
    leftBottomCorner.x
  },${topRightCorner.y - radius} A ${radius},${radius} 0 0,0 ${
    leftBottomCorner.x + radius
  },${topRightCorner.y} L ${leftBottomCorner.x},${topRightCorner.y}`;
  return leftBottom + ' ' + rightBottom + ' ' + topRight + ' ' + topLeft;
};

export const prepareActiveData = (
  data: {
    predictions: LineChartData[];
    history: LineChartData[];
  },
  translate: number
) => {
  'worklet';
  const viewPortWidth = viewBoxSize.width - innerOffset.x;
  const result: LineChartData[] = [];

  const reversedHistory = [...data.history].reverse();

  const mergedData = [...reversedHistory, ...data.predictions];

  const indexOfFirstPrediction = data.history.length;
  for (
    let i =
      indexOfFirstPrediction +
      Math.round((-translate - 2 * viewPortWidth) / 10);
    i <
    indexOfFirstPrediction + Math.round((-translate + 3 * viewPortWidth) / 10);
    i++
  ) {
    if (!mergedData[i]) continue;
    result.push(mergedData[i]);
  }

  return result;
};

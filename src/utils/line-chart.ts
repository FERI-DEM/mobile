import { PredictedValue } from '../types/powerPlant.types';
import { innerOffset, viewBoxSize, xUnit } from '../constants/line-chart';
import { ChartPoint } from '../types/chart.types';
import { roundToNearest15Minutes } from './round-time';

export const prepareData = (data: PredictedValue[]) => {
  const currentDateAndTime = roundToNearest15Minutes(
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  )
    .toISOString()
    .slice(0, 16);
  const currentDateIndex = data.findIndex(
    ({ date }) => date.slice(0, 16) === currentDateAndTime
  );
  return data.map((data, index) => ({
    date: data.date.slice(0, 16),
    x: xUnit * (index - currentDateIndex) + xUnit * 3,
    y: data.power,
  }));
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
  data: { date: string; x: number; y: number }[],
  translate: number
) => {
  'worklet';
  const start = performance.now();

  const viewPortWidth = viewBoxSize.width - innerOffset.x;
  const result = data.filter(
    ({ x }) =>
      x < -translate + 3 * viewPortWidth && x > -translate - 2 * viewPortWidth
  );

  const end = performance.now();
  console.log('Timeeeeeee', end - start);
  return result;
};

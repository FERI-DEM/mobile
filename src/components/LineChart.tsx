import { useWindowDimensions, View } from 'react-native';
import React, { useEffect } from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import Animated, {
  cancelAnimation,
  runOnJS,
  runOnUI,
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LineChartData, LineChartInputData } from '../types/powerPlant.types';
import {
  createPathForRoundedCorners,
  prepareActiveData,
  prepareData,
} from '../utils/line-chart';
import { generateTextPath } from '../utils/chart-text';
import {
  fallbackForMaxValue,
  fontSize,
  graphHeight,
  graphHorizontalMargin,
  innerOffset,
  padding,
  viewBoxSize,
  xUnit,
} from '../constants/line-chart';
import LineChartBackToPresentButton from './LineChartBackToPresentButton';
import {colors} from "../constants/colors";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedGroup = Animated.createAnimatedComponent(G);

interface LineChartProps {
  predictions: LineChartInputData[];
  history: LineChartInputData[];
  onStopScrolling: (scrollX: number) => void;
}

const LineChart = ({
  predictions,
  history,
  onStopScrolling,
}: LineChartProps) => {
  const window = useWindowDimensions();
  const graphWidth = window.width - graphHorizontalMargin * 2;

  const activeScale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const zoomPoint = useSharedValue(30);

  const translateLimits = useSharedValue({ min: 0, max: 100 });
  const activeTranslate = useSharedValue(0);
  const savedTranslate = useSharedValue(0);
  const isBackToPresentButtonActive = useSharedValue(false);

  const data = useSharedValue(prepareData(predictions, history));
  const activeData = useSharedValue<LineChartData[]>([]);

  const maxInActiveData = useDerivedValue(() => {
    const max = Math.max(...activeData.value.map(({ y }) => y));
    return withTiming(Math.max(max, fallbackForMaxValue), { duration: 400 });
  });

  const xLegend = useSharedValue('');
  const yLegend = useSharedValue('');
  const linePath = useSharedValue('');
  const areaPath = useSharedValue('');

  useEffect(() => {
    data.value = prepareData(predictions, history);
    activeData.value = prepareActiveData(
      prepareData(predictions, history),
      savedTranslate.value
    );
  }, [predictions, history]);

  const createYLegend = (max: number) => {
    const numberOfLabels = 6;
    const ratio = max / (viewBoxSize.height - innerOffset.y - padding);
    const unit =
      (viewBoxSize.height - innerOffset.y - padding) / numberOfLabels;

    const labels = Array.from({ length: numberOfLabels + 1 }, (_, i) =>
      Math.round(i * unit * ratio).toString()
    );
    let path = '';
    labels.forEach((label, index) => {
      path += generateTextPath(label + 'kW', { y: index * unit }) + ' ';
    });
    runOnUI(() => {
      yLegend.value = path;
    })();
  };

  const createXLegend = (data: LineChartData[]) => {
    let path = '';
    data.forEach(({ x, date: dateAndTime }) => {
      const [date, time] = dateAndTime.split('T');
      path += generateTextPath(time, { x, y: -innerOffset.y / 2.5 }) + ' ';

      if (x % (4 * xUnit) === 0)
        path += generateTextPath(date, { x, y: -innerOffset.y / 1.2 }) + ' ';
    });
    runOnUI(() => {
      xLegend.value = path;
    })();
  };

  const createLine = () => {
    let path = '';
    if (activeData.value.length > 1) {
      const unitLength = activeData.value[1].x - activeData.value[0].x;
      for (let i = 0; i < activeData.value.length; i++) {
        let { x, y } = activeData.value[i];
        x = zoomPoint.value + (x - zoomPoint.value) * activeScale.value;
        y =
          (y / maxInActiveData.value) *
          (viewBoxSize.height - innerOffset.y - padding);
        if (i === 0) {
          path = `M ${x},${y} `;
          continue;
        }

        let { x: prevX, y: prevY } = activeData.value[i - 1];
        prevX =
          zoomPoint.value +
          (prevX - zoomPoint.value) * activeScale.value +
          0.5 * unitLength * activeScale.value;
        prevY =
          (prevY / maxInActiveData.value) *
          (viewBoxSize.height - innerOffset.y - padding);

        path += `C ${prevX},${prevY} ${
          x - 0.5 * unitLength * activeScale.value
        },${y} ${x},${y} `;
      }
    }
    runOnUI(() => {
      linePath.value = path;
    })();
  };

  const createArea = () => {
    let path = '';

    if (activeData.value.length > 1) {
      const unitLength = activeData.value[1].x - activeData.value[0].x;
      path = `M ${
        zoomPoint.value +
        (activeData.value[0].x - zoomPoint.value) * activeScale.value
      },0 `;
      for (let i = 0; i < activeData.value.length; i++) {
        let { x, y } = activeData.value[i];
        x = zoomPoint.value + (x - zoomPoint.value) * activeScale.value;
        y =
          (y / maxInActiveData.value) *
          (viewBoxSize.height - innerOffset.y - padding);
        if (i === 0) {
          path += `L ${x},${y} `;
          continue;
        }

        let { x: prevX, y: prevY } = activeData.value[i - 1];
        prevX =
          zoomPoint.value +
          (prevX - zoomPoint.value) * activeScale.value +
          0.5 * unitLength * activeScale.value;
        prevY =
          (prevY / maxInActiveData.value) *
          (viewBoxSize.height - innerOffset.y - padding);

        path += `C ${prevX},${prevY} ${
          x - 0.5 * unitLength * activeScale.value
        },${y} ${x},${y} `;
      }
      path += `L ${
        zoomPoint.value +
        (activeData.value[activeData.value.length - 1].x - zoomPoint.value) *
          activeScale.value
      },0`;
    }
    runOnUI(() => {
      areaPath.value = path;
    })();
  };

  const pinchGesture = Gesture.Pinch()
    .onStart((e) => {
      zoomPoint.value =
        (e.focalX / (graphWidth * savedScale.value)) * 75 -
        activeTranslate.value;
    })
    .onUpdate((e) => {
      activeScale.value = e.scale;
    })
    .onEnd(() => {
      translateLimits.value = {
        min:
          zoomPoint.value +
          (translateLimits.value.min - zoomPoint.value) * activeScale.value,
        max: 100,
      };
      savedScale.value *= activeScale.value;
      activeData.value = activeData.value.map(({ x, y, date }) => ({
        x: zoomPoint.value + (x - zoomPoint.value) * activeScale.value,
        y,
        date,
      }));
      activeScale.value = 1;
    });

  const panGesture = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      savedTranslate.value = activeTranslate.value;
      cancelAnimation(activeTranslate);
      isBackToPresentButtonActive.value = false;
    })
    .onUpdate((e) => {
      const newTranslate = savedTranslate.value + e.translationX * 0.2;
      // //TODO: max limit
      // if(newTranslate + translateLimits.value.min < 0)
      activeTranslate.value = newTranslate;
      isBackToPresentButtonActive.value = false;
    })
    .onEnd((e) => {
      activeTranslate.value = withDecay(
        { velocity: e.velocityX / 10 },
        (data) => {
          runOnJS(onStopScrolling)(
            savedTranslate.value - activeTranslate.value
          );
          isBackToPresentButtonActive.value = true;
          savedTranslate.value = activeTranslate.value;
        }
      );
    });

  useAnimatedReaction(
    () => savedTranslate.value,
    (result) => {
      activeData.value = prepareActiveData(data.value, result);
    },
    []
  );
  useAnimatedReaction(
    () => activeData.value,
    (result) => {
      runOnJS(createXLegend)(result);
      runOnJS(createLine)();
      runOnJS(createArea)();
    },
    []
  );
  useAnimatedReaction(
    () => maxInActiveData.value,
    (result) => {
      runOnJS(createYLegend)(result);
      runOnJS(createLine)();
      runOnJS(createArea)();
    },
    []
  );

  const animatedProps = useAnimatedProps(() => ({ d: linePath.value }));
  const areaAnimatedProps = useAnimatedProps(() => ({ d: areaPath.value }));
  const animatedTranslateProps = useAnimatedProps(() => ({
    x: activeTranslate.value,
  }));
  const animatedXLegendProps = useAnimatedProps(() => ({ d: xLegend.value }));
  const animatedYLegendProps = useAnimatedProps(() => ({ d: yLegend.value }));

  return (
      <View
        className="rounded-lg bg-red-500 flex items-center bg-dark-element mx-auto relative"
        style={{ width: graphWidth, height: graphHeight }}
      >
        <LineChartBackToPresentButton
          savedTranslate={savedTranslate}
          activeTranslate={activeTranslate}
          isBackToPresentButtonActive={isBackToPresentButtonActive}
        />
        <GestureDetector gesture={panGesture}>
          <GestureDetector gesture={pinchGesture}>
            <Svg
              preserveAspectRatio="none"
              scaleY={-1}
              viewBox={`${-innerOffset.x} ${-innerOffset.y} ${
                viewBoxSize.width
              } ${viewBoxSize.height}`}
              style={{
                width: graphWidth,
                height: graphHeight,
                backgroundColor: colors.dark.element,
              }}
            >
              <Rect
                y={-innerOffset.y}
                width={graphWidth}
                height={innerOffset.y}
                fill={colors.dark.element}
              />
              <AnimatedGroup animatedProps={animatedTranslateProps}>
                <AnimatedPath
                  strokeWidth={0.5}
                  animatedProps={animatedProps}
                  stroke="rgba(245, 133, 43, 1)"
                  fill="none"
                />
                <AnimatedPath
                  animatedProps={areaAnimatedProps}
                  stroke="none"
                  fill="rgba(245, 133, 43, 0.3)"
                />
                <AnimatedPath
                  animatedProps={animatedXLegendProps}
                  strokeWidth="0.2"
                  stroke="white"
                />
                {/*<Path stroke='white' strokeWidth={0.1} d='M 0,0 L 0,3 M 0,6 L 0,9 M 0,12 L 0,15 M 0,18 L 0,21'/>*/}
              </AnimatedGroup>

              <Rect
                width={innerOffset.x}
                x={-innerOffset.x}
                height={viewBoxSize.height}
                y={-innerOffset.y}
                fill={colors.dark.element}
              />
              <AnimatedPath
                x={-innerOffset.x / 2}
                y={-fontSize / 2}
                animatedProps={animatedYLegendProps}
                strokeWidth="0.2"
                stroke="white"
              />
              <Path
                fill={colors.dark.primary}
                d={createPathForRoundedCorners(
                  {
                    x: -innerOffset.x,
                    y: -innerOffset.y,
                  },
                  {
                    x: viewBoxSize.width - innerOffset.x,
                    y: viewBoxSize.height - innerOffset.y,
                  },
                  2
                )}
              />
            </Svg>
          </GestureDetector>
        </GestureDetector>
      </View>
  );
};
export default LineChart;

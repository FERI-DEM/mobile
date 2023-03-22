import { LineChart as ReactLineChart } from 'react-native-chart-kit';
import React from 'react';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 32;

const data = {
    labels: ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
    datasets: [
        {
            data: [20, 45, 28, 50, 11, 44, 23],
            color:  () => '#F18F37',
            strokeWidth: 2,
            withDots:false
        }
    ]
};

const chartConfig = {
    backgroundGradientFrom: "#292A3E",
    backgroundGradientTo: "#292A3E",
    color: (opacity = 1) => `rgba(87, 91, 112, ${opacity})`,
};

const LineChart = () => {
    const formatYLabel = (labelValue: string) => {
        return labelValue + " kw";
    };
    return (
            <ReactLineChart
                data={data}
                width={chartWidth}
                height={300}
                chartConfig={chartConfig}
                bezier
                style={{
                    borderRadius: 16,
                    elevation: 8,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                }}
                formatYLabel={formatYLabel}
            />
    );
};

export default LineChart;

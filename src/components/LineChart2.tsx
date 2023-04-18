import {VictoryChart, VictoryLine, VictoryZoomContainer} from "victory-native";
import {FC} from "react";

interface PredictedValue {
    date: string;
    power: number;
}

interface LineChartProps {
    prediction:PredictedValue[]
}

const LineChart2:FC<LineChartProps> = ({ prediction }) => {

    //const data = prediction.map(({ date, power }) => ({ x: date, y: power }));
    const data = [
        { x: 1, y: 20 },
        { x: 2, y: 45 },
        { x: 3, y: 28 },
        { x: 4, y: 50 },
        { x: 5, y: 11 },
        { x: 6, y: 44 },
        { x: 7, y: 23 },
        { x: 8, y: 43 },
        { x: 9, y: 22 },
        { x: 10, y: 31 },
    ];

    const customTheme = {
        axis: {
            style: {
                axis: {
                    stroke: '#50556C',
                    strokeWidth: 1,
                },
                tickLabels: {
                    fill: '#50556C',
                    fontSize: 14,
                    padding: 5,
                    fontFamily: 'Arial',
                },
                grid: {
                    stroke: "#50556C",
                    strokeDasharray: "10, 10"
                }
            },
        },
    };

    return (
        <VictoryChart theme={customTheme}  domainPadding={{ x: 0, y: 20 }} containerComponent={<VictoryZoomContainer zoomDimension="x"  zoomDomain={{x: [1, 5]}}/>}>
            <VictoryLine
                style={{
                    data: { stroke: "#F5852B", strokeWidth: 3 },
                    parent: { border: "1px solid #ccc"}

                }}
                data={data}
                interpolation="natural"
            />
        </VictoryChart>
    );
};

export default LineChart2;

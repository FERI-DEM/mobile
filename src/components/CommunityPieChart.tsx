import useCommunityMembersPowerShare from '../hooks/useCommunityMembersPowerShare';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import {
    calculatePointOnCircle,
    getPieChartPiecePath,
} from '../utils/pie-chart';
import { getColor} from '../utils/random-color';
import {useCommunityStore} from "../store/community-store";
import React, {useMemo} from "react";
import {graphHeight, graphHorizontalMargin} from "../constants/line-chart";
import LineChart from "./LineChart";
import DataView from "./DataView";

const CommunityPieChart = () => {
    const pieChartHeight = 300;
    const selectedCommunity = useCommunityStore(state => state.selectedCommunity);

    const { data: membersPowerShare, isLoading } = useCommunityMembersPowerShare(
        selectedCommunity?.id || '',
        { enabled: !!selectedCommunity }
    );

    const pieChartData = useMemo(() => {
        if (!membersPowerShare) return [];
        return membersPowerShare.map((member, index, array) => {
            const startAngle = array.filter((_, i) => i < index).reduce((acc, curr) => acc + curr.share * 360, 0)
            const endAngle = startAngle + member.share * 360

            return {
                ...member,
                share: (member.share * 100).toFixed(0),
                from: startAngle,
                to: endAngle,
                textPosition: calculatePointOnCircle(70, (startAngle + endAngle) / 2, {
                    x: 100,
                    y: 100,
                }),
            }
        });
    }, [membersPowerShare]);
    return <DataView
        data={pieChartData}
        isLoading={isLoading}
        classNameLoadingContainer={``}
        styleLoadingContainer={{
            height: pieChartHeight,
        }}
    >
        {(data) => (
            <Svg
                viewBox="0 0 200 200"
                className="w-full"
                style={{ height: pieChartHeight, backgroundColor: '#1C1B2D' }}
            >
                {data?.map((data, index) => (
                    <Path
                        key={index}
                        d={getPieChartPiecePath(100, data.from, data.to)}
                        fill={getColor(index)}
                        stroke={'#1C1B2D'}
                        strokeWidth={2}
                    />
                ))}
                {data?.map((data, index) => (
                    <G
                        key={index}
                        transform={`rotate(0, ${data.textPosition.x}, ${data.textPosition.y})`}
                        x={data.textPosition.x}
                        y={data.textPosition.y}
                    >
                        <SvgText
                            stroke="white"
                            textAnchor="middle"
                            fontSize={10}
                            fontWeight={1}
                            y={-6}
                        >
                            {data.user}
                        </SvgText>
                        <SvgText
                            stroke="white"
                            textAnchor="middle"
                            fontSize={10}
                            fontWeight={1}
                            y={6}
                        >
                            {data.share + '%'}
                        </SvgText>
                    </G>
                ))}
            </Svg>
        )}
    </DataView>
}
export default CommunityPieChart;
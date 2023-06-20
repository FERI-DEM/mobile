import useCommunityMembersPowerShare from '../hooks/useCommunityMembersPowerShare';
import Svg, {G, Path, Rect, Text as SvgText} from 'react-native-svg';
import {
    calculatePointOnCircle,
} from '../utils/pie-chart';
import {useCommunityStore} from "../store/community-store";
import React, {useMemo} from "react";
import DataView from "./DataView";
import PieChartPiece from "./PieChartPiece";
import ViewportAwareView, {ViewportAwareViewMode} from "./ViewportAwareView";
import Skeleton from "./Skeleton";
import {colors} from "../constants/colors";

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

    console.log(calculatePointOnCircle(70, (200) / 2, {
        x: 100,
        y: 100,
    }))

    return <DataView
        data={pieChartData}
        isLoading={isLoading}
        loadingComponent={<Skeleton classNameContainer={'shadow-lg shadow-black dark:bg-dark-element'} style={{height: pieChartHeight}}>
            <Svg viewBox='0 0 200 200' style={{ height: pieChartHeight, backgroundColor: colors.dark.primary }}>
                <Path d='M 100 0 A 100 100 0 1 1 65.8 194 L 100 100 L 100 0 Z' fill={colors.dark.element} stroke={colors.dark.primary}/>
                <Path d='M 65.8 194 A 100 100 0 0 1 13.4 150 L 100 100 L 65.8 194 Z' fill={colors.dark.element} stroke={colors.dark.primary}/>
                <Path d='M 13.4 150 A 100 100 0 0 1 100 0 L 100 100 L 13.4 150 Z' fill={colors.dark.element} stroke={colors.dark.primary}/>
                <Rect fill={colors.dark.skeletonContent} width={30} height={10} x={155} y={95}/>
                <Rect fill={colors.dark.skeletonContent} width={30} height={10} x={35} y={153}/>
                <Rect fill={colors.dark.skeletonContent} width={30} height={10} x={28} y={50}/>
            </Svg>
        </Skeleton>}
    >
        {(data) => (
            <ViewportAwareView  mode={ViewportAwareViewMode.CENTER}>
            <Svg
                viewBox="0 0 200 200"
                className="w-full"
                style={{ height: pieChartHeight, backgroundColor: colors.dark.primary }}
            >
                {data?.map((data, index) => (
                    <PieChartPiece data={data} key={index} index={index}/>
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
                </ViewportAwareView>
        )}
    </DataView>
}
export default CommunityPieChart;
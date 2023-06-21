import Svg, {Path, Rect} from "react-native-svg";
import {colors} from "../constants/colors";
import Skeleton from "./Skeleton";
import React from "react";

interface LineChartSkeletonProps {
    height: number;
}
const LineChartSkeleton = ({height}: LineChartSkeletonProps) => {
    return <Skeleton classNameContainer='flex-1' style={{
        height: height,
    }}>
        <Svg preserveAspectRatio='none' viewBox='0 0 200 200' style={{ height: 300, backgroundColor: colors.dark.element }}>
            {[...Array(8).keys()].map((v, i) => (
                <Rect key={i} fill={colors.dark.skeletonContent} width={16} height={7} x={25 + i * 21} y={172}/>
            ))}
            {[...Array(3).keys()].map((v, i) => (
                <Rect key={i} fill={colors.dark.skeletonContent} width={33} height={7} x={28 + i * 65} y={187}/>
            ))}
            {[...Array(7).keys()].map((v, i) => (
                <Rect key={i} fill={colors.dark.skeletonContent} width={16} height={7} x={5} y={10 + i * 25}/>
            ))}
            <Path d='M 25,165 C 38,165 33,100 46,100 C 59,100 54,70 67,70 C 80,70 75,140, 88,140 C 101,140 96,30 109,30 C 122,30, 117,155 130,155 C 143,155 138,130 151,130 C 164,130 159,90 172,90 C 185,90 180,120 193,120 L 193,165 L 25,165' strokeWidth={0} stroke='rgba(61,62,95,0.6)' fill='rgba(61,62,95,0.6)'/>
            <Path d='M 25,165 C 38,165 33,100 46,100 C 59,100 54,70 67,70 C 80,70 75,140, 88,140 C 101,140 96,30 109,30 C 122,30, 117,155 130,155 C 143,155 138,130 151,130 C 164,130 159,90 172,90 C 185,90 180,120 193,120' strokeWidth={2} stroke={colors.dark.skeletonContent}/>

        </Svg>
    </Skeleton>
}
export default LineChartSkeleton;
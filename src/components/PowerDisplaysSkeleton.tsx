import {View} from "react-native";
import PowerDisplaySkeleton from "./PowerDisplaySkeleton";

const PowerDisplaysSkeleton = () => {
    return <View className="flex flex-row pb-5">
        <PowerDisplaySkeleton/>
        <PowerDisplaySkeleton classNameContainer='mx-2'/>
        <PowerDisplaySkeleton/>
    </View>
}
export default PowerDisplaysSkeleton;
import {View} from "react-native";
import PowerDisplaySkeleton from "./PowerDisplaySkeleton";

const PowerDisplaysSkeleton = () => {
    return <View className="flex flex-row">
        <PowerDisplaySkeleton/>
        <PowerDisplaySkeleton classNameContainer='mx-2'/>
        <PowerDisplaySkeleton/>
    </View>
}
export default PowerDisplaysSkeleton;
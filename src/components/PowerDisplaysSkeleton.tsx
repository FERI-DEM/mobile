import {View} from "react-native";
import PowerDisplaySkeleton from "./PowerDisplaySkeleton";

const PowerDisplaysSkeleton = () => {
    return <View className="flex flex-row pt-1 px-4">
        <PowerDisplaySkeleton/>
        <PowerDisplaySkeleton classNameContainer='mx-2'/>
        <PowerDisplaySkeleton/>
    </View>
}
export default PowerDisplaysSkeleton;
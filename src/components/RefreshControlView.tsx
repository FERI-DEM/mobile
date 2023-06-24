import {RefreshControl, ScrollViewProps} from "react-native";
import React, {Children, cloneElement, ReactElement, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useColorScheme} from "nativewind";
import {colors} from "../constants/colors";

interface RefreshControlViewProps {
    children: ReactElement<ScrollViewProps> // must be scroll view in order to work
    queryKeysForInvalidation?: string[]
}
const RefreshControlView = ({children, queryKeysForInvalidation}: RefreshControlViewProps) => {
    const {colorScheme} = useColorScheme()
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
        queryKeysForInvalidation?.forEach(key => {
            queryClient.invalidateQueries([key]);
        })
    }

    return <>
        {Children.map(children, child => {
            return cloneElement(child, {
                refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors[colorScheme].text]}
                                                progressBackgroundColor={colors.common.tint}
                                                tintColor={colors.common.tint}/>
        })
    })}
</>
}
export default RefreshControlView;
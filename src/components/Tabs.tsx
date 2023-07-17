import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";

interface TabsProps<T> {
    tabs: T[]
    onClickTab: (tab: T) => void
    activeTab: T
}
const Tabs = <T extends string>({ tabs, onClickTab, activeTab }:TabsProps<T>) => {
    return <View className='px-5'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='gap-5 pb-6'>
            {tabs.map((tab, index) => (
                <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => onClickTab(tab)}>
                    <Text className={`text-white opacity-40 ${tab === activeTab && 'text-tint opacity-100'}`}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
}
export default Tabs;
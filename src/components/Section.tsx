import React, {ReactNode} from "react";
import {Text, View} from "react-native";
import {twMerge} from "tailwind-merge";

interface ScreenSectionProps {
    heading?: string;
    children: ReactNode;
    classNameHeading?: string;
    classNameContainer?: string;
}
const Section = ({heading, children, classNameHeading, classNameContainer}: ScreenSectionProps) => {
    return <View className={twMerge('mb-7 flex-1', classNameContainer)}>
        {heading && <Text className={twMerge('text-white mb-3', classNameHeading)}>
            {heading}
        </Text>}
        {children}
    </View>
}
export default Section;
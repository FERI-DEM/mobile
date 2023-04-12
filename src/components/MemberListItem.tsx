import React, {FC} from 'react';
import {Text, View} from "react-native";

interface MemberListItemProps {
    text: string;
}

const MemberListItem: FC<MemberListItemProps> = ({text}) => {
    return (
        <View className='flex flex-row justify-start bg-dark-element py-4 px-8 mb-0.5 items-center'>
            <Text className='text-white'>{text}</Text>
        </View>
    );
};

export default MemberListItem;
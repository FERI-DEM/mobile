import React, {FC} from 'react';
import {Text, View} from "react-native";

interface MemberListItemProps {
    text: string;
}

const MemberListItem: FC<MemberListItemProps> = ({text}) => {
    return (
        <View className='flex flex-row justify-start rounded-md bg-dark-element py-3 px-5 mb-0.5 items-center'>
            <Text className='text-white'>{text}</Text>
        </View>
    );
};

export default MemberListItem;
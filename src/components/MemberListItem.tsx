import React, {FC} from 'react';
import {View, Text} from "react-native";

interface TestMemberListItemProps {
    text: string;
}
const MemberListItem:FC<TestMemberListItemProps> = ({text}) => {
    return (
        <View className='flex flex-row justify-start rounded-md bg-dark-element py-3 px-5 mb-0.5 items-center'>
            <Text className='text-white'>{text}</Text>
        </View>
    );
};

export default MemberListItem;
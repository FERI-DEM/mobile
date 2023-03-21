import React, {FC} from 'react';
import {Pressable, Text, View} from "react-native";

interface MemberListItemProps {
    member: string;
    power: number;
    active: boolean;
    onPress: () => void;
}

const MemberListItem: FC<MemberListItemProps> = ({ member, power , active, onPress}) => {
    return (
        <Pressable className={`flex flex-row justify-between bg-dark-element py-4 px-8 mb-0.5 items-center ${active && 'border-l-tint border-2 border-y-0 border-r-0'}`} onPress={onPress}>
            <Text className={`text-white ${active && 'text-tint'}`}>{member}</Text>
            <View className='bg-tint w-8 h-8 rounded-md'>
                <Text className={`text-center m-auto text-xs ${active && 'text-white'}`}>{power}</Text>
            </View>
        </Pressable>
    );
};

export default MemberListItem;
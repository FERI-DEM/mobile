import React, {FC} from 'react';
import {Pressable, Text} from "react-native";

interface MemberListItemProps {
    member: string;
    power: number;
    active: boolean;
    onPress?: () => void;
}

const MemberListItem: FC<MemberListItemProps> = ({ member, power , active, onPress}) => {
    return (
        <Pressable className={`flex flex-row justify-between bg-dark-element py-5 px-5 mb-0.5 items-center ${active && 'border-l-tint border-2 border-y-0 border-r-0'}`} onPress={onPress}>
            <Text className={`text-white ${active && 'text-tint font-bold'}`}>{member}</Text>
            <Text className={`text-white ${active && 'text-tint font-bold'}`}>{power} kW</Text>
        </Pressable>
    );
};

export default MemberListItem;
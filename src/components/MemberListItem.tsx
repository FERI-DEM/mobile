import React, {FC} from 'react';
import {View, Text} from "react-native";
import { UserCircleIcon, BoltIcon } from "react-native-heroicons/outline";
import Button from "./Button";

interface TestMemberListItemProps {
    user: string;
    powerPlant: string;
    isAdmin: boolean;
    action: () => void;
}
const MemberListItem:FC<TestMemberListItemProps> = ({ user, powerPlant, isAdmin, action }) => {

    return (
        <View className='flex flex-row justify-between rounded-md bg-dark-element py-3 px-5 mb-0.5 items-center'>
            <View className='flex gap-1'>
                <View className='flex flex-row items-center'>
                    <UserCircleIcon/>
                    <Text className='text-white ml-2'>{user}</Text>
                </View>
                <View className='flex flex-row items-center'>
                    <BoltIcon/>
                    <Text className='text-white ml-2'>{powerPlant}</Text>
                </View>
            </View>
            <View>
                {!isAdmin && <Button text={'Odstrani'} onPress={() => action} />}
            </View>
        </View>
    );
};

export default MemberListItem;
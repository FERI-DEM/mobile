import React, {FC} from 'react';
import {View, Text} from "react-native";
import { UserCircleIcon, BoltIcon } from "react-native-heroicons/outline";
import Button from "./Button";
import useCommunityRemoveMemberMutation from "../hooks/useCommunityRemoveMemberMutation";
import {CommunityMember} from "../types/community.types";

interface TestMemberListItemProps {
    communityId: string;
    member: CommunityMember;
}
const MemberListItem:FC<TestMemberListItemProps> = ({ member, communityId }) => {
    const {mutate: removeMember} = useCommunityRemoveMemberMutation(communityId, member.userId, {
        onSuccess: () => console.log('Success')
    })

    return (
        <View className='flex flex-row justify-between rounded-md bg-dark-element py-3 px-5 mb-0.5 items-center'>
            <View className='flex gap-1'>
                <View className='flex flex-row items-center'>
                    <UserCircleIcon/>
                    <Text className='text-white ml-2'>{member.userName}</Text>
                </View>
                <View className='flex flex-row items-center'>
                    <BoltIcon/>
                    <Text className='text-white ml-2'>{member.powerPlantName}</Text>
                </View>
            </View>
            <View>
                {!member.isAdmin && <Button text={'Odstrani'} onPress={() => removeMember} />}
            </View>
        </View>
    );
};

export default MemberListItem;
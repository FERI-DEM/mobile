import React, { FC } from 'react';
import { View, Text } from 'react-native';
import {
  UserCircleIcon,
  BoltIcon,
  XCircleIcon,
  ArrowRightOnRectangleIcon,
} from 'react-native-heroicons/outline';
import Button from './Button';
import useCommunityRemoveMemberMutation from '../hooks/useCommunityRemoveMemberMutation';
import { CommunityMember } from '../types/community.types';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import useUser from '../hooks/useUser';
import { QueryKey } from '../types/keys.types';
import { useQueryClient } from '@tanstack/react-query';
import useCommunityLeaveMutation from '../hooks/useCommunityLeaveMutation';
import { Routes } from '../navigation/routes';
import { navigate } from '../navigation/navigate';

interface TestMemberListItemProps {
  communityId: string;
  member: CommunityMember;
  adminId: string;
}
const MemberListItem: FC<TestMemberListItemProps> = ({
  member,
  communityId,
  adminId,
}) => {
  const { showToast } = useToastStore();
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: removeMember, isLoading: isRemoveMemberLoading } =
    useCommunityRemoveMemberMutation(
      communityId,
      member.userId,
      member.powerPlantId,
      {
        onSuccess: () => {
          showToast('Član uspešno odstranjen!', ToastTypes.SUCCESS);
          queryClient.invalidateQueries({ queryKey: [QueryKey.COMMUNITY] });
        },
        onError: () => {
          showToast('Napaka pri odstranjevanju člana!', ToastTypes.ERROR);
        },
      }
    );

  const { mutate: leaveCommunity, isLoading: isLeaveCommunityLoading } =
    useCommunityLeaveMutation(communityId, member.powerPlantId, {
      onSuccess: () => {
        navigate(Routes.ADD_COMMUNITY);
        showToast('Uspešno ste zapustili skupnost!', ToastTypes.SUCCESS);
        queryClient.removeQueries([QueryKey.COMMUNITIES]);
        queryClient.invalidateQueries({ queryKey: [QueryKey.COMMUNITIES] });
      },
      onError: () => {
        showToast('Napaka pri zapuščanje skupnosti!', ToastTypes.ERROR);
      },
    });

  const onLeaveCommunity = () => {
    leaveCommunity();
  };

  const onRemoveMember = () => {
    removeMember();
  };

  return (
    <View className="flex flex-row justify-between rounded-md bg-dark-element py-3 px-5 mb-0.5 items-center">
      <View className="flex gap-2">
        <View className="flex flex-row items-center">
          <UserCircleIcon color="white" />
          <Text
            className={`${
              user?.id === member.userId ? 'text-tint' : 'dark:text-white'
            } ml-2`}
          >
            {member.userName}
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <BoltIcon color="orange" />
          <Text
            className={`${
              user?.id === member.userId ? 'text-tint' : 'dark:text-white'
            } ml-2`}
          >
            {member.powerPlantName}
          </Text>
        </View>
      </View>
      <View>
        {user?.id === adminId && user?.id != member.userId && (
          <Button
            classname="bg-dark-element"
            text={<XCircleIcon color="white" />}
            onPress={onRemoveMember}
            loading={isRemoveMemberLoading}
          />
        )}
        {!member.isAdmin && user?.id === member.userId && (
          <Button
            classname="bg-gray-500"
            text={<ArrowRightOnRectangleIcon color="white" />}
            onPress={onLeaveCommunity}
            loading={isLeaveCommunityLoading}
          />
        )}
      </View>
    </View>
  );
};

export default MemberListItem;

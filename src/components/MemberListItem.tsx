import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { UserCircleIcon, BoltIcon } from 'react-native-heroicons/outline';
import Button from './Button';
import useCommunityRemoveMemberMutation from '../hooks/useCommunityRemoveMemberMutation';
import { CommunityMember } from '../types/community.types';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';

interface TestMemberListItemProps {
  communityId: string;
  member: CommunityMember;
}
const MemberListItem: FC<TestMemberListItemProps> = ({
  member,
  communityId,
}) => {
  const { showToast } = useToastStore();

  const { mutate: removeMember } = useCommunityRemoveMemberMutation(
    communityId,
    member.userId,
    {
      onSuccess: () => {
        showToast('Član uspešno odstranjen!', ToastTypes.SUCCESS);
      },
      onError: () => {
        showToast('Napaka pri odstranjevanju člana!', ToastTypes.ERROR);
      },
    }
  );

  const onRemoveMember = () => {
    if (member.isAdmin) {
      showToast(
        'Ne morete zapustiti skupnosti, saj ste administrator!',
        ToastTypes.INFORMATION
      );
      return;
    } else {
      removeMember();
    }
  };

  return (
    <View className="flex flex-row justify-between rounded-md bg-dark-element py-3 px-5 mb-0.5 items-center">
      <View className="flex gap-2">
        <View className="flex flex-row items-center">
          <UserCircleIcon color="white" />
          <Text className="text-white ml-2">{member.userName}</Text>
        </View>
        <View className="flex flex-row items-center">
          <BoltIcon color="orange" />
          <Text className="text-white ml-2">{member.powerPlantName}</Text>
        </View>
      </View>
      <View>
        {member.isAdmin && (
          <Button
            classname="bg-gray-500"
            text={'Odstrani'}
            onPress={onRemoveMember}
          />
        )}
      </View>
    </View>
  );
};

export default MemberListItem;

import { ScrollView, Text, View } from 'react-native';
import Button from './Button';
import useCommunityDeleteMutation from '../hooks/useCommunityDeleteMutation';
import { Routes } from '../navigation/routes';
import { navigate } from '../navigation/navigate';
import React from 'react';
import { useCommunityStore } from '../store/community-store';
import useCommunity from '../hooks/useCommunity';
import MemberListItem from './MemberListItem';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import useCommunities from '../hooks/useCommunities';
import {
  useCommunityTabsStore,
  CommunityTab,
} from '../store/community-tabs-store';
import { useUserStore } from '../store/user-store';

const CommunitySettingsTab = () => {
  const { selectedCommunity, setSelectedCommunity } = useCommunityStore();
  const setActiveTab = useCommunityTabsStore((state) => state.setActiveTab);

  const { showToast } = useToastStore();
  const { data: communites, refetch: refetchCommunities } = useCommunities();

  const { data: communityData } = useCommunity(selectedCommunity?.id || '', {
    enabled: !!selectedCommunity,
  });
  const { mutate: deleteCommunity } = useCommunityDeleteMutation(
    selectedCommunity?.id || '',
    {
      onSuccess: () => {
        showToast('Skupnost uspešno izbrisana!', ToastTypes.SUCCESS);
        navigate(Routes.ORGANIZATION);
        if (communites?.length === 0) {
          navigate(Routes.ADD_COMMUNITY);
        } else if (communites) {
          setSelectedCommunity({
            id: communites[0]._id,
            name: communites[0].name,
          });
        }
        setActiveTab(CommunityTab.DASHBOARD);
      },
      onError: () => {
        showToast('Napaka pri brisanju skupnosti!', ToastTypes.ERROR);
      },
    }
  );
  return (
    <View className="dark:bg-dark-main flex-1 px-3">
      <ScrollView className="dark:bg-dark-main flex-1 px-3">
        <Text className="dark:text-white mb-3 mt-4 ml-0.5">Člani</Text>

        {!communityData ? (
          <Text>Loading</Text>
        ) : (
          communityData.members.map((member, index) => (
            <MemberListItem
              member={member}
              communityId={communityData._id}
              key={index}
            />
          ))
        )}
      </ScrollView>
      <Button
        text="Izbriši skupnost"
        onPress={deleteCommunity}
        classname="bg-danger m-auto my-4"
      />
    </View>
  );
};
export default CommunitySettingsTab;

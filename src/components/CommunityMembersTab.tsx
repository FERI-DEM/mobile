import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useCommunityStore } from '../store/community-store';
import useCommunity from '../hooks/useCommunity';
import MemberListItem from './MemberListItem';

const CommunitySettingsTab = () => {
  const { selectedCommunity, setSelectedCommunity } = useCommunityStore();

  const { data: communityData } = useCommunity(selectedCommunity?.id || '', {
    enabled: !!selectedCommunity,
  });

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
              adminId={communityData.adminId}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};
export default CommunitySettingsTab;

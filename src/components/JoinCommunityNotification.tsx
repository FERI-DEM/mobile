import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Button from './Button';

import Accordion from './Accordion';
import { JoinCommunityNotification as JoinCommunityNotificationType } from '../types/community.types';
import useCommunityJoinRequestProcessMutation from '../hooks/useCommunityJoinRequestProcessMutation';

interface NotificationCardProps {
  notification: JoinCommunityNotificationType;
}
const JoinCommunityNotification: FC<NotificationCardProps> = ({
  notification,
}) => {
  const { mutate: declineJoinRequest, isLoading: isDeclineJoinRequestLoading } =
    useCommunityJoinRequestProcessMutation();
  const { mutate: acceptJoinRequest, isLoading: isAcceptJoinRequestLoading } =
    useCommunityJoinRequestProcessMutation();

  const onPressDeclineButton = () => {
    declineJoinRequest({ accepted: false, notificationId: notification.id });
  };
  const onPressAcceptButton = () => {
    acceptJoinRequest({ accepted: true, notificationId: notification.id });
  };

  return (
    <Accordion
      title="Prošnja za pridružitev"
      contentHeight={140}
      content={
        <>
          <Text className="text-white text-sm">
            {notification.data.message}
          </Text>
          <View className="flex flex-row justify-end w-full mt-5">
            <Button
              text="Zavrni"
              classname="mr-3 w-22 h-11 bg-transparent border-2 border-white"
              classNameText="text-xs"
              onPress={onPressDeclineButton}
              loading={isDeclineJoinRequestLoading}
            />
            <Button
              text="Sprejmi"
              classname="w-22 h-11"
              classNameText="text-xs"
              onPress={onPressAcceptButton}
              loading={isAcceptJoinRequestLoading}
            />
          </View>
        </>
      }
    />
  );
};

export default JoinCommunityNotification;

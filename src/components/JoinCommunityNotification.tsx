import React, {FC} from 'react';
import {Text, View} from 'react-native';
import Button from './Button';

import Accordion from './Accordion';
import {JoinCommunityNotification as JoinCommunityNotificationType} from '../types/community.types';
import useCommunityJoinRequestProcessMutation from '../hooks/useCommunityJoinRequestProcessMutation';
import {useToastStore} from "../store/toast-store";
import {ToastTypes} from "../types/toast.types";

interface NotificationCardProps {
  notification: JoinCommunityNotificationType;
}
const JoinCommunityNotification: FC<NotificationCardProps> = ({
  notification,
}) => {
  const {showToast} = useToastStore();
  const { mutate: declineJoinRequest, isLoading: isDeclineJoinRequestLoading } =
    useCommunityJoinRequestProcessMutation({
      onSuccess: () => showToast('Prošnja uspešno zavrnjena.', ToastTypes.SUCCESS),
      onError: () => showToast('Napaka pri zavrnitvi prošnje.', ToastTypes.ERROR),
    });
  const { mutate: acceptJoinRequest, isLoading: isAcceptJoinRequestLoading } =
    useCommunityJoinRequestProcessMutation({
      onSuccess: () => showToast('Prošnja uspešno sprejeta.', ToastTypes.SUCCESS),
      onError: () => showToast('Napaka pri sprejemanju prošnje.', ToastTypes.ERROR),
    });

  const onPressDeclineButton = () => {
    declineJoinRequest({ accepted: false, notificationId: notification.id });
  };
  const onPressAcceptButton = () => {
    acceptJoinRequest({ accepted: true, notificationId: notification.id });
  };

  const height = Math.ceil(notification.data.message.length / 40) * 20 + 80

  return (
    <Accordion
      title="Prošnja za pridružitev"
      contentHeight={height}
      content={
        <>
          <Text className="text-white text-sm">
            {notification.data.message}
          </Text>
          <View className="flex flex-row justify-end w-full mt-5 h-11 h-full grow">
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

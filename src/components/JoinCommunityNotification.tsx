import React, {FC} from 'react';
import {Text, View} from "react-native";
import Button from "./Button";

import Accordion from "./Accordion";
import {JoinCommunityNotification as JoinCommunityNotificationType} from "../types/community.types";
import useCommunityJoinRequestProcessMutation from "../hooks/useCommunityJoinRequestProcessMutation";

interface NotificationCardProps {
    notification: JoinCommunityNotificationType
}
const JoinCommunityNotification: FC<NotificationCardProps> = ({notification}) => {

    const {mutate: processJoinRequest} = useCommunityJoinRequestProcessMutation()

    const onPressProcessJoinRequest = (accepted: boolean) => {
        processJoinRequest({accepted, notificationId: notification.id})
    }

    return (
        <Accordion title='Prošnja za pridružitev' contentHeight={140} content={
            <>
                <Text className='text-white text-sm'>{notification.data.message}</Text>
                <View className='flex flex-row justify-end w-full mt-5'>
                    <Button
                        text="Zavrni"
                        classname='mr-3 w-22 h-11 bg-transparent border-2 border-white'
                        classNameText='text-xs'
                        onPress={() => onPressProcessJoinRequest(false)}
                        loading={false}
                    />
                    <Button
                        text="Sprejmi"
                        classname='w-22 h-11'
                        classNameText='text-xs'
                        onPress={() => onPressProcessJoinRequest(true)}
                        loading={false}
                    />
                </View>
            </>
        }/>

    );
};

export default JoinCommunityNotification;
import React, {FC} from 'react';
import {ScrollView} from "react-native";
import {JoinCommunityNotification as JoinCommunityNotificationType} from "../types/community.types";
import useNotifications from "../hooks/useNotifications";
import DataView from "../components/DataView";
import JoinCommunityNotification from "../components/JoinCommunityNotification";

const NotificationScreen: FC = () => {
    const {data: notifications, isLoading} = useNotifications()
    return (
        <DataView<JoinCommunityNotificationType[]> isLoading={isLoading} data={notifications} fallbackText={'Trenutno nimate nobenih obvestil'}>
            {(notifications) => (
                <ScrollView className='flex-1 bg-dark-main'>
                    {notifications.map((notification, index) =>
                        <JoinCommunityNotification key={index} notification={notification}/>
                    )}
                </ScrollView>
            )}
        </DataView>
    );
};

export default NotificationScreen;
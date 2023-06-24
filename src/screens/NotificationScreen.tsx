import React, {FC} from 'react';
import {ScrollView, View} from "react-native";
import {JoinCommunityNotification as JoinCommunityNotificationType} from "../types/community.types";
import useNotifications from "../hooks/useNotifications";
import DataView from "../components/DataView";
import JoinCommunityNotification from "../components/JoinCommunityNotification";

const NotificationScreen: FC = () => {
    const {data: notifications, isLoading} = useNotifications()
    return (
        <View className='flex-1 bg-light-main dark:bg-dark-main' key={notifications?.length}>
            <DataView<JoinCommunityNotificationType[]> isLoading={isLoading} data={notifications} fallbackText={'Trenutno nimate nobenih obvestil'}>
                {(notifications) => (
                    <ScrollView className='flex-1 bg-light-main dark:bg-dark-main'>
                        <View className='pb-10'>
                            {notifications.map((notification, index) =>
                                <JoinCommunityNotification key={index} notification={notification}/>
                            )}
                        </View>
                    </ScrollView>
                )}
            </DataView>
        </View>
    );
};

export default NotificationScreen;
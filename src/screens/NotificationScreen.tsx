import React, {FC} from 'react';
import {ScrollView, View} from "react-native";
import JoinCommunityNotification from "../components/JoinCommunityNotification";
import useNotifications from "../hooks/useNotifications";

const NotificationScreen: FC = () => {
    const notifications = useNotifications()
    return (
        <View className="dark:bg-dark-main flex-1 px-5">
            <ScrollView>
                {notifications.map((notification, index) =>
                    <JoinCommunityNotification key={index} notification={notification}/>
                )}
            </ScrollView>
        </View>
    );
};

export default NotificationScreen;
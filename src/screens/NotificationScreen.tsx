import React, {FC} from 'react';
import {ScrollView, View} from "react-native";
import NotificationCard from "../components/NotificationCard";
import {Header} from "../store/header-store";

let dummyNotifications = [
    {
        message: "Povabilo v organizacijo",
        buttonText: "Sprejmi",
        action: () => console.log("pressed")
    },
    {
        message: "Povabilo v organizacijo",
        buttonText: "Sprejmi",
        action: () => console.log("pressed")
    },
]

const NotificationScreen: FC = () => {
    return (
        <View className="dark:bg-dark-main flex-1 px-5">
            <Header title="Obvestila"/>
            <ScrollView>
                {dummyNotifications.map((notification, index) => {
                    return (
                        <NotificationCard key={index} message={notification.message} buttonText={notification.buttonText} action={notification.action}/>
                    )
                })}
            </ScrollView>
        </View>
    );
};

export default NotificationScreen;
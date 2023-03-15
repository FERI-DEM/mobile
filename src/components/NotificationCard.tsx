import React, {FC} from 'react';
import {Text, View} from "react-native";
import {InformationCircleIcon} from "react-native-heroicons/outline";
import Button from "./Button";

interface NotificationCardProps {
    message: string;
    buttonText: string;
    action: () => void;
}
const NotificationCard: FC<NotificationCardProps> = ({message, buttonText, action}) => {
    return (
        <View className='shadow-md shadow-black rounded-md dark:bg-dark-element dark:text-white py-4 px-4 flex flex-row mt-4 items-center'>
            <View className='w-12'>
                <InformationCircleIcon color='grey' size={30}/>
            </View>
            <Text className='text-white font-bold w-44 grow pr-2'>{message}</Text>
            <Button text={buttonText} onPress={action} classname='px-4'/>
        </View>
    );
};

export default NotificationCard;
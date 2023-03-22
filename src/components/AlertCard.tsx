import React, {FC} from 'react';
import {Text, View} from "react-native";
import {ExclamationTriangleIcon} from 'react-native-heroicons/outline';

interface AlertCardProps {
    title: string;
    message: string;
}
const AlertCard: FC<AlertCardProps> = ({title, message}) => {
    return (
        <View className='shadow-lg shadow-black rounded-xl dark:bg-dark-element dark:text-white py-10 px-4 flex flex-row mt-4 items-center justify-around mx-4'>
            <View>
                <Text className='text-white text-xl font-bold w-44 grow pb-2'>{title}</Text>
                <Text className='text-white opacity-40'>{message}</Text>
            </View>
            <ExclamationTriangleIcon color='red' size={50}/>
        </View>
    );
};

export default AlertCard;
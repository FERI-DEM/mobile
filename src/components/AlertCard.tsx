import React, {FC} from 'react';
import {Text, View} from "react-native";
import {ExclamationTriangleIcon} from 'react-native-heroicons/outline';

interface AlertCardProps {
    title: string;
    message: string;
}
const AlertCard: FC<AlertCardProps> = ({title, message}) => {
    return (
        <View className='shadow-lg shadow-black rounded-xl dark:bg-dark-element dark:text-white py-6 px-12 flex flex-row mt-4 items-center justify-around mx-4'>
            <View>
                <Text className='text-white text-lg font-bold w-2/3 grow pb-2'>{title}</Text>
                <Text className='text-white opacity-40 mt-2 w-2/3'>{message}</Text>
            </View>
            <ExclamationTriangleIcon color='orange' size={50}/>
        </View>
    );
};

export default AlertCard;
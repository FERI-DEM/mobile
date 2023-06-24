import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline';

interface AlertCardProps {
  title: string;
  message: string;
}
const AlertCard: FC<AlertCardProps> = ({title, message}) => {
    return (
        <View className='shadow-lg shadow-black rounded-xl dark:bg-dark-element dark:text-white py-6 flex flex-row mt-0 items-center justify-around mb-7'>
            <View className='shrink px-6'>
                <Text className='dark:text-white text-lg font-bold pb-2'>{title}</Text>
                <Text className='dark:text-white opacity-40 mt-2'>{message}</Text>
            </View>
            <View className='w-[55px] items-end justify-center pr-6'>
                <ExclamationTriangleIcon color='orange' size={50}/>
            </View>
        </View>
    );
};

export default AlertCard;
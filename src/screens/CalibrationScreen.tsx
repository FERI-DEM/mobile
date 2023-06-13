import { View } from 'react-native';
import React from 'react';
import CalibrationForm from '../components/CalibrationForm';


const CalibrationScreen = () => {
  return (
    <View className="flex-1 dark:bg-dark-main">
      <CalibrationForm/>
    </View>
  );
};
export default CalibrationScreen;

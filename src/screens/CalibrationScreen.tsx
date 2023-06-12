import {View} from 'react-native';
import React from 'react';
import CalibrationForm from '../components/CalibrationForm';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Routes, RoutesParams} from "../navigation/routes";

type CalibrationScreenProps = NativeStackScreenProps<RoutesParams, Routes.CALIBRATION>;

const CalibrationScreen = ({ route }: CalibrationScreenProps) => {
  return (
    <View className="flex-1 dark:bg-dark-main">
      <CalibrationForm powerPlantId={route.params.id}/>
    </View>
  );
};
export default CalibrationScreen;

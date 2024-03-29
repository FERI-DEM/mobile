import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ControlledInput } from './ControlledInput';
import Button from '../components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import useCalibrationMutation from '../hooks/useCalibrationMutation';
import { CalibrationDataType } from '../types/powerPlant.types';
import { CalibrationDataSchema } from '../schemas/calibration.schema';
import { usePowerPlantStore } from '../store/power-plant-store';
import { useToastStore } from '../store/toast-store';
import {
  PowerPlantsTab,
  useDashboardTabsStore,
} from '../store/dashboard-tabs-store';
import { navigate } from '../navigation/navigate';
import { Routes } from '../navigation/routes';
import { ToastTypes } from '../types/toast.types';
import { QueryKey } from '../types/keys.types';
import { useQueryClient } from '@tanstack/react-query';

const DefaultCalibrationData: CalibrationDataType = {
  production: 0,
};

const CalibrationForm: FC = () => {
  const { selectedPowerPlant, setSelectedPowerPlant } = usePowerPlantStore();
  const setActiveTab = useDashboardTabsStore((state) => state.setActiveTab);
  const { mutate: calibrate, isLoading: calibrateLoading } =
    useCalibrationMutation({
      onSuccess: () => {
        form.reset();
        setActiveTab(PowerPlantsTab.DASHBOARD);
        navigate(Routes.DASHBOARD);
        queryClient.invalidateQueries([
          QueryKey.POWER_PLANT_POWER_PREDICTION,
          QueryKey.POWER_PLANT_POWER_PREDICTION_BY_DAYS,
        ]);
        showToast('Uspešno kalibrirano!', ToastTypes.SUCCESS);
      },
      onError: () => {
        showToast('Napaka pri kalibriranju!', ToastTypes.ERROR);
      },
    });

  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(CalibrationDataSchema),
    defaultValues: DefaultCalibrationData,
  });
  const onSubmit: SubmitHandler<CalibrationDataType> = (data) => {
    if (selectedPowerPlant) {
      calibrate(
        { id: selectedPowerPlant.id, power: data.production });
    }
  };

  return (
    <View className="dark:bg-dark-main flex-1 px-3">
      <ScrollView className="mt-5 w-full" keyboardShouldPersistTaps="always">
        <View className="px-2">
          <FormProvider {...form}>
            <ControlledInput
              name="production"
              label="Trenutna proizvodnja elektrarne *"
              placeholder="Proizvodnja [kW]"
              keyboardType="numeric"
            />
            <Text className="text-gray-500 my-2">
              {
                'Za uspešno napoved proizvodnje električne energije je potrebno vnesti trenutno proizvodnjo elektrarne, ki jo najdete na števcu vaše sončne elektrarne.'
              }
            </Text>
            <Button
              text="Potrdi"
              classname="mt-2 w-24 h-11"
              onPress={form.handleSubmit(onSubmit)}
              loading={calibrateLoading}
            />
          </FormProvider>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalibrationForm;

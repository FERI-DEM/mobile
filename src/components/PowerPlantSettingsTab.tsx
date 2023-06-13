import { ScrollView, View } from 'react-native';
import Button from './Button';
import React from 'react';
import { usePowerPlantStore } from '../store/power-plant-store';
import {
  PowerPlant,
  UpdatePowerPlantDataType,
} from '../types/powerPlant.types';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { UpdatePowerPlantDataSchema } from '../schemas/powerPlant.schema';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { ControlledInput } from './ControlledInput';
import usePowerPlant from '../hooks/usePowerPlant';
import usePowerPlantDeleteMutation from '../hooks/usePowerPlantDeleteMutation';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '../types/keys.types';
import useForm from '../hooks/useForm';
import {
  PowerPlantsTab,
  useDashboardTabsStore,
} from '../store/dashboard-tabs-store';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import usePowerPlantUpdateMutation from '../hooks/usePowerPlantUpdateMutation';
import { navigate } from '../navigation/navigate';
import { Routes } from '../navigation/routes';
import PowerPlantsService from '../api/power-plants.service';

const PowerPlantSettingsTab = () => {
  const queryClient = useQueryClient();
  const setActiveTab = useDashboardTabsStore((state) => state.setActiveTab);
  const { setSelectedPowerPlant, selectedPowerPlant } = usePowerPlantStore();

  const { data: powerPlantData } = usePowerPlant(selectedPowerPlant?.id || '', {
    enabled: !!selectedPowerPlant,
  });

  const form = useForm<UpdatePowerPlantDataType>({
    resolver: zodResolver(UpdatePowerPlantDataSchema),
    defaultValues: { name: powerPlantData?.powerPlants[0].displayName || '' },
  });

  const { showToast } = useToastStore();

  const { mutate: deletePowerPlant, isLoading: deletePowerPlantLoading } =
    usePowerPlantDeleteMutation(selectedPowerPlant?.id || '', {
      onSuccess: async () => {
        showToast('Elektrarna uspešno izbrisana!', ToastTypes.SUCCESS);
        let powerPlants: PowerPlant[] = []
          try{
            powerPlants = await PowerPlantsService.getPowerPlants()
          }
          catch (e) {}
          queryClient.removeQueries([QueryKey.POWER_PLANTS]);
        queryClient.invalidateQueries([QueryKey.POWER_PLANTS])
        if (powerPlants?.length === 0) {
            navigate(Routes.ADD_POWER_PLANT);
        }
        else {
            setSelectedPowerPlant({
                id: powerPlants![0]._id,
                name: powerPlants![0].displayName,
            });
            setActiveTab(PowerPlantsTab.DASHBOARD);
        }
      },
      onError: () => {
        showToast('Napaka pri brisanju elektrarne!', ToastTypes.ERROR);
      },
    });

  const { mutate: updatePowerPlant, isLoading: updatePowerPlantLoading } =
    usePowerPlantUpdateMutation(selectedPowerPlant?.id || '', {
      onSuccess: () => {
        showToast('Elektrarna uspešno posodobljena!', ToastTypes.SUCCESS);
        queryClient.invalidateQueries(
          { queryKey: [QueryKey.POWER_PLANTS] },
          {}
        );
        setSelectedPowerPlant({
          id: selectedPowerPlant?.id || '',
          name: form.getValues()?.name || '',
        });
      },
      onError: () => {
        showToast('Napaka pri posodabljanju elektrarne!', ToastTypes.ERROR);
      },
    });

  const onSubmit: SubmitHandler<UpdatePowerPlantDataType> = (data) => {
    updatePowerPlant({
      displayName: data.name,
      latitude: powerPlantData!.powerPlants[0].latitude,
      longitude: powerPlantData!.powerPlants[0].longitude,
    });
  };

  return (
    <View className="dark:bg-dark-main flex-1 px-3">
      <ScrollView className="mt-5 w-full" keyboardShouldPersistTaps="always">
        <View className="px-2">
          <FormProvider {...form}>
            <ControlledInput
              name="name"
              label="Ime elektrarne *"
              placeholder="Ime"
              defaultValue={powerPlantData?.powerPlants[0].displayName}
            />
            <Button
              text="Posodobi"
              classname="mt-4"
              loading={updatePowerPlantLoading}
              onPress={form.handleSubmit(onSubmit)}
            />
          </FormProvider>
        </View>
      </ScrollView>
      <Button
        text="Izbriši elektrarno"
        onPress={deletePowerPlant}
        loading={deletePowerPlantLoading}
        classname="bg-danger m-auto w-44 h-11 mb-4"
      />
    </View>
  );
};
export default PowerPlantSettingsTab;

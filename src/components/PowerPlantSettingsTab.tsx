import { ScrollView, View } from 'react-native';
import Button from './Button';
import React from 'react';
import { usePowerPlantStore } from '../store/power-plant-store';
import { UpdatePowerPlantDataType } from '../types/powerPlant.types';
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
import usePowerPlants from '../hooks/usePowerPlants';
import { navigate } from '../navigation/navigate';
import { Routes } from '../navigation/routes';

const PowerPlantSettingsTab = () => {
  const queryClient = useQueryClient();
  const setActiveTab = useDashboardTabsStore((state) => state.setActiveTab);
  const { setSelectedPowerPlant, selectedPowerPlant } = usePowerPlantStore();

  const { data: powerPlantData } = usePowerPlant(selectedPowerPlant?.id || '', {
    enabled: !!selectedPowerPlant,
  });

  const { data: powerPlants, refetch: refetchPowerPlants } = usePowerPlants();

  const form = useForm<UpdatePowerPlantDataType>({
    resolver: zodResolver(UpdatePowerPlantDataSchema),
    defaultValues: { name: powerPlantData?.powerPlants[0].displayName || '' },
  });

  const { showToast } = useToastStore();

  const { mutate: deletePowerPlant, isLoading: deletePowerPlantLoading } =
    usePowerPlantDeleteMutation(selectedPowerPlant?.id || '', {
      onSuccess: async () => {
        showToast('Elektrarna uspešno izbrisana!', ToastTypes.SUCCESS);
        const powerPlants = await refetchPowerPlants();
        if (powerPlants?.data?.length === 0) {
          navigate(Routes.ADD_POWER_PLANT);
        } else if (powerPlants?.data) {
          setSelectedPowerPlant({
            id: powerPlants?.data[0]._id,
            name: powerPlants?.data[0].displayName,
          });
        }
        setActiveTab(PowerPlantsTab.DASHBOARD);
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
        classname="bg-danger m-auto my-4"
      />
    </View>
  );
};
export default PowerPlantSettingsTab;

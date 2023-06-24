import { ActivityIndicator, ScrollView, View } from 'react-native';
import Button from '../components/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ControlledInput } from './ControlledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { navigate } from '../navigation/navigate';
import { Routes } from '../navigation/routes';
import Map from '../components/Map';
import { AddPowerPlantType } from '../types/user.types';
import { AddPowerPlantSchema } from '../schemas/user.schema';
import LocationAutoCompleteInput from '../components/LocationAutoCompleteInput';
import { MapboxResponse } from '../types/mapbox.types';
import useUserGeocodedLocation from '../hooks/useUserGeocodedLocation';
import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '../types/keys.types';
import { mapboxToUserLocation } from '../utils/mapbox-to-user-location';
import useRegisterDetailsMutation from '../hooks/useRegisterDetailsMutation';
import { usePowerPlantStore } from '../store/power-plant-store';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import { useIsFocused } from '@react-navigation/native';
import {useColorScheme} from "nativewind";
import {colors} from '../constants/colors'

const AddPowerPlantData: AddPowerPlantType = {
  powerPlantName: 'Moja elektrarna',
  location: '',
};

const AddPowerPlantForm = () => {
  const {colorScheme} = useColorScheme()

  const setSelectedPowerPlant = usePowerPlantStore(
    (state) => state.setSelectedPowerPlant
  );
  const form = useForm({
    resolver: zodResolver(AddPowerPlantSchema),
    defaultValues: AddPowerPlantData,
  });

  const { showToast } = useToastStore();

  const queryClient = useQueryClient();
  const { mutate: createPowerPlant, isLoading: createPowerPlantLoading } =
    useRegisterDetailsMutation({
      onSuccess: (data) => {
        setSelectedPowerPlant({ id: data._id, name: data.displayName });
        navigate(Routes.CALIBRATION);
        queryClient.invalidateQueries({ queryKey: [QueryKey.POWER_PLANTS] });
        showToast('Elektrarna uspešno ustvarjena!', ToastTypes.SUCCESS);
      },
      onError: () => {
        showToast('Napaka pri ustvarjanju elektrarne!', ToastTypes.ERROR);
      },
    });
  const isFocused = useIsFocused();
  const { data: userLocation, isLoading: isUserLocationLoading } =
    useUserGeocodedLocation(isFocused + '', {
      onSuccess: (data) => {
        form.setValue('location', data?.address || '');
      },
      onError: () => {
        showToast(
          'Zavrnili ste dostop do lokacije zato vam polja za lokacijo nismo mogli izpolniti.',
          ToastTypes.INFORMATION
        );
      },
    });

  const onSubmit: SubmitHandler<AddPowerPlantType> = () => {
    createPowerPlant({
      displayName: form.getValues().powerPlantName,
      latitude: userLocation?.coordinates?.latitude || 0,
      longitude: userLocation?.coordinates?.longitude || 0,
    });
  };

  const onClickOnAutoCompleteArea = useCallback(
    (data: MapboxResponse | undefined) => {
      const userLocation = mapboxToUserLocation(data);
      form.setValue('location', userLocation.address);
      queryClient.setQueryData([QueryKey.USER_GEOCODED_LOCATION], userLocation);
    },
    [form, queryClient]
  );

  return (
    <ScrollView
      className="pt-5 w-full bg-light-main dark:bg-dark-main"
      keyboardShouldPersistTaps="always"
    >
      <View className="px-4 mb-6">
        <FormProvider {...form}>
          <ControlledInput
            name="powerPlantName"
            label="Ime elektrarne *"
            placeholder="Moja elektrarna"
          />

          <LocationAutoCompleteInput
            isLoading={isUserLocationLoading}
            onClickOnAutoCompleteArea={onClickOnAutoCompleteArea}
          />
          <View className="h-56 pt-4">
            {isUserLocationLoading ? (
              <View className="w-full h-full justify-center items-center flex bg-light-element dark:bg-dark-element rounded-lg">
                <ActivityIndicator size={25} color={colors[colorScheme].text} />
              </View>
            ) : (
              <Map coordinates={userLocation?.coordinates} />
            )}
          </View>
          <Button
            text="Shrani"
            classname="mt-7 w-24 h-11"
            onPress={form.handleSubmit(onSubmit)}
            loading={createPowerPlantLoading}
          />
        </FormProvider>
      </View>
    </ScrollView>
  );
};
export default AddPowerPlantForm;

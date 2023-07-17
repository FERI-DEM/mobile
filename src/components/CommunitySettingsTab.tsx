import { ScrollView, View } from 'react-native';
import Button from './Button';
import useCommunityDeleteMutation from '../hooks/useCommunityDeleteMutation';
import { Routes } from '../navigation/routes';
import { navigate } from '../navigation/navigate';
import React from 'react';
import { useCommunityStore } from '../store/community-store';
import useCommunity from '../hooks/useCommunity';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import {
  useCommunityTabsStore,
  CommunityTab,
} from '../store/community-tabs-store';
import { Community } from '../types/community.types';
import { QueryKey } from '../types/keys.types';
import CommunityService from '../api/community.service';
import { useQueryClient } from '@tanstack/react-query';
import useUser from '../hooks/useUser';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { ControlledInput } from './ControlledInput';
import { UpdatePowerPlantDataType } from '../types/powerPlant.types';
import useForm from '../hooks/useForm';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import useCommunityUpdateMutation from '../hooks/useCommunityUpdateMutation';
import { UpdateCommunitySchema } from '../schemas/updateCommunity.schema';

const CommunitySettingsTab = () => {
  const queryClient = useQueryClient();
  const { selectedCommunity, setSelectedCommunity } = useCommunityStore();
  const setActiveTab = useCommunityTabsStore((state) => state.setActiveTab);

  const { showToast } = useToastStore();
  const { data: user } = useUser();
  const { data: communityData } = useCommunity(selectedCommunity?.id || '', {
    enabled: !!selectedCommunity,
  });
  const { mutate: deleteCommunity, isLoading: isLoadingDeleteCommunity } = useCommunityDeleteMutation(
    selectedCommunity?.id || '',
    {
      onSuccess: async () => {
        showToast('Skupnost uspešno izbrisana!', ToastTypes.SUCCESS);
        let communities: Community[] = [];
        try {
          communities = await CommunityService.getCommunities();
        } catch (e) {}
        queryClient.removeQueries([QueryKey.COMMUNITIES]);
        queryClient.invalidateQueries([QueryKey.COMMUNITIES]);
        if (communities?.length === 0) {
          navigate(Routes.ADD_COMMUNITY);
        } else {
          setSelectedCommunity({
            id: communities![0]._id,
            name: communities![0].name,
          });
          setActiveTab(CommunityTab.DASHBOARD);
        }
      },
      onError: () => {
        showToast('Napaka pri brisanju skupnosti!', ToastTypes.ERROR);
      },
    }
  );

  const form = useForm<UpdatePowerPlantDataType>({
    resolver: zodResolver(UpdateCommunitySchema),
    defaultValues: { name: communityData?.name || '' },
  });

  const { mutate: updateCommunity, isLoading: updateCommunityLoading } =
    useCommunityUpdateMutation(selectedCommunity?.id || '', {
      onSuccess: () => {
        showToast('Skupnost uspešno posodobljena!', ToastTypes.SUCCESS);
        queryClient.invalidateQueries({ queryKey: [QueryKey.COMMUNITIES] }, {});
        setSelectedCommunity({
          id: selectedCommunity?.id || '',
          name: form.getValues()?.name || '',
        });
      },
      onError: () => {
        showToast('Napaka pri posodabljanju skupnosti!', ToastTypes.ERROR);
      },
    });

  const onSubmit: SubmitHandler<UpdatePowerPlantDataType> = (data) => {
    updateCommunity({
      name: data.name,
    });
  };

  return (
    <View className="dark:bg-dark-main flex-1 px-4">
      <ScrollView className="dark:bg-dark-main flex-1">
          <FormProvider {...form}>
            <ControlledInput
              name="name"
              label="Ime elektrarne *"
              placeholder="Ime"
              defaultValue={communityData?.name}
            />
            <Button
              text="Posodobi"
              classname="mt-4"
              loading={updateCommunityLoading}
              onPress={form.handleSubmit(onSubmit)}
            />
          </FormProvider>
      </ScrollView>
      {user?.id === communityData?.adminId && (
        <Button
            loading={isLoadingDeleteCommunity}
          text="Izbriši skupnost"
          onPress={deleteCommunity}
          classname="bg-danger m-auto my-4"
        />
      )}
    </View>
  );
};
export default CommunitySettingsTab;

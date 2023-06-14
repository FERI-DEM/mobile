import React, { FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import Button from '../components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCommunityDataType } from '../types/community.types';
import { CreateCommunityDataSchema } from '../schemas/community.schema';
import useCommunityMutation from '../hooks/useCommunityMutation';
import { navigate } from '../navigation/navigate';
import { Routes } from '../navigation/routes';
import Checkbox from 'expo-checkbox';
import usePowerPlants from '../hooks/usePowerPlants';
import { ControlledInput } from '../components/ControlledInput';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '../types/keys.types';
import { useCommunityStore } from '../store/community-store';
import { useToastStore } from '../store/toast-store';
import { ToastTypes } from '../types/toast.types';
import { UserState } from '../types/user.types';
import { useUserStore } from '../store/user-store';
import {
  CommunityTab,
  useCommunityTabsStore,
} from '../store/community-tabs-store';

const DefaultCommunityData: CreateCommunityDataType = {
  communityName: '',
  powerPlants: [],
};
const CreateCommunityScreen: FC = () => {
  const queryClient = useQueryClient();
  const { data: powerPlants } = usePowerPlants();
  const { setSelectedCommunity } = useCommunityStore();
  const setUserState = useUserStore((state) => state.setUserState);
  const setActiveTab = useCommunityTabsStore((state) => state.setActiveTab);

  const form = useForm<CreateCommunityDataType>({
    resolver: zodResolver(CreateCommunityDataSchema),
    defaultValues: DefaultCommunityData,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'powerPlants',
  });

  const { showToast } = useToastStore();

  const { mutate, isLoading: createCommunityLoading } = useCommunityMutation({
    onSuccess: (data) => {
      setSelectedCommunity({ id: data._id, name: data.name });
      setActiveTab(CommunityTab.DASHBOARD);
      setUserState(UserState.USER);
      navigate(Routes.ORGANIZATION);
      queryClient.invalidateQueries([QueryKey.COMMUNITIES]);
      showToast('Skupnost uspešno ustvarjena!', ToastTypes.SUCCESS);
    },
    onError: () => {
      showToast('Napaka pri ustvarjanju skupnosti!', ToastTypes.ERROR);
    },
  });
  const onSubmit: SubmitHandler<CreateCommunityDataType> = (data) => {
    mutate({ name: data.communityName, powerPlants: data.powerPlants });
  };

  return (
    <View className="dark:bg-dark-main flex-1 px-2">
      <View className="mt-5 w-full">
        <View className="px-2">
          <FormProvider {...form}>
            <ControlledInput
              name="communityName"
              label="Ime organizacije"
              placeholder="Ime"
            />
            <Text className="dark:text-white mb-3 ml-0.5 mt-6">
              Izberite elektrarno
            </Text>
            <FlatList
              className="max-h-52"
              nestedScrollEnabled
              keyExtractor={(item) => item._id}
              data={powerPlants}
              renderItem={({ item }) => (
                <View className="flex flex-row items-center pl-3 pr-4 py-4 my-1 bg-dark-element rounded-md justify-between">
                  <Text className="text-white">{item.displayName}</Text>
                  <Checkbox
                    color="#236BFE"
                    value={fields.some(
                      (field) => field.powerPlantId === item._id
                    )}
                    onValueChange={(value) =>
                      value
                        ? append({ powerPlantId: item._id })
                        : remove(
                            fields.findIndex(
                              (field) => field.powerPlantId === item._id
                            )
                          )
                    }
                  />
                </View>
              )}
            />
            <Button
              text="Ustvari"
              classname="mt-7 w-24 h-11"
              onPress={form.handleSubmit(onSubmit)}
              loading={createCommunityLoading}
            />
          </FormProvider>
        </View>
      </View>
    </View>
  );
};

export default CreateCommunityScreen;

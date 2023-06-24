import {FlatList, Text, View} from "react-native";
import {JoinCommunityDataType} from "../types/community.types";
import usePowerPlants from "../hooks/usePowerPlants";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {JoinCommunityDataSchema} from "../schemas/community.schema";
import {ControlledInput} from "../components/ControlledInput";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import React from "react";
import useCommunityJoinMutation from "../hooks/useCommunityJoinMutation";
import {colors} from "../constants/colors";
import {useToastStore} from "../store/toast-store";
import {ToastTypes} from "../types/toast.types";

const DefaultCommunityData: JoinCommunityDataType = {
    community: '',
    powerPlants: []
}
const JoinCommunityScreen = () => {
    const {data: powerPlants} = usePowerPlants();
    const {showToast} = useToastStore();
    const form = useForm<JoinCommunityDataType>({
        resolver: zodResolver(JoinCommunityDataSchema),
        defaultValues: DefaultCommunityData
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'powerPlants',
    });


    const {mutate, isLoading: joinCommunityMutationLoading} = useCommunityJoinMutation({
        onSuccess: () => showToast('Zahteva je bila uspešno posalana', ToastTypes.SUCCESS),
        onError: () => showToast('Napaka pri pošiljanju zahteve', ToastTypes.ERROR)
    });
    const onSubmit: SubmitHandler<JoinCommunityDataType> = (data) => {
        mutate({community: data.community, powerPlants: data.powerPlants.map((powerPlant) => powerPlant.powerPlantId)})
    };

    return (
        <View className='bg-light-main dark:bg-dark-main flex-1 px-2'>
            <View className='mt-5 w-full'>
                <View className='px-2'>
                    <FormProvider {...form}>
                        <ControlledInput
                            name="community"
                            label="Ime skupnosti"
                            placeholder="Ime"
                        />
                        <Text className='dark:text-white mb-3 ml-0.5 mt-6'>Izberite elektrarno</Text>
                        <FlatList className='max-h-52' nestedScrollEnabled keyExtractor={item => item._id} data={powerPlants} renderItem={({item}) => (
                            <View className='flex flex-row items-center pl-3 pr-4 py-4 my-1 bg-dark-element rounded-md justify-between'>
                                <Text className='dark:text-white'>{item.displayName}</Text>
                                <Checkbox
                                    color={colors.common.tint}
                                    value={fields.some((field) => field.powerPlantId === item._id)}
                                    onValueChange={(value) => value ? append({ powerPlantId: item._id}) : remove(fields.findIndex((field) => field.powerPlantId === item._id))}
                                />
                            </View>
                        )}/>
                        <Button
                            text="Pridruži se"
                            classname='mt-7 w-24 h-11'
                            onPress={form.handleSubmit(onSubmit)}
                            loading={joinCommunityMutationLoading}
                        />
                    </FormProvider>
                </View>
            </View>
        </View>
    );
}
export default JoinCommunityScreen;
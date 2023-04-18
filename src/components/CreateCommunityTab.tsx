import React, {FC} from 'react';
import {View, Text, FlatList} from "react-native";
import {FormProvider, SubmitErrorHandler, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import Button from "../components/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateCommunityDataType} from "../types/community.types";
import {CreateCommunityDataSchema} from "../schemas/community.schema";
import useCommunityMutation from "../hooks/useCommunityMutation";
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";
import Checkbox from 'expo-checkbox';
import usePowerPlants from "../hooks/usePowerPlants";

const DefaultCommunityData: CreateCommunityDataType = {
    communityName: '',
    powerPlants: []
}
const CreateCommunityTab: FC = () => {
    const {data: powerPlants} = usePowerPlants();
    const form = useForm<CreateCommunityDataType>({
        resolver: zodResolver(CreateCommunityDataSchema),
        defaultValues: DefaultCommunityData
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'powerPlants',
    });


    const {mutate} = useCommunityMutation({
        onSuccess: () => navigate(Routes.ORGANIZATION)
    });
    const onSubmit: SubmitHandler<CreateCommunityDataType> = (data) => {
        console.log({data});
        mutate({name: data.communityName, powerPlants: data.powerPlants})
    };

    const onError: SubmitErrorHandler<CreateCommunityDataType> = (errors) => {
        return console.log({errors})
    }


    return (
        <View className='dark:bg-dark-main flex-1 px-2'>
            <View className='mt-5 w-full'>
                <View className='px-2'>
                    <FormProvider {...form}>
                        <ControlledInput
                            name="communityName"
                            label="Ime organizacije"
                            placeholder="Ime"
                        />
                        <Text className='dark:text-white mb-3 ml-0.5 mt-6'>Izberite elektrarno</Text>
                        <FlatList className='max-h-52' nestedScrollEnabled keyExtractor={(item, index) => index} data={powerPlants} renderItem={({item}) => (
                            <View className='flex flex-row items-center pl-3 pr-4 py-4 my-1 bg-dark-element rounded-md justify-between'>
                                <Text className='text-white'>{item.displayName}</Text>
                                <Checkbox
                                    color='#236BFE'
                                    value={fields.some((field) => field.powerPlantId === item._id)}
                                    onValueChange={(value) => value ? append({ powerPlantId: item._id}) : remove(fields.findIndex((field) => field.powerPlantId === item._id))}
                                />
                            </View>
                        )}/>
                        <Button
                            text="Ustvari"
                            classname='mt-7'
                            onPress={form.handleSubmit(onSubmit, onError)}
                        />
                    </FormProvider>
                </View>
            </View>
        </View>
    );
};

export default CreateCommunityTab;
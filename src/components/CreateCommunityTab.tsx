import React, {FC} from 'react';
import {View, ScrollView} from "react-native";
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import Button from "../components/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateCommunityDataType} from "../types/community.types";
import {CreateCommunityDataSchema} from "../schemas/community.schema";
import useCommunityMutation from "../hooks/useCommunityMutation";
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";

const DefaultCommunityData: CreateCommunityDataType = {
    name: '',
}
const CreateCommunityTab: FC = () => {
    const form = useForm({
        resolver: zodResolver(CreateCommunityDataSchema),
        defaultValues: DefaultCommunityData
    });

    const {mutate} = useCommunityMutation({
        onSuccess: () => navigate(Routes.ORGANIZATION)
    });
    const onSubmit: SubmitHandler<CreateCommunityDataType> = (data) => {
        console.log({data});
        mutate(data);
    };

    const onError: SubmitErrorHandler<CreateCommunityDataType> = (errors) => {
        return console.log({errors})
    }

    return (
        <View className='dark:bg-dark-main flex-1 px-3'>
            <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
                <View className='px-2'>
                    <FormProvider {...form}>
                        <ControlledInput
                            name="name"
                            label="Ime organizacije"
                            placeholder="Ime"
                        />
                        <Button
                            text="Ustvari"
                            classname='mt-7'
                            onPress={form.handleSubmit(onSubmit, onError)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateCommunityTab;
import React, {FC} from 'react';
import {View, ScrollView} from "react-native";
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "../components/ControlledInput";
import Button from "../components/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";
import {CreateCommunityDataType} from "../types/community.types";
import {CreateCommunityDataSchema} from "../schemas/community.schema";


const DefaultCommunityData: CreateCommunityDataType = {
    name: '',
}
const CreateCommunityScreen: FC = () => {
    const methods = useForm({
        resolver: zodResolver(CreateCommunityDataSchema),
        defaultValues: DefaultCommunityData
    });

    const onSubmit: SubmitHandler<CreateCommunityDataType> = (data) => {
        console.log({data});
        navigate(Routes.LANDING);
    };

    const onError: SubmitErrorHandler<CreateCommunityDataType> = (errors) => {
        return console.log({errors})
    }

    return (
        <View className='dark:bg-dark-main flex-1 px-3'>
            <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
                <View className='px-2'>
                    <FormProvider {...methods}>
                        <ControlledInput
                            name="name"
                            label="Ime organizacije"
                            placeholder="Ime"
                        />
                        <Button
                            text="Ustvari"
                            classname='mt-7'
                            onPress={methods.handleSubmit(onSubmit, onError)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateCommunityScreen;
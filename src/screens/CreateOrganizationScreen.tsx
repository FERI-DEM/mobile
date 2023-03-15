import React, {FC} from 'react';
import {View, ScrollView} from "react-native";
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {ControlledInput} from "../components/ControlledInput";
import Button from "../components/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";
import * as z from "zod";
import {Header} from "../store/header-store";

const CreateOrganizationDataSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).max(20, { message: "Name must be at most 30 characters long" }),
});

type CreateOrganizationDataType = z.infer<typeof CreateOrganizationDataSchema>

const DefaultOrganizationData: CreateOrganizationDataType = {
    name: '',
}
const CreateOrganizationScreen: FC = () => {
    const methods = useForm({
        resolver: zodResolver(CreateOrganizationDataSchema),
        defaultValues: DefaultOrganizationData
    });

    const onSubmit: SubmitHandler<CreateOrganizationDataType> = (data) => {
        console.log({data});
        navigate(Routes.LANDING);
    };

    const onError: SubmitErrorHandler<CreateOrganizationDataType> = (errors, e) => {
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

export default CreateOrganizationScreen;
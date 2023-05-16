import {ScrollView, Text, View} from "react-native";
import Button from "./Button";
import React, {useState} from "react";
import {usePowerPlantStore} from "../store/power-plant-store";
import {UpdatePowerPlantDataType} from "../types/powerPlant.types";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {UpdatePowerPlantDataSchema} from "../schemas/powerPlant.schema";
import {FormProvider, SubmitErrorHandler, SubmitHandler} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import usePowerPlant from "../hooks/usePowerPlant";
import { FormMessage, FormMessageType} from "../types/common.types";
import usePowerPlantDeleteMutation from "../hooks/usePowerPlantDeleteMutation";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import useForm from "../hooks/useForm";
import {PowerPlantsTab, useDashboardTabsStore} from "../store/dashboard-tabs-store";
import {useToastStore} from "../store/toast-store";
import {ToastTypes} from "../types/toast.types";

const PowerPlantSettingsTab = () => {

    const queryClient = useQueryClient()
    const setActiveTab = useDashboardTabsStore(state => state.setActiveTab)
    const [message, setMessage] = useState<FormMessage>({type: FormMessageType.DEFAULT, text: ''});
    const selectedPowerPlant = usePowerPlantStore(state => state.selectedPowerPlant);
    const {data: powerPlantData} = usePowerPlant(selectedPowerPlant?.id || '', {enabled: !!selectedPowerPlant})
    const form = useForm<UpdatePowerPlantDataType>({
        resolver: zodResolver(UpdatePowerPlantDataSchema),
        defaultValues: {name: powerPlantData?.powerPlants[0].displayName || ""}
    })

    const { showToast } = useToastStore();


    const {mutate: deletePowerPlant} = usePowerPlantDeleteMutation(selectedPowerPlant?.id || '', {
        onSuccess: () => {
            showToast('Elektrarna uspešno izbrisana!', ToastTypes.SUCCESS)
            queryClient.invalidateQueries({ queryKey: [QueryKey.POWER_PLANTS] }, {})
            setActiveTab(PowerPlantsTab.DASHBOARD)
        },
        onError: (err) => {
            showToast('Napaka pri brisanju elektrarne!', ToastTypes.ERROR)
        }
    })

    const onSubmit: SubmitHandler<UpdatePowerPlantDataType> = (data) => {
        //console.log({data});
        //mutate({name: data.communityName, powerPlants: data.powerPlants})
    };

    const onError: SubmitErrorHandler<UpdatePowerPlantDataType> = (errors) => {
        return console.log({errors})
    }
    // TODO: success/error handling
    return (
        <View className='dark:bg-dark-main flex-1 px-3'>
            <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
                <View className='px-2'>
                    <FormProvider {...form}>
                        <ControlledInput
                            name="powerPlantName"
                            label="Ime elektrarne"
                            placeholder="Ime"
                            defaultValue={powerPlantData?.powerPlants[0].displayName}
                        />
                        <Text className={`pl-0.5 mt-2 ${message.type === FormMessageType.SUCCESS ? 'text-tint' : 'text-warning'}`}>{message.text}</Text>
                        <Button
                            text='Posodobi'
                            classname='mt-2'
                            onPress={form.handleSubmit(onSubmit, onError)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
            <Button text='Izbriši elektrarno' onPress={deletePowerPlant} classname='bg-danger m-auto my-4'/>
        </View>
    )
}
export default PowerPlantSettingsTab
import {ScrollView, View} from "react-native";
import Button from "./Button";
import React from "react";
import {usePowerPlantStore} from "../store/power-plant-store";
import {UpdatePowerPlantDataType} from "../types/powerPlant.types";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {UpdatePowerPlantDataSchema} from "../schemas/powerPlant.schema";
import {FormProvider, SubmitHandler} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import usePowerPlant from "../hooks/usePowerPlant";
import usePowerPlantDeleteMutation from "../hooks/usePowerPlantDeleteMutation";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import useForm from "../hooks/useForm";
import {PowerPlantsTab, useDashboardTabsStore} from "../store/dashboard-tabs-store";
import {useToastStore} from "../store/toast-store";
import {ToastTypes} from "../types/toast.types";
import usePowerPlantUpdateMutation from "../hooks/usePowerPlantUpdateMutation";

const PowerPlantSettingsTab = () => {

    const queryClient = useQueryClient()
    const setActiveTab = useDashboardTabsStore(state => state.setActiveTab)
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

    const {mutate: updatePowerPlant} = usePowerPlantUpdateMutation(selectedPowerPlant?.id || '', {
        onSuccess: () => {
            showToast('Elektrarna uspešno posodobljena!', ToastTypes.SUCCESS)
            queryClient.invalidateQueries({ queryKey: [QueryKey.POWER_PLANTS] }, {})
        },
        onError: (err) => {
            showToast('Napaka pri posodabljanju elektrarne!', ToastTypes.ERROR)
        }
    })

    const onSubmit: SubmitHandler<UpdatePowerPlantDataType> = (data) => {
        // TODO add max power & size
        //updatePowerPlant({ displayName: data.name, latitude: powerPlantData!.powerPlants[0].latitude, longitude: powerPlantData!.powerPlants[0].longitude})
    };

    return (
        <View className='dark:bg-dark-main flex-1 px-3'>
            <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
                <View className='px-2'>
                    <FormProvider {...form}>
                        <ControlledInput
                            name="name"
                            label="Ime elektrarne"
                            placeholder="Ime"
                            defaultValue={powerPlantData?.powerPlants[0].displayName}
                        />
                        <Button
                            text='Posodobi'
                            classname='mt-4'
                            onPress={form.handleSubmit(onSubmit)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
            <Button text='Izbriši elektrarno' onPress={deletePowerPlant} classname='bg-danger m-auto my-4'/>
        </View>
    )
}
export default PowerPlantSettingsTab
import {ScrollView, View} from "react-native";
import Button from "./Button";
import React from "react";
import {usePowerPlantStore} from "../store/power-plant-store";
import {UpdatePowerPlantDataType} from "../types/powerPlant.types";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {UpdatePowerPlantDataSchema} from "../schemas/powerPlant.schema";
import {useForm, FormProvider, SubmitHandler, SubmitErrorHandler} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import usePowerPlant from "../hooks/usePowerPlant";

const DefaultPowerPlantData: UpdatePowerPlantDataType = {
    name: '',
}

const PowerPlantSettingsTab = () => {
    const {id: selectedPowerPlantID} = usePowerPlantStore(state => state.selectedPowerPlant);
    const {data: powerPlantData} = usePowerPlant(selectedPowerPlantID)
    // nena menjava elektrarne

    const form = useForm<UpdatePowerPlantDataType>({
        resolver: zodResolver(UpdatePowerPlantDataSchema),
        defaultValues: DefaultPowerPlantData
    })

    const deletePowerPlant= () => {

    }

    const onSubmit: SubmitHandler<UpdatePowerPlantDataType> = (data) => {
        //console.log({data});
        //mutate({name: data.communityName, powerPlants: data.powerPlants})
    };

    const onError: SubmitErrorHandler<UpdatePowerPlantDataType> = (errors) => {
        return console.log({errors})
    }

    return (
        <ScrollView className='dark:bg-dark-main flex-1 px-3'>
            <View className='px-2 my-4'>
                <FormProvider {...form}>
                    <ControlledInput
                        name="powerPlantName"
                        label="Ime elektrarne"
                        placeholder="Ime"
                        defaultValue={powerPlantData && powerPlantData.powerPlants[0].displayName}
                    />
                    <Button text='Posodobi elektrarno' onPress={form.handleSubmit(onSubmit, onError)} classname='bg-tint my-4'/>
                </FormProvider>
                <Button text='Izbriši elektrarno' onPress={deletePowerPlant} classname='bg-danger my-16'/>
            </View>
        </ScrollView>
    )
}
export default PowerPlantSettingsTab
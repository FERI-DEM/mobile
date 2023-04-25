import {ScrollView, Text, View} from "react-native";
import Button from "./Button";
import React, {useState} from "react";
import {usePowerPlantStore} from "../store/power-plant-store";
import {UpdatePowerPlantDataType} from "../types/powerPlant.types";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {UpdatePowerPlantDataSchema} from "../schemas/powerPlant.schema";
import {useForm, FormProvider, SubmitHandler, SubmitErrorHandler} from "react-hook-form";
import {ControlledInput} from "./ControlledInput";
import usePowerPlant from "../hooks/usePowerPlant";
import {FormMessage, FormMessageType} from "../types/common.types";

const DefaultPowerPlantData: UpdatePowerPlantDataType = {
    name: '',
}

const PowerPlantSettingsTab = () => {
    const [message, setMessage] = useState<FormMessage>({type: FormMessageType.DEFAULT, text: ''});
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
                            defaultValue={powerPlantData && powerPlantData.powerPlants[0].displayName}
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
            <Button text='Izbriši elektrarno' onPress={deletePowerPlant} classname='bg-danger m-auto'/>
        </View>
    )
}
export default PowerPlantSettingsTab
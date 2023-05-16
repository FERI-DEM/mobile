import {ScrollView, View} from "react-native";
import Button from "../components/Button";
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {ControlledInput} from "../components/ControlledInput";
import {zodResolver} from '@hookform/resolvers/zod';
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";
import Map from "../components/Map";
import {AddPowerPlantType} from "../types/user.types";
import {AddPowerPlantSchema} from "../schemas/user.schema";
import LocationAutoCompleteInput from "../components/LocationAutoCompleteInput";
import {MapboxResponse} from "../types/mapbox.types";
import useUserGeocodedLocation from "../hooks/useUserGeocodedLocation";
import {useCallback} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import {mapboxToUserLocation} from "../utils/mapbox-to-user-location";
import useRegisterDetailsMutation from "../hooks/useRegisterDetailsMutation";
import {usePowerPlantStore} from "../store/power-plant-store";

const AddPowerPlantData: AddPowerPlantType = {
    powerPlantName: 'Moja elektrarna',
    location: ''
}

const AddPowerPlantForm = () => {
    const setSelectedPowerPlant = usePowerPlantStore(state => state.setSelectedPowerPlant)
    const form = useForm({
        resolver: zodResolver(AddPowerPlantSchema),
        defaultValues: AddPowerPlantData
    });

    const queryClient = useQueryClient()
    const {mutate: createPowerPlant, isLoading: createPowerPlantLoading} = useRegisterDetailsMutation({
        onSuccess: (data) => {
            setSelectedPowerPlant({id: data._id, name: data.displayName})
            navigate(Routes.CALIBRATION)
        }
    })
    const {data: userLocation} = useUserGeocodedLocation({
        onSuccess: (data) => {
            form.setValue('location', data?.address || '')
        }
    })


    const onSubmit: SubmitHandler<AddPowerPlantType> = () => {
        createPowerPlant({
            displayName: form.getValues().powerPlantName,
            latitude: userLocation?.coordinates?.latitude || 0,
            longitude: userLocation?.coordinates?.longitude || 0
        })
    };

    const onClickOnAutoCompleteArea = useCallback((data: MapboxResponse | undefined) => {
        const userLocation = mapboxToUserLocation(data)
        form.setValue('location', userLocation.address)
        queryClient.setQueryData([QueryKey.USER_GEOCODED_LOCATION], userLocation)
    }, [form, queryClient])

    return (
        <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
            <View className='px-4'>
                <FormProvider {...form}>
                    <ControlledInput
                        name="powerPlantName"
                        label="Ime elektrarne"
                        placeholder="Moja elektrarna"
                    />
                    <LocationAutoCompleteInput onClickOnAutoCompleteArea={onClickOnAutoCompleteArea}/>
                    <View className='h-56 pt-4'>
                        <Map coordinates={userLocation?.coordinates}/>
                    </View>
                    <Button
                        text="Zaključi"
                        classname='mt-7 w-24 h-11'
                        onPress={form.handleSubmit(onSubmit)}
                        loading={createPowerPlantLoading}
                    />
                </FormProvider>
            </View>
        </ScrollView>
    )
}
export default AddPowerPlantForm
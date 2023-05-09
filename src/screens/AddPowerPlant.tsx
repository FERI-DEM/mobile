import {ScrollView, Text, View} from "react-native";
import Svg, {Path} from "react-native-svg";
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

const AddPowerPlantData: AddPowerPlantType = {
    powerPlantName: 'Moja elektrarna',
    location: ''
}

const AddPowerPlant = () => {
    const form = useForm({
        resolver: zodResolver(AddPowerPlantSchema),
        defaultValues: AddPowerPlantData
    });

    const queryClient = useQueryClient()
    const {mutate: createPowerPlant} = useRegisterDetailsMutation({
        onSuccess: () => navigate(Routes.DASHBOARD)
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
        <View className='flex-1 items-center dark:bg-dark-main'>
            <View className='flex w-full justify-center'>
                <Svg width="100%" height="172" viewBox="0 0 390 172" fill="none">
                    <Path fill-rule="evenodd" clip-rule="evenodd"
                          d="M217.117 -78.7162C280.319 -76.0202 321.677 -46.416 362.526 -19.8342C405.571 8.17691 463.141 36.9847 450.128 72.9126C436.901 109.431 364.357 125.608 303.762 142.407C240.901 159.833 174.175 181.319 108.274 167.682C37.0633 152.946 -12.1061 115.211 -25.9716 74.1739C-39.2202 34.9625 -7.5207 -3.52171 40.2717 -33.5807C85.2263 -61.8548 148.914 -81.6256 217.117 -78.7162Z"
                          fill="#236BFE"/>
                </Svg>
                <Text className='text-xl mr-5 text-white font-bold absolute ml-6'>Prosimo vnesite podatke o vaši
                    elektrarni </Text>
            </View>
            <ScrollView className='mt-5 w-full' keyboardShouldPersistTaps='always'>
                <View className='px-6'>
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
                            classname='mt-7'
                            onPress={form.handleSubmit(onSubmit)}
                        />
                    </FormProvider>
                </View>
            </ScrollView>
        </View>
    )
}
export default AddPowerPlant
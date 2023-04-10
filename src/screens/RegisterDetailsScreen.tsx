import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import Button from "../components/Button";
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import {ControlledInput} from "../components/ControlledInput";
import {zodResolver} from '@hookform/resolvers/zod';
import {navigate} from "../navigation/navigate";
import {Routes} from "../navigation/routes";
import Map from "../components/Map";
import {Coordinates, RegisterDetailsType} from "../types/user.types";
import {RegisterDetailsSchema} from "../schemas/user.schema";
import useGeocoding from "../hooks/useGeocoding";
import {useMemo, useState} from "react";

const DefaultRegisterData: RegisterDetailsType = {
    powerPlantName: 'Moja elektrarna',
    location: ''
}

const RegisterDetailsScreen = () => {
    const form = useForm({
        resolver: zodResolver(RegisterDetailsSchema),
        defaultValues: DefaultRegisterData
    });
    const [clickedCoordinates, setClickedCoordinates] = useState<Coordinates>()
    const {data: dataByAddress} = useGeocoding({address: form.watch('location')})
    useGeocoding({coordinates: clickedCoordinates}, (data) => {
        form.setValue('location', data?.features[0]?.place_name || '')
    })
    const coordinates = useMemo(() => (
        {longitude: dataByAddress?.features[0]?.geometry.coordinates[0] || 0,
            latitude: dataByAddress?.features[0]?.geometry.coordinates[1] || 0}
    ), [form.watch('location')])

    const onSubmit: SubmitHandler<RegisterDetailsType> = () => {
        navigate(Routes.DASHBOARD)
    };

    const selectCurrentPlaceName = () => {
        form.setValue('location', dataByAddress?.features[0]?.place_name || '')
    }


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
                        <View className='relative'>
                            <ControlledInput
                                name="location"
                                label="Lokacija"
                                placeholder="Ljubljana"
                                classNameContainer='mt-5'
                            />
                            {(form.getValues('location') !== '' && form.getValues('location') !== dataByAddress?.features[0]?.place_name) && (
                                <TouchableOpacity onPress={selectCurrentPlaceName} className='absolute rounded-md -bottom-16 w-full max-h-14 bg-dark-element z-20 p-4'>
                                    <View className='bg-dark-element rounded-md'>
                                        <Text className='text-sm dark:text-white' numberOfLines={1}>{dataByAddress?.features[0]?.place_name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View className='h-56 pt-4'>
                            <Map coordinates={coordinates} setCoordinates={setClickedCoordinates}/>
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
export default RegisterDetailsScreen
import {ControlledInput, TextInputProps} from "./ControlledInput";
import {Text, TouchableOpacity, View} from "react-native";
import {useFormContext} from "react-hook-form";
import useGeocodingByAddress from "../hooks/useGeocodingByAddress";
import {useEffect, useMemo, useState} from "react";
import {Coordinates} from "../types/user.types";
import {MapboxResponse} from "../types/mapbox.types";

interface AutoCompleteInputProps {
    form: any
    onClickOnAutoCompleteArea: (data: MapboxResponse | undefined) => void
}
const LocationAutoCompleteInput = ({onClickOnAutoCompleteArea, form}: AutoCompleteInputProps) => {

    const [autoCompleteAreaVisible, setAutoCompleteAreaVisible] = useState(false)
    const {data} = useGeocodingByAddress(form.watch('location'))


    const userLocation = useMemo(() => ({
        address: data?.features[0]?.place_name || '',
        coordinates: {
            latitude: data?.features[0]?.geometry.coordinates[1] || 0,
            longitude: data?.features[0]?.geometry.coordinates[0] || 0
        }
    }), [data])

    useEffect(() => {
        setAutoCompleteAreaVisible(true)
    }, [form.watch('location')])


    return <View className='relative'>
        <ControlledInput
            name="location"
            label="Lokacija"
            placeholder="Ljubljana"
            classNameContainer='mt-5'
        />
        {(autoCompleteAreaVisible && form.getValues('location') !== userLocation.address) && (
            <TouchableOpacity onPress={() => {
                setAutoCompleteAreaVisible(false)
                onClickOnAutoCompleteArea(data)
            }} className='absolute rounded-md -bottom-16 w-full max-h-14 bg-dark-element z-20 p-4'>
                <View className='bg-dark-element rounded-md'>
                    <Text className='text-sm dark:text-white' numberOfLines={1}>{userLocation.address}</Text>
                </View>
            </TouchableOpacity>
        )}
    </View>
}
export default LocationAutoCompleteInput
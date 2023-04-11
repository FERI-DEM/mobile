import {ControlledInput} from "./ControlledInput";
import {Text, TouchableOpacity, View} from "react-native";
import {useWatch} from "react-hook-form";
import useGeocodingByAddress from "../hooks/useGeocodingByAddress";
import {MapboxResponse} from "../types/mapbox.types";
import {mapboxToUserLocation} from "../utils/mapbox-to-user-location";

interface AutoCompleteInputProps {
    onClickOnAutoCompleteArea: (data: MapboxResponse | undefined) => void
}
const LocationAutoCompleteInput = ({onClickOnAutoCompleteArea}: AutoCompleteInputProps) => {

    const address = useWatch({name:'location'})
    const {data} = useGeocodingByAddress(address)

    const userLocation = mapboxToUserLocation(data)


    return <View className='relative'>
        <ControlledInput
            name="location"
            label="Lokacija"
            placeholder="Ljubljana"
            classNameContainer='mt-5'
        />
        {(address !== userLocation.address) && (
            <TouchableOpacity onPress={() => onClickOnAutoCompleteArea(data)} className='absolute rounded-md -bottom-16 w-full max-h-14 bg-dark-element z-20 p-4'>
                <View className='bg-dark-element rounded-md'>
                    <Text className='text-sm dark:text-white' numberOfLines={1}>{userLocation.address}</Text>
                </View>
            </TouchableOpacity>
        )}
    </View>
}
export default LocationAutoCompleteInput
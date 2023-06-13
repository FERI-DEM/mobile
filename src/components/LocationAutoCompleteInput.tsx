import { ControlledInput } from './ControlledInput';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useWatch } from 'react-hook-form';
import useGeocodingByAddress from '../hooks/useGeocodingByAddress';
import { MapboxResponse } from '../types/mapbox.types';
import { mapboxToUserLocation } from '../utils/mapbox-to-user-location';

interface AutoCompleteInputProps {
  onClickOnAutoCompleteArea: (data: MapboxResponse | undefined) => void;
  isLoading?: boolean;
}
const LocationAutoCompleteInput = ({
  onClickOnAutoCompleteArea,
  isLoading = false,
}: AutoCompleteInputProps) => {
  const address = useWatch({ name: 'location' });
  const { data, isLoading: isGeocodingByAddressLoading } =
    useGeocodingByAddress(address);

  const userLocation = mapboxToUserLocation(data);

  return (
    <View className="relative">
      <ControlledInput
        multiline={true}
        editable={!isLoading}
        name="location"
        label="Lokacija *"
        placeholder="Ljubljana"
        classNameContainer="mt-5"
      />
      {address !== userLocation.address && (
        <>
          {!isGeocodingByAddressLoading ? (
            <TouchableOpacity
              onPress={() => onClickOnAutoCompleteArea(data)}
              className="absolute rounded-md -bottom-14 w-full max-h-14 bg-dark-element z-20 p-4"
            >
              <View className="bg-dark-element rounded-md">
                <Text className="text-sm dark:text-white" numberOfLines={1}>
                  {userLocation.address}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="absolute rounded-md -bottom-14 w-full max-h-14 bg-dark-element z-20 p-4">
              <ActivityIndicator size={20} color="white" />
            </View>
          )}
        </>
      )}
    </View>
  );
};
export default LocationAutoCompleteInput;

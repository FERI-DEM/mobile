import {Coordinates} from "../types/user.types";
import * as Location from "expo-location";
import MapboxService from "../api/mapbox.service";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/queryKey.types";

interface UserLocation{
    coordinates?: Coordinates
    address: string
}

const useUserGeocodedLocation = (options?: Omit<UseQueryOptions<UserLocation | undefined, AxiosError>, 'retry'>) => useQuery<UserLocation | undefined, AxiosError>(
    [QueryKey.USER_GEOCODED_LOCATION], async () => {

        await new Promise<void>(async (resolve, reject) => {
            const {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') reject('Permission to access location was denied');
            resolve()
        });

        const location = await Location.getCurrentPositionAsync();
        const data = await MapboxService.geocodeByCoordinates(location.coords)
        return {
            address: data?.features[0]?.place_name || '',
            coordinates: {
                latitude: data?.features[0]?.geometry.coordinates[1] || 0,
                longitude: data?.features[0]?.geometry.coordinates[0] || 0
            }
        }

    },
    {retry: false
        , ...options}
)

export default useUserGeocodedLocation
import {Coordinates} from "../types/user.types";
import * as Location from "expo-location";
import MapboxService from "../api/mapbox.service";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {QueryKey} from "../types/keys.types";
import {mapboxToUserLocation} from "../utils/mapbox-to-user-location";

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
        return mapboxToUserLocation(data)

    },
    {retry: false
        , ...options}
)

export default useUserGeocodedLocation
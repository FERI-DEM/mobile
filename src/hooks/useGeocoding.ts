import {useQuery} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import MapboxService from "../api/mapbox.service";
import {UserLocation} from "../types/user.types";
import {MapboxResponse} from "../types/mapbox.types";
import {AxiosError} from "axios";

const useGeocoding = (location: UserLocation, onSuccess?: (data: MapboxResponse) => void) => useQuery<MapboxResponse, AxiosError>(
    [QueryKey.FORWARD_GEOCODING, location], () => MapboxService.geocode(location),{
        onSuccess
    }
)

export default useGeocoding
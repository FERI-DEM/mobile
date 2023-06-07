import {useQuery, useQueryClient} from "@tanstack/react-query";
import {QueryKey} from "../types/keys.types";
import MapboxService from "../api/mapbox.service";
import {MapboxResponse} from "../types/mapbox.types";
import {AxiosError} from "axios";
import {mapboxToUserLocation} from "../utils/mapbox-to-user-location";

const useGeocodingByAddress = (address: string) => {
    const queryClient = useQueryClient()
    const data = queryClient.getQueryData<MapboxResponse>([QueryKey.FORWARD_GEOCODING_BY_ADDRESS, address])
    const userLocation = mapboxToUserLocation(data)
    return useQuery<MapboxResponse, AxiosError>(
        [QueryKey.FORWARD_GEOCODING_BY_ADDRESS, address], () => MapboxService.geocodeByAddress(address), {
            enabled: address !== userLocation.address,
        })
}


export default useGeocodingByAddress
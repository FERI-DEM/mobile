import {useQuery} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import MapboxService from "../api/mapbox.service";
import {MapboxResponse} from "../types/mapbox.types";
import {AxiosError} from "axios";

const useGeocodingByAddress = (address: string) => useQuery<MapboxResponse, AxiosError>(
    [QueryKey.FORWARD_GEOCODING, address], () => MapboxService.geocodeByAddress(address)
)

export default useGeocodingByAddress
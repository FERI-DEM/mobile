import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {QueryKey} from "../types/queryKey.types";
import MapboxService from "../api/mapbox.service";
import {MapboxResponse} from "../types/mapbox.types";
import {AxiosError} from "axios";
import {Coordinates} from "../types/user.types";

const useGeocodingByCoordinates = (coordinates?: Coordinates, options?: UseQueryOptions<MapboxResponse, AxiosError, MapboxResponse>) => useQuery<MapboxResponse, AxiosError>(
    [QueryKey.FORWARD_GEOCODING_BY_ADDRESS, coordinates], () => MapboxService.geocodeByCoordinates(coordinates), options
)

export default useGeocodingByCoordinates
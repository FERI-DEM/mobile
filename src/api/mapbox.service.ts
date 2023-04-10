import {mapboxInstance} from "./axios";
import {MapboxResponse} from "../types/mapbox.types";
import {Coordinates, UserLocation} from "../types/user.types";

const MapboxService = {
    geocodeByAddress: async (address: string) => {
        const response = await mapboxInstance.get<MapboxResponse>(address)
        return response.data
    },
    geocodeByCoordinates: async (coordinates?: Coordinates) => {
        const response = await mapboxInstance.get<MapboxResponse>(`${coordinates?.longitude},${coordinates?.latitude}`)
        return response.data
    },
}

export default MapboxService
import {mapboxInstance} from "./axios";
import {UserLocation} from "../types/user.types";
import {MapboxResponse} from "../types/mapbox.types";

const MapboxService = {
    geocode: async (location: UserLocation) => {
        let query = location.address || ''
        if(!location.address && location.coordinates)
            query = `${location.coordinates.longitude},${location.coordinates.latitude}`
        const response = await mapboxInstance.get<MapboxResponse>(`${query}`)
        return response.data
    },
}

export default MapboxService
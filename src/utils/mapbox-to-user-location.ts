import {MapboxResponse} from "../types/mapbox.types";

export const mapboxToUserLocation = (data?: MapboxResponse) => {
    if(!data || !data.features || !data.features.length) return {
        address: '',
        coordinates: {
            latitude: 0,
            longitude: 0
        }
    }
    return {
        address: data?.features[0].place_name || '',
        coordinates: {
            latitude: data?.features[0].geometry.coordinates[1] || 0,
            longitude: data?.features[0].geometry.coordinates[0] || 0
        }
    }
}
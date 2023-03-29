interface MapboxFeature {
    geometry: {
        coordinates: number[];
    }
    place_name?: string;
}
export interface MapboxResponse {
    features: MapboxFeature[];
}
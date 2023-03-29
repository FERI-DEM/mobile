import axios from "axios";
import {MAPBOX_TOKEN, MAPBOX_URI} from "@env";

export const mapboxInstance = axios.create({
    baseURL: MAPBOX_URI,
    timeout: 8000,
    headers: {
        Accept: 'application/json',
    },
});
mapboxInstance.interceptors.request.use((request) => {
    request.url = request.url + '.json'
    request.params = {
        limit: 1,
        access_token: MAPBOX_TOKEN,
    }
    return request;
}, error => Promise.reject(error))

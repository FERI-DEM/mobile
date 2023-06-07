import axios from "axios";
import {API_URL, MAPBOX_TOKEN, MAPBOX_URI} from "@env";

console.log(API_URL)
export const apiInstance = axios.create({
    baseURL: API_URL,
    timeout: 8000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'TimezoneOffset': -new Date().getTimezoneOffset() / 60
    }
});
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

apiInstance.interceptors.response.use((response) => response, error => {
    if(__DEV__) console.log(error.response.data)
    return Promise.reject({...error, message: error.response.data.error})
})
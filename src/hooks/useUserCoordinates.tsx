import * as Location from "expo-location";
import {FC, useEffect, useState} from "react";
import {Coordinates} from "../types/user.types";

interface useUserLocationProps {
    onSuccess?: (coordinates: Coordinates) => void
    onReject?: (error: any) => void
}
const useUserCoordinates = (props?: useUserLocationProps) => {
    const [coordinates, setCoordinates] = useState<Coordinates>()
    const getUserLocation = async () => {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') return props?.onReject && props?.onReject('Permission to access location was denied');

            const location = await Location.getCurrentPositionAsync();
            setCoordinates({...location.coords})
            props?.onSuccess && props?.onSuccess({...location.coords})
        } catch (e) {
            props?.onReject && props?.onReject(e)
        }

    }

    useEffect(() => {
        getUserLocation()
    }, [])
    return {coordinates}
}

export default useUserCoordinates
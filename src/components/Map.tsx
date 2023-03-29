import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import * as Location from "expo-location";
import {CameraRef} from "@rnmapbox/maps/lib/typescript/components/Camera";
import {Image, View} from "react-native";
import GenericMap from "./GenericMap";
import PinImage from '../assets/images/pin.png';
import {MAPBOX_TOKEN} from "@env";
import {Coordinates} from "../types/user.types";
import {useUserStore} from "../store/user-store";
import useGeocoding from "../hooks/useGeocoding";

const getMapbox = async () => {
    if (!__DEV__) {
        const mapbox = await import('@rnmapbox/maps')
        const MapboxGL = mapbox.default
        await MapboxGL.setAccessToken(MAPBOX_TOKEN);
        const {MapView, PointAnnotation, Camera, UserLocation, MarkerView} = MapboxGL
        return {MapView, PointAnnotation, Camera, UserLocation, MarkerView} as typeof mapbox
    }
    return null
}

const Map = () => {
    const camera = useRef<CameraRef>(null);
    const [clickedLocation, setClickedLocation] = useState<Coordinates>()
    const GenericMapComponent = useMemo(() => <GenericMap/>, [])
    const [MapboxGL, setMapboxGL] = useState<any>(null)
    const {data} = useGeocoding({coordinates: clickedLocation})
    const userLocation = data?.features[0]?.geometry?.coordinates ? {
        longitude: data.features[0].geometry.coordinates[0],
        latitude: data.features[0].geometry.coordinates[1]
    } : null

    const getUserLocation = async () => {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return;
            }

            const location = await Location.getCurrentPositionAsync();
            setClickedLocation({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            })
        } catch (e) {
            console.log(e)
        }

    }
    const setMapComponentAsync = async () => {
        let MapboxGL = await getMapbox();
        setMapboxGL(MapboxGL)
    }

    const onPressOnMap = (features: any) => {
        setClickedLocation({
            latitude: features.geometry.coordinates[0],
            longitude: features.geometry.coordinates[1]
        })
    }

    useEffect(() => {
        getUserLocation()
        setMapComponentAsync()
    }, [])

    if (!MapboxGL)
        return GenericMapComponent

    return <MapboxGL.MapView style={{flex: 1}} onPress={onPressOnMap}>
        <MapboxGL.Camera
            ref={camera}
            zoomLevel={12}
            centerCoordinate={[userLocation?.longitude || 0, userLocation?.latitude || 0]}
            animationMode='none'
        />
        {userLocation && <MapboxGL.MarkerView
            key="user-location"
            coordinate={[userLocation.longitude, userLocation.latitude]}
        >
            <View>
                <Image source={PinImage} style={{height: 30, width: 20, resizeMode: 'cover'}}/>
            </View>
        </MapboxGL.MarkerView>}

    </MapboxGL.MapView>
}

export default Map
import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import * as Location from "expo-location";
import {CameraRef} from "@rnmapbox/maps/lib/typescript/components/Camera";
import {Image, View} from "react-native";
import GenericMap from "./GenericMap";
import PinImage from '../assets/images/pin.png';
import {MAPBOX_TOKEN} from "@env";

interface MapProps {}

console.log(MAPBOX_TOKEN)

const getMapbox = async () => {
    if (!__DEV__) {
        const mapbox = await import('@rnmapbox/maps')
        const MapboxGL = mapbox.default
        await MapboxGL.setAccessToken(MAPBOX_TOKEN);
        const {MapView, PointAnnotation, Camera, UserLocation, MarkerView} = MapboxGL
        return {MapView, PointAnnotation, Camera, UserLocation, MarkerView}
    }
    return null
}

const Map: FC<MapProps> = () => {
    const camera = useRef<CameraRef>(null);
    const [currentUserLocation, setCurrentUserLocation] = useState<{ longitude: number, latitude: number } | null>();
    const GenericMapComponent = useMemo(() => <GenericMap/>, [])
    const [MapboxGL, setMapboxGL] = useState<any>(null)

    const getUserLocation = async () => {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return;
            }

            const location = await Location.getCurrentPositionAsync();
            setCurrentUserLocation({
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

    useEffect(() => {
        getUserLocation()
        setMapComponentAsync()
    }, [])

    if (!MapboxGL)
        return GenericMapComponent

    return <MapboxGL.MapView style={{flex: 1}}>
        <MapboxGL.Camera
            ref={camera}
            zoomLevel={12}
            centerCoordinate={[currentUserLocation?.longitude || 0, currentUserLocation?.latitude || 0]}
            animationMode='none'
        />
        {currentUserLocation && <MapboxGL.MarkerView
            key="user-location"
            coordinate={[currentUserLocation.longitude, currentUserLocation.latitude]}
        >
            <View>
                <Image source={PinImage} style={{height: 30, width: 20, resizeMode: 'cover'}}/>
            </View>
        </MapboxGL.MarkerView>}

    </MapboxGL.MapView>
}

export default Map
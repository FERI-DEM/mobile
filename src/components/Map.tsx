import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import * as Location from "expo-location";
import {CameraRef} from "@rnmapbox/maps/lib/typescript/components/Camera";
import {Image, View} from "react-native";
import GenericMap from "./GenericMap";
import PinImage from '../assets/images/pin.png';
import {MAPBOX_TOKEN} from "@env";
import {Coordinates} from "../types/user.types";

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

interface MapProps {
    coordinates?: Coordinates
    setCoordinates: (coordinates: Coordinates) => void
}

const Map:FC<MapProps> = ({coordinates, setCoordinates}) => {
    const camera = useRef<CameraRef>(null);
    const GenericMapComponent = useMemo(() => <GenericMap/>, [])
    const [MapboxGL, setMapboxGL] = useState<any>(null)

    const getUserLocation = async () => {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return;
            }

            const location = await Location.getCurrentPositionAsync();
            setCoordinates({
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
        setCoordinates({
            longitude: features.geometry.coordinates[0],
            latitude: features.geometry.coordinates[1]
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
            centerCoordinate={[coordinates?.longitude || 0, coordinates?.latitude || 0]}
            animationMode='none'
        />
        {coordinates && <MapboxGL.MarkerView
            key="user-location"
            coordinate={[coordinates.longitude, coordinates.latitude]}
        >
            <View>
                <Image source={PinImage} style={{height: 30, width: 20, resizeMode: 'cover'}}/>
            </View>
        </MapboxGL.MarkerView>}

    </MapboxGL.MapView>
}

export default Map
import {FC, useEffect, useMemo, useRef, useState} from "react";
import * as Location from "expo-location";
import {CameraRef} from "@rnmapbox/maps/lib/typescript/components/Camera";
import {View, Text} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";

interface MapProps {}

const getMapbox = async () => {
    if (!__DEV__) {
        const mapbox = await import('@rnmapbox/maps')
        const MapboxGL = mapbox.default
        await MapboxGL.setAccessToken('pk.eyJ1IjoibWF0ZXZ6IiwiYSI6ImNsY2dmb3l4czA5YjkzbmxjMTAyank0aHMifQ.CyFCzwJ9_VfYh-CQ1Od79g');
        const {MapView, PointAnnotation, Camera, UserLocation} = MapboxGL
        return {MapView, PointAnnotation, Camera, UserLocation}
    }
    return null
}

const Map: FC<MapProps> = () => {
    const camera = useRef<CameraRef>(null);
    const [currentUserLocation, setCurrentUserLocation] = useState<{ longitude: number, latitude: number } | null>();
    const GenericMapComponent = useMemo(() => <View className='w-full h-full flex-row justify-center'
                                                    style={{alignItems: 'center'}}><Text className='dark:text-white'>Mapa</Text></View>, [])
    const [NativeMapComponent, setNativeMapComponent] = useState<JSX.Element | null>(null)

    const getUserLocation = async () => {
        try{
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return;
            }

            const location = await Location.getCurrentPositionAsync();
            setCurrentUserLocation({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            })
        }
        catch (e) {
            console.log(e)
        }

    }

    const setMapComponentAsync = async () => {
        let MapboxGL = await getMapbox();

        setNativeMapComponent(() => MapboxGL ? <MapboxGL.MapView style={{flex: 1}}>
            <MapboxGL.Camera
                ref={camera}
                zoomLevel={12}
                animationMode='none'
            />
            <MapboxGL.UserLocation visible/>
        </MapboxGL.MapView> : null)

    }

    useEffect(() => {
        getUserLocation()
        setMapComponentAsync()
    }, [])

    useEffect(() => {
        if (camera.current && currentUserLocation) {
            camera.current.fitBounds([currentUserLocation.longitude], [currentUserLocation.latitude], 50, 1000)
        }
    }, [currentUserLocation, NativeMapComponent])

    if(NativeMapComponent)
        return NativeMapComponent

    return GenericMapComponent
}

export default Map
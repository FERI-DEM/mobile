import {Routes, RoutesParams} from "./routes";
import {createNavigationContainerRef} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<RoutesParams>()

export function navigate(name: Routes, params?: RoutesParams[typeof name]) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}
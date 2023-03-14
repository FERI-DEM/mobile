import {Routes} from "./routes";
import {RootStackParamList} from "../../types";
import {createNavigationContainerRef} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef()

export function navigate(name: Routes, params?: RootStackParamList[typeof name]) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}
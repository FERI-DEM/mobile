import {navigationRef} from "./index";
import {Routes} from "./routes";
import {RootStackParamList} from "../../types";

export function navigate(name: Routes, params?: RootStackParamList[typeof name]) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}
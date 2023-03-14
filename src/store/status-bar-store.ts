import {create} from "zustand";
import {FC, useEffect} from "react";

interface StatusBarState {
    color: string
}
export const useStatusBarStore = create<StatusBarState>((set) => ({
    color: '#1C1B2D'
}))

export const StatusBar:FC<{color: string}> = ({color}) => {
    useEffect(() => {
        useStatusBarStore.setState({color})
    }, [color])
    return null
}
import {create} from "zustand";
import {FC, useEffect} from "react";

interface HeaderState {
    title: string
    setTitle: (title: string) => void
}
export const useHeaderStore = create<HeaderState>((set) => ({
    title: '',
    setTitle: (title: string) => set({title: title}),
}))

export const Header:FC<{title: string}> = ({title}) => {
    useEffect(() => {
        useHeaderStore.setState({title: title})
    }, [title])
    return null
}
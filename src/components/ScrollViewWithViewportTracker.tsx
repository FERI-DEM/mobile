import {createContext, ReactNode, RefObject, useRef, useState} from "react";
import {ScrollView} from "react-native";
import {twMerge} from "tailwind-merge";


interface ScrollViewWithViewportTrackerProps {
    children: ReactNode;
    classNames?: string;
}
export interface ScrollViewState {
    scrollListeners: Array<(parentRef: RefObject<ScrollView>) => void>
    addScrollListener: (listener: (parentRef: RefObject<ScrollView>) => void) => void
}
export const TodoContext = createContext<ScrollViewState>({
    scrollListeners: [],
    addScrollListener: () => {},
});

const ScrollViewWithViewportTracker = ({children, classNames}: ScrollViewWithViewportTrackerProps) => {
    const [scrollListeners, setScrollListeners] = useState<ScrollViewState['scrollListeners']>([])
    const ref = useRef<ScrollView>(null)
    const addScrollListener = (listener: (parentRef: RefObject<ScrollView>) => void) => {
        setScrollListeners([...scrollListeners, listener])
    }

    const notifyScrollListeners = () => {
        scrollListeners.forEach(listener => listener(ref))
    }
    return <TodoContext.Provider value={{scrollListeners, addScrollListener}}>
        <ScrollView ref={ref} className={twMerge('flex', classNames)} onScroll={notifyScrollListeners}>
            {children}
        </ScrollView>
    </TodoContext.Provider>
}
export default ScrollViewWithViewportTracker;
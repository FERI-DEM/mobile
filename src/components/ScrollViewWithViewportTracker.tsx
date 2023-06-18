import {createContext, ReactNode, RefObject, useRef, useState} from "react";
import {ScrollView} from "react-native";
import {twMerge} from "tailwind-merge";

export interface ViewportTrackerContextType {
    scrollListeners: Array<(parentRef: RefObject<ScrollView>) => void>
    addScrollListener: (listener: (parentRef: RefObject<ScrollView>) => void) => void
}
export const ViewportTrackerContext = createContext<ViewportTrackerContextType>({
    scrollListeners: [],
    addScrollListener: () => {},
});

interface ScrollViewWithViewportTrackerProps {
    children: ReactNode;
    classNames?: string;
}

const ScrollViewWithViewportTracker = ({children, classNames}: ScrollViewWithViewportTrackerProps) => {
    const [scrollListeners, setScrollListeners] = useState<ViewportTrackerContextType['scrollListeners']>([])
    const ref = useRef<ScrollView>(null)
    const addScrollListener = (listener: (parentRef: RefObject<ScrollView>) => void) => {
        setScrollListeners([...scrollListeners, listener])
    }

    const notifyScrollListeners = () => {
        scrollListeners.forEach(listener => listener(ref))
    }

    const onLayout = () => {
        notifyScrollListeners()
    }

    return <ViewportTrackerContext.Provider value={{scrollListeners, addScrollListener}}>
        <ScrollView ref={ref} className={twMerge('flex', classNames)} onScroll={notifyScrollListeners} onLayout={onLayout}>
            {children}
        </ScrollView>
    </ViewportTrackerContext.Provider>
}
export default ScrollViewWithViewportTracker;
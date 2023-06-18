import {createContext, ReactNode, RefObject, useRef, useState} from "react";
import {ScrollView} from "react-native";
import {twMerge} from "tailwind-merge";

export interface ScrollViewState {
    scrollListeners: Array<(parentRef: RefObject<ScrollView>) => void>
    addScrollListener: (listener: (parentRef: RefObject<ScrollView>) => void) => void
    ref: RefObject<ScrollView> | null
}
export const TodoContext = createContext<ScrollViewState>({
    scrollListeners: [],
    addScrollListener: () => {},
    ref: null
});

interface ScrollViewWithViewportTrackerProps {
    children: ReactNode;
    classNames?: string;
}

const ScrollViewWithViewportTracker = ({children, classNames}: ScrollViewWithViewportTrackerProps) => {
    const [scrollListeners, setScrollListeners] = useState<ScrollViewState['scrollListeners']>([])
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

    return <TodoContext.Provider value={{scrollListeners, addScrollListener, ref}}>
        <ScrollView ref={ref} className={twMerge('flex', classNames)} onScroll={notifyScrollListeners} onLayout={onLayout}>
            {children}
        </ScrollView>
    </TodoContext.Provider>
}
export default ScrollViewWithViewportTracker;
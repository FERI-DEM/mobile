import {
    createContext,
    ReactNode,
    RefObject,
    useContext,
    useRef,
    useState
} from "react";
import {ViewportTrackerContext} from "./ScrollViewWithViewportTracker";
import {ScrollView, View} from "react-native";

export enum ViewportAwareViewMode {
    'START',
    'CENTER',
    'END'
}

interface ViewportAwareViewProps {
    children: ReactNode;
    mode?: ViewportAwareViewMode
}

export interface ViewportContextType {
    isInViewport: boolean;
}
export const ViewportContext = createContext<ViewportContextType>({
    isInViewport: false,
});

interface ParentRefType {
    current?: {
        measure: (callback: (fx: number, fy: number, width: number, height: number, px: number, py: number) => void) => void
    }
}


const ViewportAwareView = ({children, mode = ViewportAwareViewMode.END}: ViewportAwareViewProps) => {
    const {addScrollListener} = useContext(ViewportTrackerContext)
    const [isInViewport, setIsInViewport] = useState(false)
    const ref = useRef<View>(null)

    const onScroll = (parentRef: RefObject<ScrollView>) => {
        (parentRef as unknown as ParentRefType).current?.measure((parentX, parentY, parentWidth, parentHeight, parentPageX, parentPageY) => {
            ref.current?.measure((elementX, elementY, elementWidth, elementHeight, elementPageX, elementPageY) => {
                const parentBottom = parentPageY + parentHeight
                const elementBottom = elementPageY + elementHeight - 1

                if(mode === ViewportAwareViewMode.START) {
                    if(elementPageY < parentBottom) {
                        setIsInViewport(true)
                    }
                    else {
                        setIsInViewport(false)
                    }
                }
                else if(mode === ViewportAwareViewMode.CENTER) {
                    if(elementPageY + elementHeight / 2 < parentBottom) {
                        setIsInViewport(true)
                    }
                    else {
                        setIsInViewport(false)
                    }
                }
                else if(mode === ViewportAwareViewMode.END) {
                    if (elementBottom < parentBottom) {
                        setIsInViewport(true)
                    } else {
                        setIsInViewport(false)
                    }
                }
            })
        })
    }

    return <ViewportContext.Provider value={{isInViewport}}>
        <View ref={ref} onLayout={() => addScrollListener(onScroll)}>{children}</View>
    </ViewportContext.Provider>
}
export default ViewportAwareView;
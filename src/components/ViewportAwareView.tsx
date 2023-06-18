import {
    createContext,
    ReactNode,
    RefObject,
    useContext,
    useRef,
    useState
} from "react";
import {TodoContext} from "./ScrollViewWithViewportTracker";
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

export interface ViewportState {
    isInViewport: boolean;
}
export const ViewportContext = createContext<ViewportState>({
    isInViewport: false,
});

interface ParentRefType {
    current?: {
        measure: (callback: (fx: number, fy: number, width: number, height: number, px: number, py: number) => void) => void
    }
}


const ViewportAwareView = ({children, mode = ViewportAwareViewMode.END}: ViewportAwareViewProps) => {
    const {addScrollListener} = useContext(TodoContext)
    const [isInViewport, setIsInViewport] = useState(false)
    const ref = useRef<View>(null)

    const onScroll = (parentRef: RefObject<ScrollView>) => {
        (parentRef as unknown as ParentRefType).current?.measure((parentfx, parentfy, parentwidth, parentheight, parentpx, parentpy) => {
            ref.current?.measure((fx, fy, width, height, px, py) => {
                const parentBottom = parentpy + parentheight
                const elementBottom = py + height - 1

                if(mode === ViewportAwareViewMode.START) {
                    if(py < parentBottom) {
                        setIsInViewport(true)
                    }
                    else {
                        setIsInViewport(false)
                    }
                }
                else if(mode === ViewportAwareViewMode.CENTER) {
                    if(py + height / 2 < parentBottom) {
                        setIsInViewport(true)
                    }
                    else {
                        setIsInViewport(false)
                    }
                }
                else if(mode === ViewportAwareViewMode.END) {
                    if (elementBottom < parentBottom && elementBottom > parentpy) {
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
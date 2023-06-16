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

interface ViewportAwareViewProps {
    children: ReactNode;
    onInViewport?: () => void;
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

const ViewportAwareView = ({children, onInViewport}: ViewportAwareViewProps) => {
    const {addScrollListener} = useContext(TodoContext)
    const [isInViewport, setIsInViewport] = useState(false)
    const ref = useRef<View>(null)

    const onScroll = (parentRef: RefObject<ScrollView>) => {
        (parentRef as unknown as ParentRefType).current?.measure((parentfx, parentfy, parentwidth, parentheight, parentpx, parentpy) => {
            ref.current?.measure((fx, fy, width, height, px, py) => {
                const parentBottom = parentpy + parentheight
                const elementBottom = py + height
                if(elementBottom < parentBottom && elementBottom > parentpy) {
                    setIsInViewport(true)
                }
                else {
                    setIsInViewport(false)
                }
            })
        })
    }

    return <ViewportContext.Provider value={{isInViewport}}>
        <View ref={ref} onLayout={() => addScrollListener(onScroll)}>{children}</View>
    </ViewportContext.Provider>
}
export default ViewportAwareView;
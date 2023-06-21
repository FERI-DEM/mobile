import {createContext, ReactNode, RefObject, useRef, useState} from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export interface ViewportTrackerContextType {
  scrollListeners: Array<(parentRef: RefObject<ScrollView>) => void>;
  addScrollListener: (
    listener: (parentRef: RefObject<ScrollView>) => void
  ) => void;
}
export const ViewportTrackerContext = createContext<ViewportTrackerContextType>(
  {
    scrollListeners: [],
    addScrollListener: () => {},
  }
);

interface ScrollViewWithViewportTrackerProps extends ScrollViewProps {
  children: ReactNode;
  classNames?: string;
}

const ScrollViewWithViewportTracker = ({
  children,
  classNames,
  ...props
}: ScrollViewWithViewportTrackerProps) => {
  const [scrollListeners, setScrollListeners] = useState<
    ViewportTrackerContextType['scrollListeners']
  >([]);
  const ref = useRef<ScrollView>(null);
  const addScrollListener = (
    listener: (parentRef: RefObject<ScrollView>) => void
  ) => {
    setScrollListeners([...scrollListeners, listener]);
    listener(ref)
  };

  const notifyScrollListeners = () => {
    scrollListeners.forEach((listener) => listener(ref));
  };

  return (
    <ViewportTrackerContext.Provider
      value={{ scrollListeners, addScrollListener }}
    >
      <ScrollView
        {...props}
        nestedScrollEnabled
        ref={ref}
        className={twMerge('flex', classNames)}
        onScroll={notifyScrollListeners}
      >
        {children}
      </ScrollView>
    </ViewportTrackerContext.Provider>
  );
};
export default ScrollViewWithViewportTracker;

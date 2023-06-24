import { ReactNode } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

interface DataViewProps<T> {
  isLoading: boolean;
  data: T | undefined | null;
  children: (data: NonNullable<T>) => ReactNode;
  fallback?: ReactNode;
  fallbackText?: string;
  loadingComponent?: ReactNode;
  classNameLoadingContainer?: string;
  styleLoadingContainer?: StyleProp<ViewStyle>;
}

const DataView = <T,>({
  isLoading,
  loadingComponent,
  data,
  children,
  fallback,
  fallbackText,
  classNameLoadingContainer,
  styleLoadingContainer,
}: DataViewProps<T>) => {
  return (
    <>
      {isLoading
        ? loadingComponent ?? (
            <View
              className={twMerge(
                'flex-1 flex items-center justify-center',
                classNameLoadingContainer
              )}
              style={styleLoadingContainer}
            >
              <ActivityIndicator
                size={35}
                className="py-1.5 px-6"
                color="white"
              />
            </View>
          )
        : !data
        ? fallback ?? (
            <View className="flex-1 bg-light-main dark:bg-dark-main">
              <Text className="dark:text-white">
                {fallbackText || 'Ni podatkov'}
              </Text>
            </View>
          )
        : children(data)}
    </>
  );
};
export default DataView;

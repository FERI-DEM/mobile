import { ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import {useColorScheme} from "nativewind";

interface LoadingViewProps {
  loadingClassName?: string;
}
interface QueryBoundariesProps extends LoadingViewProps {
  children: ReactNode;
  isLoading?: boolean;
}
export const QueryBoundaries = ({
  children,
  loadingClassName,
  isLoading = true,
}: QueryBoundariesProps) => {
  if (isLoading) return <LoadingView loadingClassName={loadingClassName} />;

  return <>{children}</>;
};

const LoadingView = ({ loadingClassName }: LoadingViewProps) => {
  const {colorScheme} = useColorScheme()
  return <View
          className={twMerge(
              'h-full w-full flex items-center justify-center',
              loadingClassName
          )}
      >
        <ActivityIndicator color="white" size={35}/>
      </View>
};

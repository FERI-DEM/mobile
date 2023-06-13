import { ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

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

const LoadingView = ({ loadingClassName }: LoadingViewProps) => (
  <View
    className={twMerge(
      'h-full w-full flex items-center justify-center',
      loadingClassName
    )}
  >
    <ActivityIndicator color="white" size={35} />
  </View>
);

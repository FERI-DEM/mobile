import { ReactNode, Suspense } from 'react';
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
  isLoading = false,
}: QueryBoundariesProps) => {
  console.log(isLoading);
  if (isLoading) return <LoadingView loadingClassName={loadingClassName} />;

  return (
    <Suspense fallback={<LoadingView loadingClassName={loadingClassName} />}>
      {children}
    </Suspense>
  );
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

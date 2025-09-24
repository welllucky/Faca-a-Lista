import { NativeSafeAreaViewInstance, SafeAreaView as SafeAreaViewComponent, SafeAreaViewProps } from "react-native-safe-area-context";

export const SafeAreaView = (props: NativeSafeAreaViewInstance & SafeAreaViewProps) => {
  return <SafeAreaViewComponent {...props} />;
};

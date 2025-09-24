import { useTheme } from "@/presentation/hooks";
import { Image } from "expo-image";
import { useMemo } from "react";
import { Button, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createHeaderStyles } from "./Header.styles";
import { HeaderProps } from "./Header.types";
import { Logo } from "../Logo";
import { storage } from "@/core";

export const Header = (props: HeaderProps) => {
  const { layout, navigation, options, route, leftElement, rightElement } =
    props;

  const shouldShowLogo = leftElement?.type === "logo" || route?.name === "index";

  const shouldShowBackButton = leftElement?.type === "backButton";

  const backButtonLabel = route?.path || "Voltar";

  const backButtonCallback = () => {
    navigation?.goBack();
  };

  const insets = useSafeAreaInsets();

  const { setThemeMode, themeMode, theme } = useTheme();

  const styles = useMemo(
    () => createHeaderStyles(theme, insets),
    [theme, insets],
  );

  return (
    <View style={styles.container}>
      {shouldShowLogo && <Logo />}
      {shouldShowBackButton && (
        <Button
          title={backButtonLabel}
          onPress={backButtonCallback}></Button>
      )}
      <Button
        title={`change to ${themeMode === "light" ? "dark" : "light"}`}
        onPress={async () => {
          setThemeMode(themeMode === "light" ? "dark" : "light");
          await storage.set("themeMode", themeMode === "light" ? "dark" : "light");
        }}></Button>
    </View>
  );
};

import { darkTheme, lightTheme } from "@/presentation/themes";
import { Appearance } from "react-native";

export const getCurrentTheme = () => {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return theme;
};
import { Theme } from "@/presentation/themes";
import { StyleSheet } from "react-native";

export const createHomeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },

  text: {
    fontFamily: theme.typography.fontFamily.regular,
  },
});

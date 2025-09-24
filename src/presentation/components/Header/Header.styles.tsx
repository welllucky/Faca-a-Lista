import { Theme } from "@/presentation/themes";
import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

export const createHeaderStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      marginTop: insets.top,
      marginBottom: insets.bottom,
      marginRight: insets.right,
      marginLeft: insets.left,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.colors.background,
    },
  });

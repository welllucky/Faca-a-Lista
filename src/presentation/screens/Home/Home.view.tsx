import { useTheme } from "@/presentation/hooks";
import { SafeAreaView } from "@presentation/components";
import { useMemo } from "react";
import { Text } from "react-native";
import { createHomeStyles } from "./Home.styles";

export const HomeView = () => {
  const { themeMode, theme } = useTheme();
  const styles = useMemo(() => createHomeStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Faça a lista, que o resto da gente faz!</Text>
      <Text style={styles.text}>Tema: {themeMode}</Text>
    </SafeAreaView>
  );
};

import { SafeAreaView } from "@/presentation/components";
import { useTheme } from "@/presentation/hooks";
import { Link } from "expo-router";
import { Text } from "react-native";

export const ListsView = () => {
  const { themeMode, theme } = useTheme();
  return (
    <SafeAreaView>
      <Text>Lists</Text>
      <Link
        href={{
          pathname: "/lists/[id]",
          params: {
            id: "1",
          },
        }}>
        Create list
      </Link>
    </SafeAreaView>
  );
};

import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "@/presentation/hooks";
import { Header, Logo } from "@/presentation/components";

export default function ListsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Minhas listas",
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Listas",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhes da Lista",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Nova Lista",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

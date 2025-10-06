import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "@presentation/providers";
import { Appearance } from "react-native";
import { storage } from "@/core";
import { useEffect } from "react";

const isProduction = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: process.env["EXPO_PUBLIC_SENTRY_DSN"],
  sendDefaultPii: true,
  enableLogs: false,
  replaysSessionSampleRate: isProduction ? 1 : 0,
  replaysOnErrorSampleRate: isProduction ? 1 : 0,
  sampleRate: isProduction ? 1 : 0,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
    Sentry.reactNavigationIntegration({
      enableTimeToInitialDisplay: isRunningInExpoGo(),
    }),
  ],
  tracesSampleRate: isProduction ? 1 : 0,
  profilesSampleRate: isProduction ? 1 : 0,
  enableUserInteractionTracing: true,
  debug: false,
  enableAutoSessionTracking: true,
  enableCaptureFailedRequests: true,
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  spotlight: __DEV__,
  enabled: isProduction,
});

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

function RootLayout() {
  useEffect(() => {
    const setThemeMode = async () => {
      const themeMode = await storage.get("themeMode");
      if (themeMode) {
        Appearance.setColorScheme(themeMode);
      }
    };
    setThemeMode();
  }, []);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
export default Sentry.wrap(RootLayout);

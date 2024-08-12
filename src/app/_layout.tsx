import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="screens/mobileNumber"
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackground: () => (
            <View style={{ backgroundColor: "#1A1A1A", flex: 1 }} />
          ),
          headerTintColor: "#979797",
        }}
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

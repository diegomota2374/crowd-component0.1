import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent splash screen from auto-hiding while fonts are loading
SplashScreen.preventAutoHideAsync();

export const useFontsLoader = () => {
  const [fontsLoaded, error] = useFonts({
    "OpenSans-Regular": require("@/../../assets/fonts/static/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    // Hide the splash screen once fonts are loaded or if an error occurs
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // Optionally, you can return an error if you want to handle it in your component
  return { fontsLoaded, error };
};

export default useFontsLoader;

import CrowdLogoBox from "@/components/CrowdLogoBox/CrowdLogoBox";
import StartButton from "@/components/StartButton/StartButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <CrowdLogoBox />
        <StartButton
          title="Get Started"
          onPress={() => router.navigate("screens/mobileNumber")}
          style={styles.customButton}
          textStyle={styles.customButtonText}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(31, 142, 251)",
    height: "100%",
  },
  customButton: {
    position: "absolute",
    bottom: 50,
    width: 280,

    backgroundColor: "rgb(30, 136, 240)", // Custom button color
  },
  customButtonText: {
    fontSize: 20, // Custom text size
  },
});

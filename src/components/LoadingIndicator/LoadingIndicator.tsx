import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingIndicator: React.FC<{
  size?: "small" | "large";
  color?: string;
}> = ({ size = "small", color = "#fff" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingIndicator;

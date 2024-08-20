import { StyleSheet, Text, View } from "react-native";

const CrowdLogoBox = () => {
  return (
    <>
      <View style={styles.shadowWrapper} testID="shadowWrapper">
        <View style={styles.boxCrows} testID="boxCrows">
          <View style={styles.innerBox}>
            <Text style={styles.text}>Crowd</Text>
          </View>
        </View>
        <View style={styles.topLeftShadow} testID="topLeftShadow" />
      </View>
    </>
  );
};
export default CrowdLogoBox;

const styles = StyleSheet.create({
  shadowWrapper: {
    position: "relative",
  },
  boxCrows: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 180,
    borderRadius: 20,
    backgroundColor: "rgb(30, 136, 240)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
    zIndex: 2,
  },
  innerBox: {
    width: "80%",
    height: "80%",
    backgroundColor: "rgb(30, 136, 240)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  topLeftShadow: {
    position: "absolute",
    top: -2,
    left: -2,
    width: 180,
    height: 180,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "rgba(255, 255, 255, 1)",
    elevation: 5, // Cor mais clara para o efeito
    borderRadius: 20,
  },
});

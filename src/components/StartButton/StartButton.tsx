import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface StartButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const StartButton: React.FC<StartButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[styles.buttonText, textStyle]} testID="button">
          {`${title}      `}
          <AntDesign
            testID="arrow-icon"
            name="arrowright"
            size={24}
            color="#FFFFFF"
          />
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
  },
});

export default StartButton;

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.submitButton, style]} {...props}>
      <Text style={styles.submitTextButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000",
  },
  submitTextButton: {
    color: "#fff",
    fontSize: 20,
  },
});

export default PrimaryButton;

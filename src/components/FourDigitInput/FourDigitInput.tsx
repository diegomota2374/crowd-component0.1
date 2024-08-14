import { View, TextInput, StyleSheet, Text } from "react-native";
import { Controller } from "react-hook-form";
import useFourDigitInput from "@/hooks/useFourDigitInput ";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface FourDigitInputProps {
  errorMessage?: string; // Optional prop to receive error messages
}

const FourDigitInput: React.FC<FourDigitInputProps> = ({ errorMessage }) => {
  const { control, errors, inputs, handleChangeText } = useFourDigitInput();

  return (
    <Controller
      control={control}
      name="fourDigitCode"
      defaultValue={["", "", "", ""]}
      rules={{
        validate: (value) =>
          value.join("").length === 4 || "Please enter a valid code.",
      }}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {value.map((digit: string, index: number) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={[
                  styles.input,
                  errors.fourDigitCode ? styles.inputError : null,
                ]}
                value={digit}
                onChangeText={(text) =>
                  handleChangeText(text, index, onChange, value)
                }
                keyboardType="number-pad"
                maxLength={1}
                returnKeyType="next"
              />
            ))}
          </View>
          {getErrorMessage(errors, "fourDigitCode") ? (
            <Text style={styles.errorText}>
              {getErrorMessage(errors, "fourDigitCode")}
            </Text>
          ) : (
            errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 0,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 50,
    borderColor: "#DADADA",
    borderWidth: 0,
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: 28,
    color: "#FFFFFF",
  },
  inputError: {
    borderBottomColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default FourDigitInput;

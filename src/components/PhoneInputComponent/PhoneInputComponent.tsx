import React from "react";
import { Text, StyleSheet } from "react-native";
import PhoneInput, {
  ICountry as CountryType,
} from "react-native-international-phone-number";
import { usePhoneInput } from "@/hooks/usePhoneInput";

interface PhoneInputComponentProps {
  name: string;
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({ name }) => {
  const {
    value,
    error,
    selectedCountry,
    handleInputValue,
    handleSelectedCountry,
  } = usePhoneInput({ name });

  return (
    <>
      <PhoneInput
        value={value}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry as CountryType}
        onChangeSelectedCountry={handleSelectedCountry}
        placeholder=""
        theme="dark"
        phoneInputStyles={{
          container: {
            backgroundColor: "transparent",
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "#F3F3F3",
            width: "90%",
          },
          flagContainer: {
            backgroundColor: "transparent",
            justifyContent: "center",
          },
          flag: {},
          caret: {
            color: "#F3F3F3",
            fontSize: 16,
          },
          divider: {
            backgroundColor: "transparent",
          },
          input: {
            color: "#F3F3F3",
            borderBottomWidth: 1,
            borderStyle: "solid",
            borderColor: "#F3F3F3",
            paddingHorizontal: 0,
          },
        }}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
  },
  input: {
    color: "#F3F3F3",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#F3F3F3",
  },
});

export default PhoneInputComponent;

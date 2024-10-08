import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PhoneInput, {
  ICountry as CountryType,
} from "react-native-international-phone-number";
import { useController, useFormContext } from "react-hook-form";
import { Country } from "@/models/phoneNumber";

interface PhoneInputComponentProps {
  name: string;
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({ name }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { control } = useFormContext();
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
    rules: {
      required: "Phone number is required",
    },
  });

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleInputValue = (phoneNumber: string) => {
    onChange(phoneNumber);
  };

  const handleSelectedCountry = (country: Country) => {
    setSelectedCountry(country);
  };

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

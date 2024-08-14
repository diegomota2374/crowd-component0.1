import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Country } from "@/models/phoneNumber";

interface UsePhoneInputProps {
  name: string;
}

export const usePhoneInput = ({ name }: UsePhoneInputProps) => {
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
      validate: (value) => {
        // Remove void space
        const cleanedValue = value.replace(/\s+/g, "");
        return /^[+]?\d{7,16}$/.test(cleanedValue) || "Invalid phone number";
      },
    },
  });

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleInputValue = (phoneNumber: string) => {
    onChange(phoneNumber);
  };

  const handleSelectedCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  return {
    value,
    onBlur,
    error,
    selectedCountry,
    handleInputValue,
    handleSelectedCountry,
  };
};

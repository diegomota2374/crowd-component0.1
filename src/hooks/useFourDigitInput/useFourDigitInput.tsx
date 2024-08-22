import { useRef } from "react";
import { TextInput } from "react-native";
import { useFormContext } from "react-hook-form";

const useFourDigitInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (
    text: string,
    index: number,
    onChange: (value: string[]) => void,
    value: string[]
  ) => {
    if (/^\d$/.test(text) || text === "") {
      const newDigits = [...value];
      newDigits[index] = text;
      onChange(newDigits);

      // Automatically focus the next input if a digit is entered
      if (text !== "" && index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  return {
    control,
    errors,
    inputs,
    handleChangeText,
  };
};

export default useFourDigitInput;

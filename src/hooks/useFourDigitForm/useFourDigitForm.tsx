import { router } from "expo-router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  phoneNumber: string;
  fourDigitCode: string[];
}

const validDigitCode = "2222";

const useFourDigitForm = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      phoneNumber: "",
      fourDigitCode: ["", "", "", ""], // Initialize the form with an empty 4-digit code
    },
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const fourDigitCode = data.fourDigitCode.join(""); // Combine the array into a single string
    console.log("Submitted 4-digit code:", fourDigitCode);
    // Handle the form submission, e.g., send data to an API
    if (fourDigitCode === validDigitCode) {
      router.navigate("screens/userName/userName");
    } else {
      setErrorMessage("Invalid code. Please try again.");
    }
  };

  return {
    methods,
    onSubmit,
    errorMessage,
  };
};

export default useFourDigitForm;

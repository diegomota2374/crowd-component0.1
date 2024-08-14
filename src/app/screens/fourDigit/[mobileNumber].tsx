import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FormProvider } from "react-hook-form";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import FourDigitInput from "@/components/FourDigitInput/FourDigitInput";
import useMobileNumber from "@/hooks/useMobileNumber";
import useFourDigitForm from "@/hooks/useFourDigitForm";
import { router } from "expo-router";

const FourDigit: React.FC = () => {
  const mobileNumber = useMobileNumber(); // Get the mobile number
  const { methods, onSubmit, errorMessage } = useFourDigitForm(); // Get form methods and onSubmit handler

  return (
    <FormProvider {...methods}>
      <View style={style.container}>
        <View style={style.inputContent}>
          <Text style={style.title}>Enter the 4-digit code sent to you at</Text>
          <Text style={style.mobileNumber}>{`+${mobileNumber}`}</Text>
          <FourDigitInput errorMessage={errorMessage as string} />
          <TouchableOpacity
            onPress={() => router.navigate("screens/socialAccount")}
          >
            <Text style={style.resendCode}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        <View style={style.buttonContent}>
          <PrimaryButton
            title="Next"
            onPress={methods.handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <StatusBar style="light" />
    </FormProvider>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "#1A1A1A",
    height: "100%",
    padding: 30,
  },
  title: {
    fontSize: 25,
    color: "#fff",
  },
  inputContent: {
    gap: 25,
  },
  mobileNumber: {
    fontSize: 15,
    color: "#fff",
  },
  resendCode: {
    fontSize: 15,
    color: "#535AFF",
  },
  buttonContent: {
    width: "100%",
    marginBottom: 40,
    gap: 20,
  },
  text: {
    color: "#fff",
  },
});

export default FourDigit;

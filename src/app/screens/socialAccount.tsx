import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useForm, FormProvider } from "react-hook-form";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

const socialAccount: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
    // Handle the form submission, e.g., send data to an API
  };

  return (
    <FormProvider {...methods}>
      <View style={style.container}>
        <View style={style.inputContent}>
          <Text style={style.title}>Choose an account</Text>
          <Text style={style.text}>
            By clicking on a social option you may recieve an SMS for
            verification. Message and data rates may apply.
          </Text>
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
  socialButton: {
    fontSize: 20,
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

export default socialAccount;

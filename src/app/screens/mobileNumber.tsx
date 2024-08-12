import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import PhoneInputComponent from "@/components/PhoneInputComponent/PhoneInputComponent";
import AntDesign from "@expo/vector-icons/AntDesign";

const MobileNumber: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onBlur", // Trigger validation on blur
  });

  // Handler for form submission
  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
    // Handle the form submission, e.g., send data to an API
  };

  return (
    <FormProvider {...methods}>
      <View style={style.container}>
        <View style={style.inputContent}>
          <Text style={style.title}>Enter your mobile number</Text>
          <PhoneInputComponent name="phoneNumber" />
          <TouchableOpacity>
            <Text style={style.socialButton}>
              Or connect with social{"  "}
              <AntDesign name="arrowright" size={24} color="#535AFF" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.buttonContent}>
          <Text style={style.text}>
            By continuing you may recieve an SMS for verification. Message and
            data rates may apply.
          </Text>
          <TouchableOpacity
            style={style.submitButton}
            onPress={methods.handleSubmit(onSubmit)}
          >
            <Text style={style.submitTextButton}>Next</Text>
          </TouchableOpacity>
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
    marginBottom: 40,
    gap: 20,
  },
  text: {
    color: "#fff",
  },
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

export default MobileNumber;

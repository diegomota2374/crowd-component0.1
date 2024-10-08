import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import PhoneInputComponent from "@/components/PhoneInputComponent/PhoneInputComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { router } from "expo-router";

const MobileNumber: React.FC = () => {
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
          <Text style={style.title}>Enter your mobile number</Text>
          <PhoneInputComponent name="phoneNumber" />
          <TouchableOpacity
            onPress={() => router.navigate("screens/socialAccount")}
          >
            <Text style={style.socialButton}>
              Or connect with social{"  "}
              <AntDesign name="arrowright" size={24} color="#535AFF" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.buttonContent}>
          <Text style={style.text}>
            By continuing you may receive an SMS for verification. Message and
            data rates may apply.
          </Text>
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
    marginBottom: 40,
    gap: 20,
  },
  text: {
    color: "#fff",
  },
});

export default MobileNumber;

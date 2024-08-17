import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

const avatarUser: React.FC = () => {
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
          <FontAwesome name="user-circle" size={150} color="#C4C4C4" />
          <Text style={style.text}>
            By tapping the arrow below, you agree to Uber’s Terms of Use and
            acknowledge that you have read the Privacy Policy
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
    justifyContent: "center",
    alignItems: "center",
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

export default avatarUser;

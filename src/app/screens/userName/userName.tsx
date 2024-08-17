import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useForm, FormProvider, Controller } from "react-hook-form";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { submitUserData } from "@/hooks/useUser/useUser";
import { User } from "@/models/user";
import { useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import { router } from "expo-router";

const userName: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const methods = useForm<User>({
    defaultValues: {
      firstName: "",
      lastName: "",
      createdAt: new Date(),
      isActive: true,
    },
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: User) => {
    setLoading(true);
    const formData = {
      ...data,
      createdAt: new Date(),
      isActive: true,
    };
    console.log(formData);

    try {
      await submitUserData(formData);
      router.navigate("screens/avatarUser/avatarUser");
    } catch (error) {
      console.error("Failed to submit form data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={style.container}>
        <View style={style.topContent}>
          <Text style={style.title}>What’s your name?</Text>
          <View style={style.inputContent}>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: "First name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    style={style.input}
                    placeholder="First"
                    placeholderTextColor="#fff"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.firstName && (
                    <Text style={style.errorText}>
                      {errors.firstName.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              rules={{ required: "Last name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    style={style.input}
                    placeholder="Last"
                    placeholderTextColor="#fff"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.lastName && (
                    <Text style={style.errorText}>
                      {errors.lastName.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
        </View>
        <View style={style.buttonContent}>
          <PrimaryButton
            title={loading ? <LoadingIndicator /> : "Next"}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
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
  topContent: {
    gap: 25,
  },
  inputContent: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
    width: "100%",
  },
  input: {
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: 150,
    // flex: 1,
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
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default userName;

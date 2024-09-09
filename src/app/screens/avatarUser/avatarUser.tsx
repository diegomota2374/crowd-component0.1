import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm, FormProvider, Controller } from "react-hook-form";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { submitUserAvatarData } from "@/hooks/useUser/useUser";
import { router, useLocalSearchParams } from "expo-router";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import { UserAvatar } from "@/models/user";

// Definir o tipo correto para os parâmetros de URL

const AvatarUser: React.FC = () => {
  const { userId } = useLocalSearchParams();

  // Se o userId for uma string e precisar ser convertido para um número, use:

  // Garantindo que useForm está tipado corretamente
  const methods = useForm<UserAvatar>();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const onSubmit = async (data: UserAvatar) => {
    setLoading(true);

    // Validar userId e a URL da imagem antes de continuar
    if (!data.profileImageUrl || !userId) {
      console.error("Profile image or userId missing");
      return;
    }

    try {
      // Enviar o avatar do usuário usando o userId
      await submitUserAvatarData(userId as string, data.profileImageUrl);

      // Navegar após o sucesso
      router.push("screens/avatarUser/avatarUser");
    } catch (error) {
      console.error("Erro ao enviar o avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      if (selectedImage) {
        setImage(selectedImage);
        setValue("profileImageUrl", selectedImage, { shouldValidate: true });
      } else {
        Alert.alert("Erro ao selecionar a imagem", "Tente novamente.");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={style.container}>
        <View style={style.inputContent}>
          <Controller
            control={control}
            name="profileImageUrl"
            rules={{ required: "A Imagem é obrigatória" }}
            render={({ field: { value }, fieldState: { error } }) => (
              <>
                <TouchableOpacity onPress={pickImage}>
                  {value ? (
                    <Image source={{ uri: value }} style={style.avatar} />
                  ) : (
                    <FontAwesome
                      name="user-circle"
                      size={150}
                      color="#C4C4C4"
                    />
                  )}
                </TouchableOpacity>
                {error && <Text style={style.errorText}>{error.message}</Text>}
              </>
            )}
          />
          <Text style={style.text}>
            Ao tocar no botão abaixo, você concorda com os Termos de Uso e
            reconhece que leu a Política de Privacidade.
          </Text>
        </View>
        <View style={style.buttonContent}>
          <PrimaryButton
            title={loading ? <LoadingIndicator /> : "Next"}
            onPress={handleSubmit(onSubmit)}
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
  inputContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  buttonContent: {
    width: "100%",
    marginBottom: 40,
    gap: 20,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default AvatarUser;

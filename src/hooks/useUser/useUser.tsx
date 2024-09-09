import axios from "axios";
import { User, UserAvatar } from "@/models/user";
import { delay } from "@/utils/delay";

export const submitUserData = async (
  user: User,
  apiUrl: string = process.env.EXPO_PUBLIC_API_URL || "http://localhost"
) => {
  await delay(1000);

  try {
    const response = await axios.post(`${apiUrl}/users`, user);
    const { id, firstName, lastName } = response.data;
    console.log("id= ", id);
    return id;
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};

// Altere a função para receber FormData
export const submitUserAvatarData = async (
  userId: string,
  profileImageUrl: string,
  apiUrl: string = process.env.EXPO_PUBLIC_API_URL || "http://localhost"
) => {
  await delay(1000);

  const avatar = {
    profileImageUrl: profileImageUrl,
  };

  console.log("profileImageUrl= ", avatar);
  console.log("userId= ", userId);

  try {
    const response = await axios.patch(`${apiUrl}/users/${userId}`, avatar);
    console.log("Avatar enviado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar o avatar:", error);
  }
};

import axios from "axios";
import { User } from "@/models/user";
import { delay } from "@/utils/delay";

export const submitUserData = async (data: User) => {
  const urlApi = process.env.EXPO_PUBLIC_API_URL;

  await delay(1000);

  try {
    const response = await axios.post(`${urlApi}/users`, data);
    console.log("Submitted data:", response.data);
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};

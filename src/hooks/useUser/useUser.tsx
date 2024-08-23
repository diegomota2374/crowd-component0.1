import axios from "axios";
import { User } from "@/models/user";
import { delay } from "@/utils/delay";

export const submitUserData = async (
  user: User,
  apiUrl: string = process.env.EXPO_PUBLIC_API_URL || "http://localhost"
) => {
  await delay(1000);

  try {
    const response = await axios.post(`${apiUrl}/users`, user);
    console.log("Submitted data:", response.data);
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};

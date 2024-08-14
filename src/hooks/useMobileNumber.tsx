import { useLocalSearchParams } from "expo-router";

const useMobileNumber = () => {
  const { mobileNumber } = useLocalSearchParams<{ mobileNumber: string }>();
  return mobileNumber;
};

export default useMobileNumber;

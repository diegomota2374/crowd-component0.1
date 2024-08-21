import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, FormProvider } from "react-hook-form";
import { Country } from "@/models/phoneNumber";
import { usePhoneInput } from "../usePhoneInput";
import { waitFor } from "@testing-library/react-native";

interface WrapperProps {
  children: React.ReactNode;
}

const wrapper: React.FC<WrapperProps> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("usePhoneInput", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePhoneInput({ name: "test" }), {
      wrapper,
    });

    expect(result.current.value).toBe("");
    expect(result.current.error).toBe(undefined);
    expect(result.current.selectedCountry).toBeNull();
  });

  it("should update value on input change", () => {
    const { result } = renderHook(() => usePhoneInput({ name: "test" }), {
      wrapper,
    });

    act(() => {
      result.current.handleInputValue("1234567890");
    });

    expect(result.current.value).toBe("1234567890");
  });

  it("should handle country selection", async () => {
    const { result } = renderHook(() => usePhoneInput({ name: "test" }), {
      wrapper,
    });
    const mockCountry: Country = {
      cca2: "US",
      callingCode: "+1",
      name: { en: "United States" },
    };

    act(() => {
      result.current.handleSelectedCountry(mockCountry);
    });

    await waitFor(() => {
      expect(result.current.selectedCountry).toEqual(mockCountry);
    });
  });
});

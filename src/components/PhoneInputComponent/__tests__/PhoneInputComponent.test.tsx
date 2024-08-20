import { usePhoneInput } from "@/hooks/usePhoneInput";
import { fireEvent, render } from "@testing-library/react-native";
import PhoneInputComponent from "../PhoneInputComponent";

jest.mock("@/hooks/usePhoneInput");

describe("PhoneInputComponent", () => {
  const mockUsePhoneInput = usePhoneInput as jest.Mock;

  beforeEach(() => {
    mockUsePhoneInput.mockReturnValue({
      value: "",
      error: null,
      selectedCountry: { code: "BR", dialCode: "+1" },
      handleInputValue: jest.fn(),
      handleSelectedCountry: jest.fn(),
    });
  });

  it("renders correctly", () => {
    const { getByTestId } = render(<PhoneInputComponent name="phoneNumber" />);

    expect(getByTestId("phoneInput"));
  });

  it("displays the correct initial value and country,", () => {
    const { getByTestId } = render(<PhoneInputComponent name="phoneNumber" />);

    const input = getByTestId("phoneInput");

    expect(input.props.value).toBe("");
    expect(mockUsePhoneInput().selectedCountry).toEqual({
      code: "BR",
      dialCode: "+1",
    });
  });

  it("updates value on phone number change", () => {
    const handleInputValue = jest.fn();
    mockUsePhoneInput.mockReturnValueOnce({
      value: "",
      error: null,
      selectedCountry: { code: "BR", dialCode: "+1" },
      handleInputValue,
      handleSelectedCountry: jest.fn(),
    });

    const { getByTestId } = render(<PhoneInputComponent name="phoneNumber" />);

    const input = getByTestId("phoneInput");

    console.log(handleInputValue.mock.calls);

    fireEvent.changeText(input, "123456789");
    expect(handleInputValue).toHaveBeenCalledWith("123456789");
  });
});

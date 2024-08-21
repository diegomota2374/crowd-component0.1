import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { usePhoneInput } from "@/hooks/usePhoneInput/usePhoneInput";
import PhoneInputComponent from "../PhoneInputComponent";

jest.mock("@/hooks/usePhoneInput");

describe("PhoneInputComponent", () => {
  beforeEach(() => {
    (usePhoneInput as jest.Mock).mockImplementation(() => ({
      value: "",
      error: null,
      selectedCountry: null,
      handleInputValue: jest.fn(),
      handleSelectedCountry: jest.fn(),
    }));
  });

  it("renders without crashing", () => {
    const { getByTestId } = render(<PhoneInputComponent name="test" />);
    expect(getByTestId("phoneInput")).toBeTruthy();
  });

  it("displays error message when error exists", () => {
    (usePhoneInput as jest.Mock).mockReturnValue({
      value: "",
      error: { message: "Invalid phone number" },
      selectedCountry: null,
      handleInputValue: jest.fn(),
      handleSelectedCountry: jest.fn(),
    });

    const { getByText } = render(<PhoneInputComponent name="test" />);
    expect(getByText("Invalid phone number")).toBeTruthy();
  });
  //needs more attention, not is complete
  it("calls handleInputValue when phone number changes", () => {
    const handleInputValue = jest.fn();
    (usePhoneInput as jest.Mock).mockReturnValue({
      value: "",
      error: null,
      selectedCountry: null,
      handleInputValue,
      handleSelectedCountry: jest.fn(),
    });

    const { getByTestId } = render(<PhoneInputComponent name="test" />);
    fireEvent.changeText(getByTestId("phoneInput"), "1234567890");
    expect(handleInputValue).toHaveBeenCalled();
    expect(handleInputValue).toHaveBeenCalledTimes(2);
  });
});

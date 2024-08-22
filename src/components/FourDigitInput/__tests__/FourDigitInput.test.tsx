import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FourDigitInput from "../FourDigitInput";
import useFourDigitInput from "@/hooks/useFourDigitInput/useFourDigitInput";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useFormContext } from "react-hook-form";

// Mock the useFourDigitInput hook
jest.mock("@/hooks/useFourDigitInput");

// Mock the getErrorMessage function
jest.mock("@/utils/getErrorMessage");

// Mock react-hook-form
jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
  Controller: jest.fn(({ render }) =>
    render({
      field: {
        onChange: jest.fn(),
        value: ["", "", "", ""],
      },
    })
  ),
}));

const mockUseFourDigitInput = {
  control: {},
  errors: {},
  inputs: { current: [] },
  handleChangeText: jest.fn(),
};

describe("FourDigitInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFourDigitInput as jest.Mock).mockReturnValue(mockUseFourDigitInput);

    // Mock useFormContext to return the mocked control object
    (useFormContext as jest.Mock).mockReturnValue({
      control: mockUseFourDigitInput.control,
    });
  });

  it("renders correctly with no errors", () => {
    const { getAllByTestId, queryByText } = render(<FourDigitInput />);
    const inputs = getAllByTestId("TextInput");

    // Check if four TextInput elements are rendered
    expect(inputs.length).toBe(4);
    // Ensure no error message is displayed
    expect(queryByText("Please enter a valid code.")).toBeNull();
  });

  it("displays an error message when the code is invalid", () => {
    (getErrorMessage as jest.Mock).mockReturnValue(
      "Please enter a valid code."
    );
    mockUseFourDigitInput.errors = {
      fourDigitCode: { message: "Invalid code" },
    };

    const { getByText } = render(<FourDigitInput />);

    // Ensure the error message is displayed
    expect(getByText("Please enter a valid code.")).toBeTruthy();
  });

  it("handles text input correctly", () => {
    const { getAllByTestId } = render(<FourDigitInput />);
    const inputs = getAllByTestId("TextInput");

    // Simulate entering text into the first input
    fireEvent.changeText(inputs[0], "1");

    // Verify that handleChangeText was called correctly
    expect(mockUseFourDigitInput.handleChangeText).toHaveBeenCalledWith(
      "1",
      0,
      expect.any(Function),
      expect.any(Array)
    );
  });

  it("renders custom error message passed as prop", () => {
    (getErrorMessage as jest.Mock).mockReturnValue(null);

    const { getByText } = render(
      <FourDigitInput errorMessage="Custom error message" />
    );

    // Ensure the custom error message is displayed
    expect(getByText("Custom error message")).toBeTruthy();
  });
});

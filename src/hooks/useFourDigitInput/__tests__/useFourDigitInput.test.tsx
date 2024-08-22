import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, FormProvider } from "react-hook-form";
import React from "react";
import useFourDigitInput from "../useFourDigitInput";

// Mock the TextInput component and ensure focus method is a jest mock function
jest.mock("react-native", () => ({
  ...jest.requireActual("react-native"),
  TextInput: jest.fn().mockImplementation(() => ({
    focus: jest.fn(),
  })),
}));

interface WrapperProps {
  children: React.ReactNode;
}

// Wrapper component to provide form context
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("useFourDigitInput", () => {
  it("should update input values and focus next input when a digit is entered", () => {
    const { result } = renderHook(() => useFourDigitInput(), {
      wrapper: Wrapper,
    });

    // Initialize focus mocks for the inputs
    result.current.inputs.current = [
      { focus: jest.fn() } as any,
      { focus: jest.fn() } as any,
      { focus: jest.fn() } as any,
      { focus: jest.fn() } as any,
    ];

    // Simulate change text for the first input
    act(() => {
      result.current.handleChangeText(
        "1",
        0,
        (newDigits) => {
          expect(newDigits).toEqual(["1", "", "", ""]);
        },
        ["", "", "", ""]
      );
    });

    // Check if focus was moved to the next input
    const nextInput = result.current.inputs.current[1];
    if (nextInput) {
      expect(nextInput.focus).toHaveBeenCalled();
    } else {
      throw new Error("Next input is null");
    }
  });

  it("should not focus next input if index is 3", () => {
    const { result } = renderHook(() => useFourDigitInput(), {
      wrapper: Wrapper,
    });

    // Initialize focus mocks for the inputs
    result.current.inputs.current = [
      { focus: jest.fn() } as any,
      { focus: jest.fn() } as any,
      { focus: jest.fn() } as any,
      { focus: jest.fn() } as any,
    ];

    // Simulate change text for the last input
    act(() => {
      result.current.handleChangeText(
        "1",
        3,
        (newDigits) => {
          expect(newDigits).toEqual(["", "", "", "1"]);
        },
        ["", "", "", ""]
      );
    });

    // Check if focus was not moved
    const lastInput = result.current.inputs.current[3];
    if (lastInput) {
      expect(lastInput.focus).not.toHaveBeenCalled();
    } else {
      throw new Error("Last input is null");
    }
  });

  // Add more tests as needed
});

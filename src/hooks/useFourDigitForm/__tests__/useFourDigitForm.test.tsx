import { renderHook, act } from "@testing-library/react-hooks";
import { router } from "expo-router";
import useFourDigitForm from "../useFourDigitForm";

// Mock the router.navigate function
jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

describe("useFourDigitForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should navigate to the userName screen on valid code submission", () => {
    const { result } = renderHook(() => useFourDigitForm());

    // Set up form values and submit
    act(() => {
      result.current.methods.setValue("fourDigitCode", ["2", "2", "2", "2"]);
      result.current.onSubmit({
        phoneNumber: "1234567890",
        fourDigitCode: ["2", "2", "2", "2"],
      });
    });

    expect(router.navigate).toHaveBeenCalledWith("screens/userName/userName");
    expect(result.current.errorMessage).toBe(null);
  });

  it("should set error message on invalid code submission", () => {
    const { result } = renderHook(() => useFourDigitForm());

    // Set up form values and submit
    act(() => {
      result.current.methods.setValue("fourDigitCode", ["1", "2", "3", "4"]);
      result.current.onSubmit({
        phoneNumber: "1234567890",
        fourDigitCode: ["1", "2", "3", "4"],
      });
    });

    expect(router.navigate).not.toHaveBeenCalled();
    expect(result.current.errorMessage).toBe("Invalid code. Please try again.");
  });
});

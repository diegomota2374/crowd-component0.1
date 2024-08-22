// __tests__/useMobileNumber.test.js
import { renderHook } from "@testing-library/react-hooks";
import { useLocalSearchParams } from "expo-router";
import useMobileNumber from "../useMobileNumber";

// Mock the useLocalSearchParams hook
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

describe("useMobileNumber", () => {
  it("should return the mobileNumber from useLocalSearchParams", () => {
    // Arrange
    const mockMobileNumber = "1234567890";
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      mobileNumber: mockMobileNumber,
    });

    // Act
    const { result } = renderHook(() => useMobileNumber());

    // Assert
    expect(result.current).toBe(mockMobileNumber);
  });
});

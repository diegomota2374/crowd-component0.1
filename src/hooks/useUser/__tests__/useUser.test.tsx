import axios from "axios";
import { delay } from "@/utils/delay";
import { User } from "@/models/user";
import { submitUserData } from "../useUser";
import { load } from "@expo/env";

load(process.cwd());

// Mocking the dependencies
jest.mock("axios");
jest.mock("@/utils/delay");

describe("submitUserData", () => {
  const originalEnv = process.env;

  const mockUser: User = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    passwordHash: "hashedpassword123",
    createdAt: new Date("2023-01-01"),
    isActive: true,
    roles: ["admin"],
    profileImageUrl: "http://example.com/profile.jpg",
    updatedAt: new Date("2023-02-01"),
  };

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      EXPO_PUBLIC_API_URL: "http://example.com",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should have the correct API URL", () => {
    expect(process.env.EXPO_PUBLIC_API_URL).toBe("http://example.com");
  });

  it("should submit user data successfully", async () => {
    // Arrange
    const mockedResponse = { data: { success: true } };
    (axios.post as jest.Mock).mockResolvedValue(mockedResponse);
    (delay as jest.Mock).mockResolvedValue(Promise.resolve());

    // Act
    await submitUserData(mockUser);

    // Assert
    expect(delay).toHaveBeenCalledWith(1000);
    expect(axios.post).toHaveBeenCalledWith(
      "http://example.com/users",
      mockUser
    );
    expect(console.log).toHaveBeenCalledWith(
      "Submitted data:",
      mockedResponse.data
    );
  });

  it("should log an error if submission fails", async () => {
    // Arrange
    const mockedError = new Error("Network Error");
    (axios.post as jest.Mock).mockRejectedValue(mockedError);
    (delay as jest.Mock).mockResolvedValue(Promise.resolve());
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Act
    await submitUserData(mockUser);

    // Assert
    expect(delay).toHaveBeenCalledWith(1000);
    expect(axios.post).toHaveBeenCalledWith(
      "http://example.com/users",
      mockUser
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error submitting data:",
      mockedError
    );
  });
});

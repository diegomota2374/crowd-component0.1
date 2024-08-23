import axios from "axios";
import { delay } from "@/utils/delay";
import { User } from "@/models/user";
import { submitUserData } from "../useUser";

// Mocking de dependências
jest.mock("axios");
jest.mock("@/utils/delay");

describe("submitUserData", () => {
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

  const apiUrl = "http://example.com"; // URL fixa para os testes

  it("should have the correct API URL", () => {
    expect(apiUrl).toBe("http://example.com");
  });

  it("should submit user data successfully", async () => {
    // Arrange
    const mockedResponse = { data: { success: true } };
    (axios.post as jest.Mock).mockResolvedValue(mockedResponse);
    (delay as jest.Mock).mockResolvedValue(Promise.resolve());

    // Spy do console.log
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    // Act
    await submitUserData(mockUser, apiUrl);

    // Assert
    expect(delay).toHaveBeenCalledWith(1000);
    expect(axios.post).toHaveBeenCalledWith(`${apiUrl}/users`, mockUser);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Submitted data:",
      mockedResponse.data
    );

    // Limpar o spy
    consoleLogSpy.mockRestore();
  });

  it("should log an error if submission fails", async () => {
    // Arrange
    const mockedError = new Error("Network Error");
    (axios.post as jest.Mock).mockRejectedValue(mockedError);
    (delay as jest.Mock).mockResolvedValue(Promise.resolve());
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Act
    await submitUserData(mockUser, apiUrl);

    // Assert
    expect(delay).toHaveBeenCalledWith(1000);
    expect(axios.post).toHaveBeenCalledWith(`${apiUrl}/users`, mockUser);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error submitting data:",
      mockedError
    );

    // Limpar o spy
    consoleErrorSpy.mockRestore();
  });
});

import { render, screen } from "@testing-library/react-native";
import CrowdLogoBox from "../CrowdLogoBox";

describe("CrowdLogoBox", () => {
  it("renders correctly", () => {
    render(<CrowdLogoBox />);

    expect(screen.getByText("Crowd")).toBeTruthy();

    expect(screen.getByTestId("shadowWrapper")).toBeTruthy();

    expect(screen.getByTestId("boxCrows")).toBeTruthy();

    expect(screen.getByTestId("topLeftShadow")).toBeTruthy();
  });
});

import { render } from "@testing-library/react-native";
import LoadingIndicator from "../LoadingIndicator";

describe("LoadingIndicator", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<LoadingIndicator />);
    const activityIndicator = getByTestId("loading-indicator");

    expect(activityIndicator).toBeTruthy();
    expect(activityIndicator.props.size).toBe("small");
    expect(activityIndicator.props.color).toBe("#fff");
  });

  it("renders correctly with custom props", () => {
    const { getByTestId } = render(
      <LoadingIndicator size="large" color="#000" />
    );
    const activityIndicator = getByTestId("loading-indicator");

    expect(activityIndicator.props.size).toBe("large");
    expect(activityIndicator.props.color).toBe("#000");
  });
});

import { render, fireEvent } from "@testing-library/react-native";
import PrimaryButton from "../PrimaryButton";

describe("PrimaryButton", () => {
  it("renders the button with the correct title", () => {
    const { getByText } = render(<PrimaryButton title="Submit" />);
    const buttonTitle = getByText("Submit");
    expect(buttonTitle).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { backgroundColor: "#FF0000" };
    const { getByTestId } = render(
      <PrimaryButton title="Submit" style={customStyle} />
    );
    const button = getByTestId("Submit");

    expect(button.props.style).toMatchObject(
      expect.objectContaining({
        backgroundColor: "#FF0000",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      })
    );
  });

  it("handles press events", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="Submit" onPress={onPressMock} />
    );
    const button = getByText("Submit");

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

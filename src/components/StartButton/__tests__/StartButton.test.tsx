import { render, fireEvent } from "@testing-library/react-native";
import StartButton from "../StartButton";

describe("StartButton", () => {
  it("renders correctly with given title", () => {
    const { getByText } = render(
      <StartButton title="Start" onPress={() => {}} />
    );
    expect(getByText("Start")).toBeTruthy();
  });

  it("triggers the onPress event when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <StartButton title="Start" onPress={onPressMock} />
    );
    const button = getByText("Start");
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});

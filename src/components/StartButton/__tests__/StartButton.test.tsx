import { render, fireEvent } from "@testing-library/react-native";
import StartButton from "../StartButton";

describe("StartButton", () => {
  it("renders correctly with given title", () => {
    const { getByTestId } = render(
      <StartButton title="Start" onPress={() => {}} />
    );
    expect(getByTestId("startButton")).toBeTruthy();
  });

  it("triggers the onPress event when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <StartButton title="Start" onPress={onPressMock} />
    );
    const button = getByTestId("startButton");
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});

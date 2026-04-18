import { screen, render, fireEvent } from "@testing-library/react";
import CallButton from "../Components/CallButton/CallButton";
import "@testing-library/jest-dom";

describe("Call Button", () => {
  test("should render Call button", () => {
    render(<CallButton handleVideoCall={() => {}} />);
    const getCallButtonById = screen.getByTestId("call-button");
    expect(getCallButtonById).toBeInTheDocument();
  });

  test("Should Call video fn when clicking on the button", ()=> {
    const handleVideoCallMock = jest.fn()
    render(<CallButton handleVideoCall={handleVideoCallMock} />);
    const getVideoCallButton = screen.getByRole("button");

    // Check button presence
    expect(getVideoCallButton).toBeInTheDocument();

    fireEvent.click(getVideoCallButton)

    expect(handleVideoCallMock).toHaveBeenCalledTimes(1);

  })
});

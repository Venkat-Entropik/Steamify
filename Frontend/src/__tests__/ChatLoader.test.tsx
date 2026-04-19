import ChatLoader from "../Components/ChatLoader/ChatLoader";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ChatLoader", () => {
  test("Should render the chat loader component", () => {
    render(<ChatLoader />);
    expect(screen.getByTestId("chat-loader")).toBeInTheDocument();
    expect(screen.getByText("Connecting to chat...")).toBeInTheDocument();
  });
});

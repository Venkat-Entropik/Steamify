import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoNotificationsFound from "../Components/NoNotificationsFound/NoNotificationsFound";

describe("NoNotificationsFound component", () => {
  test("Should render No notifications Component", () => {
    render(<NoNotificationsFound />);
    expect(screen.getByTestId("no-notifications")).toBeInTheDocument();
    expect(screen.getByText("No notifications yet")).toBeInTheDocument();
    expect(
      screen.getByText(
        "When you receive friend requests or messages, they'll appear here.",
      ),
    ).toBeInTheDocument();
  });
});

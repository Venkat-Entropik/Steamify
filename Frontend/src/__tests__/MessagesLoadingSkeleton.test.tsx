import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import MessagesLoadingSkeleton from "../Components/MessagesLoadingSkeleton/MessagesLoadingSkeleton";

describe("Message Loading Skeleton", () => {
  test("Should render the skeleton component", () => {
    render(<MessagesLoadingSkeleton />);
    expect(screen.getByTestId("message-loading-skeleton")).toBeInTheDocument();
  });
});

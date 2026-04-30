import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import PageLoader from "../Components/Loader/PageLoader";

describe("PageLoader", () => {
  test("Should render the page", () => {
    render(<PageLoader />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

describe("PageNotFound Component", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );

  test("renders 404 text and main heading", () => {
    renderComponent();
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  test("renders the description text", () => {
    renderComponent();
    expect(
      screen.getByText(/Oops! The page you're looking for has vanished/i)
    ).toBeInTheDocument();
  });

  test("renders 'Go Home' link with correct attributes", () => {
    renderComponent();
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders 'Go Back' button", () => {
    renderComponent();
    const backButton = screen.getByRole("button", { name: /go back/i });
    expect(backButton).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

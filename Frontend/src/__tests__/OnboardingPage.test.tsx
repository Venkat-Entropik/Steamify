import { screen, render } from "@testing-library/react";
import OnboardingPage from "../pages/OnboardingPage/OnboardingPage";
import "@testing-library/jest-dom";
import { createTestQueryClient } from "./App.test";
import { QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

describe("Onboarding page component", () => {
  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
        <MemoryRouter>
      <OnboardingPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
  test("should onboarding page rendred", () => {
    const isGetByTextRendered = screen.getByText("Complete Your Profile");
    expect(isGetByTextRendered).toBeInTheDocument();
  });
});

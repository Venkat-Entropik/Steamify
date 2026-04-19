import { screen, render } from "@testing-library/react";
import OnboardingPage from "../pages/OnboardingPage/OnboardingPage";
import "@testing-library/jest-dom";
import { createTestQueryClient } from "./App.test";
import { QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

describe("Onboarding page component", () => {
  const queryClient = createTestQueryClient();
  
  test("should onboarding page rendred", () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <OnboardingPage />
        </QueryClientProvider>
      </MemoryRouter>
    );
    const isGetByTextRendered = screen.getByText("Complete Your Profile");
    expect(isGetByTextRendered).toBeInTheDocument();
  });
});

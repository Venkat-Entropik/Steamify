import { screen, render } from "@testing-library/react";
import OnboardingPage from "../pages/OnboardingPage/OnboardingPage";
import "@testing-library/jest-dom";
import { createTestQueryClient } from "./App.test";
import { QueryClientProvider } from "@tanstack/react-query";

describe("Onboarding page component", () => {
  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <OnboardingPage />
    </QueryClientProvider>,
  );
  test("should onboarding page rendred", () => {
    const isGetByTextRendered = screen.getByText("Complete Your Profile");
    expect(isGetByTextRendered).toBeInTheDocument();
  });
});

import SignUpPage from "../pages/SignupPage/SignupPage";
import { MemoryRouter } from "react-router";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

describe("test", () => {
  test("should component mount", () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
      </QueryClientProvider>
    );
    const isComponentedMounted = screen.getByTestId("signup");
    expect(isComponentedMounted).toBeInTheDocument();
  });

  test("Should all the form fields are rendered", () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
      </QueryClientProvider>
    );
    const fullNameInputPresnt = screen.getByPlaceholderText("John Doe");
    const emailInputPrensent = screen.getByPlaceholderText("Enter email");
    const passwordInputPrenset = screen.getByPlaceholderText("Enter password");
    const createAccountbtn = screen.getByRole("button", {
      name: /Create Account/i,
    });
    expect(fullNameInputPresnt).toBeInTheDocument();
    expect(emailInputPrensent).toBeInTheDocument();
    expect(passwordInputPrenset).toBeInTheDocument();
    expect(createAccountbtn).toBeInTheDocument();
  });

  test("Should show error state", async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
      </QueryClientProvider>
    );

    const emailInputPrensent = screen.getByPlaceholderText("Enter email");
    fireEvent.change(emailInputPrensent, { target: { value: "test" } });
    fireEvent.blur(emailInputPrensent);
    const isErrorMsgPresent = await screen.findByText(
      "Enter a valid email address"
    );
    const createAccountbtn = screen.getByRole("button", {
      name: /Create Account/i,
    });
    expect(createAccountbtn).toBeDisabled();
    expect(isErrorMsgPresent).toBeInTheDocument();
  });

  test("Should enable the submit button if all fields are entered", async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
      </QueryClientProvider>
    );
    const user = userEvent.setup();

    const fullNameInput = screen.getByPlaceholderText("John Doe");
    await user.type(fullNameInput, "test");
    await user.tab();

    const emailInput = screen.getByPlaceholderText("Enter email");
    await user.type(emailInput, "test@gmail.com");
    await user.tab();

    const passwordInput = screen.getByPlaceholderText("Enter password");
    await user.type(passwordInput, "1234567");
    await user.tab();

    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms/i,
    });
    await user.click(termsCheckbox);

    await waitFor(() => {
      expect(termsCheckbox).toBeChecked();
    });

    // Submit button should now be enabled
    const createAccountBtn = screen.getByRole("button", {
      name: /create account/i,
    });

    await waitFor(() => {
      expect(createAccountBtn).toBeEnabled();
    });
  });
});

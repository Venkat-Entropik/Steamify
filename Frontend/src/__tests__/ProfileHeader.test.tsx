import ProfileHeader from "../Components/ProfileHeader/ProfileHeader";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import useAuthUser from "../hooks/useAuthUser";
import { userMockData } from "../__mocks__/userMockJson";
import { BrowserRouter } from "react-router";

jest.mock("../hooks/useAuthUser");

describe("ProfileHeader", () => {
  test("Should render the component", () => {
    useAuthUser.mockReturnValue({
      isLoading: false,
      authData: {
        data: { ...userMockData },
      },
    });
    render(
      <BrowserRouter>
        <ProfileHeader />
      </BrowserRouter>,
    );
    expect(
      screen.getByRole("button", { name: "chat exit button" }),
    ).toBeInTheDocument();
  });
});

import HomePage from "../pages/HomePage/HomePage";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { data, MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTestQueryClient } from "./App.test";
import NotificationsPage from "../pages/NotificationPage/NotificationPage";
import usersServices from "../services/users.services";
import { friendCards } from "../__mocks__/friendsCardJson";

jest.mock("../services/users.services", () => ({
  getFriends: jest.fn(),
  getRecommendedUsers: jest.fn(),
  getOutGoingFriendRequest: jest.fn(),
  sendFriendRequest: jest.fn(),
}));

const mockUsers = [
  ...friendCards,
  {
    _id: "999",
    fullName: "Discover User",
    profilePic: "https://avatar.iran.liara.run/public/1.png",
    nativeLanguage: "English",
    learningLanguage: "Spanish",
    location: "USA",
    bio: "I am a front-end web developer",
  },
];

describe("HomePage Integration Test", () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    queryClient = createTestQueryClient();
    jest.clearAllMocks();

    (usersServices.getFriends as jest.Mock).mockResolvedValue({
      data: friendCards,
    });
    (usersServices.getRecommendedUsers as jest.Mock).mockResolvedValue({
      data: [mockUsers[2]],
    });
    (usersServices.getOutGoingFriendRequest as jest.Mock).mockRejectedValue({
      data: [],
    });
    (usersServices.sendFriendRequest as jest.Mock).mockRejectedValue({
      data: {},
    });
  });
  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  test("Should render the component", () => {
    renderComponent();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByText("Your Connections")).toBeInTheDocument();
  });

  test("Should rendirect to notofication page on click on the notifications button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
          <NotificationsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const notificationButton = screen.getByRole("link", {
      name: /notifications/i,
    });
    expect(notificationButton).toHaveAttribute("href", "/notifications");
    fireEvent.click(notificationButton);
    expect(screen.getByTestId("notifications")).toBeInTheDocument();
  });

  test("Should render the friends cards", async () => {
    renderComponent();
    const getFriendCards = await screen.findAllByTestId("friend-card");
    expect(getFriendCards).toHaveLength(2);
  });

  test("Should work the input", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Search by language...");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Venkat" } });
    expect(input).toHaveValue("Venkat")
  });

  test("Should render the new learners cards", async()=> {
    renderComponent();
    expect(await screen.findByText(mockUsers[2].bio)).toBeInTheDocument()
  })
  
});

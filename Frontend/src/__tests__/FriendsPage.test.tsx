import FriendsPage from "../pages/FriendsPage/FriendsPage";
import "@testing-library/react";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTestQueryClient } from "./App.test";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
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
    bio: "Hello world",
  },
];

describe("FriendsPage Integration Test", () => {
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
    (usersServices.getOutGoingFriendRequest as jest.Mock).mockResolvedValue({
      data: [],
    });
    (usersServices.sendFriendRequest as jest.Mock).mockResolvedValue({
      data: {},
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <FriendsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

  test("Should render the component and basic content", async () => {
    renderComponent();
    expect(screen.getByTestId("friends-page")).toBeInTheDocument();
    expect(screen.getByText(/Community/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search by name or language/i),
    ).toBeInTheDocument();
  });

  test("Should render friends list by default in 'My Friends' tab", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(friendCards[0].fullName)).toBeInTheDocument();
      expect(screen.getByText(friendCards[1].fullName)).toBeInTheDocument();
    });

    expect(screen.getByText(/My Friends/i)).toBeInTheDocument();
    // Badge check (friends list length is 2)
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("Should show empty state when no friends found", async () => {
    (usersServices.getFriends as jest.Mock).mockResolvedValue({ data: [] });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/No friends yet/i)).toBeInTheDocument();
    });
  });

  test("Should switch to 'Discover' tab and show recommendations", async () => {
    renderComponent();

    const discoverTab = screen.getByRole("button", { name: /Discover/i });
    fireEvent.click(discoverTab);

    await waitFor(() => {
      expect(screen.getByText("Discover User")).toBeInTheDocument();
    });

    expect(screen.getByText(/English/i)).toBeInTheDocument();
    expect(screen.getByText(/USA/i)).toBeInTheDocument();
  });

  test("Should filter friends based on search query in 'My Friends' tab", async () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText(
      /Search by name or language/i,
    );
    fireEvent.change(searchInput, {
      target: { value: friendCards[0].fullName },
    });

    await waitFor(() => {
      expect(screen.getByText(friendCards[0].fullName)).toBeInTheDocument();
      expect(
        screen.queryByText(friendCards[1].fullName),
      ).not.toBeInTheDocument();
    });
  });

  test("Should show 'no friends match' and allow clearing search", async () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText(
      /Search by name or language/i,
    );
    fireEvent.change(searchInput, { target: { value: "NonExistentUser" } });

    await waitFor(() => {
      expect(
        screen.getByText(/No friends found matching "NonExistentUser"/i),
      ).toBeInTheDocument();
    });

    const clearBtn = screen.getByText(/Clear search/i);
    fireEvent.click(clearBtn);

    await waitFor(() => {
      expect(screen.getByText(friendCards[0].fullName)).toBeInTheDocument();
      expect(searchInput).toHaveValue("");
    });
  });

  test("Should send friend request in 'Discover' tab", async () => {
    const user = userEvent.setup();
    renderComponent();

    const discoverTab = screen.getByRole("button", { name: /Discover/i });
    await user.click(discoverTab);

    const connectBtn = await screen.findByText(/Connect/i);
    await user.click(connectBtn);

    await waitFor(() => {
      expect(usersServices.sendFriendRequest).toHaveBeenCalled();
    });
  });

  test("Should show loading states while fetching data", async () => {
    // We don't resolve immediately to see loader
    let resolveFriends: unknown;
    const friendsPromise = new Promise((resolve) => {
      resolveFriends = resolve;
    });
    (usersServices.getFriends as jest.Mock).mockReturnValue(friendsPromise);

    renderComponent();

    expect(screen.getByText(/Loading your friends/i)).toBeInTheDocument();

    resolveFriends({ data: [] });
    await waitFor(() => {
      expect(
        screen.queryByText(/Loading your friends/i),
      ).not.toBeInTheDocument();
    });
  });

  test("Should handle search in Discover tab", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Discover/i }));

    const searchInput = screen.getByPlaceholderText(
      /Search by name or language/i,
    );
    fireEvent.change(searchInput, { target: { value: "Unknown" } });

    await waitFor(() => {
      expect(
        screen.getByText(/No one found matching "Unknown"/i),
      ).toBeInTheDocument();
    });
  });
});

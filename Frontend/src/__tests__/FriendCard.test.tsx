import { screen, render } from "@testing-library/react";
import "@testing-library/react";
import FriendCard from "../Components/FriendCard/FriendCard";
import { friendCards } from "../__mocks__/friendsCardJson";
import { BrowserRouter } from "react-router";

describe("FriendCard", () => {
  test("should render the friendCard compponent", () => {
    render(
      <BrowserRouter>
        <FriendCard friend={friendCards[0]} />
      </BrowserRouter>,
    );
    expect(screen.getByTestId("friend-card")).toBeInTheDocument();
  });

  test("Should render the content inside the card", ()=> {
    render(
      <BrowserRouter>
        <FriendCard friend={friendCards[0]} />
      </BrowserRouter>,
    );
    expect(screen.getByText("Venkata Ramana")).toBeInTheDocument();
    expect(screen.getByText(/Active now/i)).toBeInTheDocument();
    expect(screen.getByText("arabic")).toBeInTheDocument();
    expect(screen.getByText("hindi")).toBeInTheDocument();
    expect(screen.getByRole("link", {name: /chat button/i})).toBeInTheDocument()
  })

  test("Should have route id to redirect to the chat page", ()=> {
    render(
      <BrowserRouter>
        <FriendCard friend={friendCards[0]} />
      </BrowserRouter>,
    );
    const getMegBtn = screen.getByRole("link", {name: /chat button/i});
    expect(getMegBtn).toHaveAttribute("href", "/chat/1234");
  })
});

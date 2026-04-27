import ChatHeader from "../Components/ChatHeader/ChatHeader";
import { screen, render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSocketStore } from "../store/useSocketStore";
import { userMockData } from "../__mocks__/userMockJson";

describe("ChatHeader", () => {
  test("Should render the chat header component", () => {
    render(<ChatHeader />);
    act(() => {
      useSocketStore.setState({ selectedUser: userMockData });
    });
    expect(screen.getByTestId("chat-header")).toBeInTheDocument();
     const getImage = screen.getByAltText("Venkat");
    expect(getImage).toHaveAttribute("src", "dummy.png");
  });

  test("Should render the user name and status", () => {
    render(<ChatHeader />);
    act(() => {
      useSocketStore.setState({ selectedUser: userMockData });
    });
    expect(screen.getByText("Venkat")).toBeInTheDocument();
    expect(screen.getByText(/OFFLINE/i)).toBeInTheDocument();
  });

  test("Should render the user name and status as Online", () => {
    render(<ChatHeader />);
    act(() => {
      useSocketStore.setState({
        selectedUser: userMockData,
        onlineUsers: ["1234", "4567"],
      });
    });
    expect(screen.getByText("Venkat")).toBeInTheDocument();
    expect(screen.getByText(/ONLINE/i)).toBeInTheDocument();
  });

  test("Should render the user name and status as Online", () => {
    render(<ChatHeader />);
    act(() => {
      useSocketStore.setState({
        selectedUser: userMockData,
        onlineUsers: ["1234", "4567"],
      });
    });
    const getHeaderCloseBtn = screen.getByRole("button", {
      name: "close header",
    });
    expect(getHeaderCloseBtn).toBeInTheDocument();
    fireEvent.click(getHeaderCloseBtn);
    expect(getHeaderCloseBtn).not.toBeInTheDocument();
  });
});

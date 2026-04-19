import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import MessageInput from "../Components/MessageInput/MessageInput";

describe("message input", () => {
  test("Should render the message input", () => {
    render(<MessageInput />);
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  test("Should send btn disable by default", () => {
    render(<MessageInput />);
    const getsendBtn = screen.getByTestId("send-btn");
    expect(getsendBtn).toBeInTheDocument();
    expect(getsendBtn).toBeDisabled();
  });

  test("Should send btn enable when message entered in input", () => {
    render(<MessageInput />);
    const getInput = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(getInput, { target: { value: "Hello" } });
    const getsendBtn = screen.getByTestId("send-btn");
    expect(getsendBtn).toBeInTheDocument();
    expect(getsendBtn).not.toBeDisabled();
  });

  test("Should send message called after click on send icon", () => {
    render(<MessageInput />);
    const handleSubmitMock = jest.fn();
    screen.getByRole("form", { name: "submit-form" }).onsubmit =
      handleSubmitMock;
    const getInput = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(getInput, { target: { value: "Hello" } });
    const getsendBtn = screen.getByTestId("send-btn");
    fireEvent.click(getsendBtn);
    expect(handleSubmitMock).toHaveBeenCalled();
  });

  test("Should upload the image", async () => {
    render(<MessageInput />);
    const file = new File(["file"], "dummy-image.png", { type: "image/png" });
    const getUploadInput = screen.getByPlaceholderText("upload");
    fireEvent.change(getUploadInput, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByAltText(/Preview/i)).toBeInTheDocument();
    });
  });

  test("Should render the upload image", async () => {
    render(<MessageInput />);
    const file = new File(["file"], "dummy-image.png", { type: "image/png" });
    const getUploadInput = screen.getByPlaceholderText("upload");
    fireEvent.change(getUploadInput, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByAltText(/Preview/i)).toHaveAttribute(
        "src",
        "data:image/png;base64,ZmlsZQ==",
      );
    });
  });

 test("Should remove the image when clicking on the 'X' icon", async () => {
    render(<MessageInput />);
    const file = new File(["file"], "dummy-image.png", { type: "image/png" });
    
    const getUploadInput = screen.getByPlaceholderText("upload");
    fireEvent.change(getUploadInput, { target: { files: [file] } });

    const removeBtn = await screen.findByRole("button", { name: "remove-image" });

    fireEvent.click(removeBtn);
    expect(screen.queryByAltText(/Preview/i)).not.toBeInTheDocument();
});

});

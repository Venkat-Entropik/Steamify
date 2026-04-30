import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LanguageSelector from "../Components/LanguageSelector/LanguageSelector";

describe("LanguageSelector", () => {
  beforeEach(() => {
    render(<LanguageSelector />);
  });
  test("Should render the language icon button", () => {
    expect(
      screen.getByRole("button", { name: "change language" }),
    ).toBeInTheDocument();
  });

  test("Should open the popover on click on the button", () => {
    const getLanguageChangeButton = screen.getByRole("button", {
      name: "change language",
    });
    fireEvent.click(getLanguageChangeButton);
    expect(
      screen.getAllByRole("button", { name: "choose language" }),
    ).toHaveLength(5);
  });

  test("Should change the language when click on button", () => {
    const getLanguageChangeButton = screen.getByRole("button", {
      name: "change language",
    });
    fireEvent.click(getLanguageChangeButton);
    const getAllBtns = screen.getAllByRole("button", { name: "choose language" });
    fireEvent.click(getAllBtns[4])
    expect(localStorage.getItem("i18nextLng")).toBe("te")
  });
});

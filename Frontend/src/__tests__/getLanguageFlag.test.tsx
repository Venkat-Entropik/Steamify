import { getLanguageFlag } from "../Components/LanguageFlag/LanguageFlag";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("getLanguageFlag", () => {
  test("Should return null if country code is not passed as argument", () => {
    expect(getLanguageFlag()).toBeNull();
  });

  test("Should return country flag if country code is passed as argument", async () => {
    const getCountryFlagUrl = getLanguageFlag("hindi");

    render(getCountryFlagUrl);

    const img = screen.getByAltText(/hindi flag/i);

    expect(img).toHaveAttribute("src", "https://flagcdn.com/24x18/in.png");
  });
});

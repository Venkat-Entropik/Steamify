import BorderAnimatedContainer from "../Components/BorderAnimatedContainer/BorderAnimatedContainer";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("BorderAnimatimatedContai", () => {
  test("Should render the BorderAnimatedContainer", () => {
    const DummyComponent = () => {
      return <h1>Hello</h1>;
    };
    render(
      <BorderAnimatedContainer>
        <DummyComponent />
      </BorderAnimatedContainer>,
    );
    expect(screen.getByTestId("border-animation-container")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});

import ProfileAvatar from "../Components/ProfileAvatar/ProfileAvatar";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ProfileAvatar", () => {
  test("Should render the Profile pic icon", () => {
    render(<ProfileAvatar profilePic="dummypath.png" />);
    const getImage = screen.getByAltText("User profile");
    expect(getImage).toHaveAttribute("src", "dummypath.png");
  });

  test("Should render the avatar when the profile type as avatar", () => {
    const config = {
      sex: "man",
      faceColor: "#F9C9B6",
      earSize: "small",
      eyeStyle: "smile",
      noseStyle: "short",
      mouthStyle: "smile",
      shirtStyle: "hoody",
      glassesStyle: "none",
      hairColor: "#F48150",
      hairStyle: "normal",
      hatStyle: "none",
      hatColor: "#F48150",
      eyeBrowStyle: "up",
      shirtColor: "#F4D150",
      bgColor: "#6BD9E9",
    };
    const stringifyConfig = JSON.stringify(config);
    render(
      <ProfileAvatar profilePic={stringifyConfig} profilePicType="avatar" />,
    );
    expect(screen.getByTestId("profile-avatar")).toBeInTheDocument();
  });
});

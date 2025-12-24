import type { JSX } from "react";

export type route = {
  routeProps: {
    path: string;
    element: () => JSX.Element;
  };
  name: string;
};

export type ChatPageProps = {};

export type signUpPayloadType = {
  email: string;
  password: string;
  fullName: string;
};

export type loginPayloadType = {
  email: string;
  password: string;
};

export type onBoardingType = {
  fullName: string;
  bio: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
};

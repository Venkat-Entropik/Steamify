import { lazy } from "react";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const OnboardingPage = lazy(
  () => import("./pages/OnboardingPage/OnboardingPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const NotificationPage = lazy(
  () => import("./pages/NotificationPage/NotificationPage")
);
const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage"));
const CallPage = lazy(() => import("./pages/CallPage/CallPage"));
const FriendsPage = lazy(() => import("./pages/FriendsPage/FriendsPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));

export const routes = [
  {
    routeProps: {
      path: "/",
      element: HomePage,
    },
    name: "Home",
  },
  {
    routeProps: {
      path: "/signup",
      element: SignupPage,
    },
    name: "Signup",
  },
  {
    routeProps: {
      path: "/login",
      element: LoginPage,
    },
    name: "Login",
  },
  {
    routeProps: {
      path: "/notifications",
      element: NotificationPage,
    },
    name: "Notifications",
  },
  {
    routeProps: {
      path: "/chat/:id",
      element: ChatPage,
    },
    name: "Chat",
  },
  {
    routeProps: {
      path: "/call/:id",
      element: CallPage,
    },
    name: "Call",
  },
  {
    routeProps: {
      path: "/onboarding",
      element: OnboardingPage,
    },
    name: "Onboarding",
  },
  {
    routeProps: {
      path: "/welcome",
      element: WelcomePage,
    },
    name: "Welcome",
  },
  {
    routeProps: {
      path: "/friends",
      element: FriendsPage,
    },
    name: "Friends",
  },
  {
    routeProps: {
      path: "*",
      element: PageNotFound,
    },
    name: "404",
  },
];

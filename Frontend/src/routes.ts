import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import CallPage from "./pages/CallPage/CallPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";


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
            path: "/chat",
            element: ChatPage,
        },
        name: "Chat",
    },
    {
        routeProps: {
            path: "/call",
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
      path: '*',
      element: PageNotFound,
    },
    name: '404',
  },
]

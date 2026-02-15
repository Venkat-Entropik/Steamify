import { Suspense, type FC } from "react";
import { routes } from "./routes";
import { Navigate, Route, Routes } from "react-router";
import type { route, UserType } from "./types/streamify.types";
import ErrorBoundary from "./ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { nonAuthenticatedRoutes, sidebarNotRequiredPages } from "./utils/Static";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./Components/Layout/Layout";
import { useThemeStore } from "./store/useThemeStore";
import PageLoader from "./Components/Loader/PageLoader";



const App: FC = () => {
  const { isLoading, authData } = useAuthUser();
  const { theme } = useThemeStore()

  if (isLoading) {
    return <PageLoader />
  }

  const authUser: UserType | undefined = authData?.data?.user;
  const isAuthenticated: boolean = Boolean(authUser);
  const isOnboarded: boolean | undefined = authUser?.isOnBoarded;

  const getElement = (props: route) => {
    const Element = props.routeProps.element;

    if (nonAuthenticatedRoutes.includes(props.routeProps.path)) {
      return <Element />;
    }

    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    }

    if (!isOnboarded) {
      return <Navigate to={"/onboarding"} />;
    }

    return (
      <Layout showSidebar={!sidebarNotRequiredPages?.includes(props?.name)}>
        <Element />
      </Layout>
    );
  };

  return (
    <div className="h-screen" draggable={false} data-theme={theme}>
      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {routes.map((route: route) => {
              return (
                <Route
                  element={getElement(route)}
                  path={route.routeProps.path}
                  key={route.name}
                />
              );
            })}
          </Routes>
        </Suspense>
        <Toaster />
      </ErrorBoundary>
    </div>
  );
};

export default App;

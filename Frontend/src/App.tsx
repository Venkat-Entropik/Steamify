import { Suspense, type FC } from "react";
import { routes } from "./routes";
import { Navigate, Route, Routes } from "react-router";
import type { route, UserType } from "./types/streamify.types";
import ErrorBoundary from "./ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { nonAuthenticatedRoutes } from "./utils/Static";
import useAuthUser from "./hooks/useAuthUser";

interface AppProps {}

const App: FC<AppProps> = () => {
  const { isLoading, authData } = useAuthUser();

  const authUser: UserType | undefined = authData?.data?.user;

  const isAuthenticated: boolean = Boolean(authUser);
  const isOnboarder: boolean | undefined = authUser?.isOnBoarded;

  const getElement = (props: route) => {
    const Element = props.routeProps.element;

    if (nonAuthenticatedRoutes.includes(props.routeProps.path)) {
      return <Element />;
    }

    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    }

    if (!isOnboarder) {
      return <Navigate to={"/onboarding"} />;
    }

    return (
      <Element />
    );
  };

  return (
    <div className="h-screen" draggable={false}>
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

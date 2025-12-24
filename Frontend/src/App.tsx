import { Suspense, type FC } from "react";
import { routes } from "./routes";
import { Route, Routes } from "react-router";
import type { route } from "./types/streamify.types";
import ErrorBoundary from "./ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { apiInstance } from "./interceptor";

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <div className="h-screen">
      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {routes.map((route: route) => {
              const Element = route.routeProps.element;
              return (
                <Route
                  element={<Element />}
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

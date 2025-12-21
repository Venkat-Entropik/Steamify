import React from "react";
import { routes } from "./routes";
import { Route, Routes } from "react-router";
import type { route } from "./types/streamify.types";

const App = () => {
  return (
    <div className="h-screen">
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
    </div>
  );
};

export default App;

import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";
import { useState, type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  // Generate random Number from 0 to 300
  const [randomNumber] = useState(() => Math.floor(Math.random() * 300));

  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar getRandomNumber={randomNumber} />}

        <div className="flex-1 flex flex-col">
          <NavBar randomNumber={randomNumber} />

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
export default Layout;
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../NavBar/NavBar";

const Layout = ({ children, showSidebar = true }) => {
  // Generate random Number from 0 to 300

  const getRandomNumber: number = Math.floor(Math.random() * 300);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar getRandomNumber={getRandomNumber}/>}

        <div className="flex-1 flex flex-col">
          <NavBar randomNumber={getRandomNumber}/>

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
export default Layout;
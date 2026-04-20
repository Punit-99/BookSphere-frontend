import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <div className="flex-1 overflow-auto p-4 max-w-6xl mx-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

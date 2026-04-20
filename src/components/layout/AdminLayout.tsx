import { Outlet } from "react-router-dom";
import CommonSideBar from "@/components/common/CommonSideBar";
import Navbar from "./Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="h-screen flex w-full">
        {/* SIDEBAR */}
        <CommonSideBar />

        {/* RIGHT SIDE */}
        <div className="flex flex-1 flex-col">
          {/* NAVBAR */}
          <Navbar showSiteName={false} leftContent={<SidebarTrigger />} />

          {/* CONTENT */}
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

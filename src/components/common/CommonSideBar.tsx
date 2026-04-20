import { NavLink } from "react-router-dom";
import {
  ROLES,
  siteName,
  SUPERADMIN_SIDEBAR_MENU,
  ADMIN_SIDEBAR_MENU,
} from "@/lib/constant";

import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";

const CommonSideBar = () => {
  const { user } = useAuth();
  const menu =
    user?.role === ROLES.ADMIN ? ADMIN_SIDEBAR_MENU : SUPERADMIN_SIDEBAR_MENU;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="  py-4 border-b">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="h-8 w-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {siteName?.slice(0, 1)}
            </span>
          </div>

          {/* TEXT (HIDE ON COLLAPSE) */}
          <div className="flex flex-col leading-tight overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-foreground truncate">
              {siteName}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-2 py-2 rounded-md transition ${
                            isActive
                              ? "bg-muted font-medium"
                              : "hover:bg-muted/50"
                          }`
                        }
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CommonSideBar;

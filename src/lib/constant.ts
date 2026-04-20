import {
  LayoutDashboard,
  Film,
  Clapperboard,
  Building,
  UserStar,
} from "lucide-react";

export const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  USER: "user",
};

export const SUPERADMIN_SIDEBAR_MENU = [
  {
    label: "Admin List",
    path: "#",
    icon: UserStar,
  },
];

export const ADMIN_SIDEBAR_MENU = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Theatres",
    path: "/admin/theatres",
    icon: Building,
  },
  {
    label: "Movies",
    path: "/admin/movies",
    icon: Film,
  },
  {
    label: "Shows",
    path: "/admin/shows",
    icon: Clapperboard,
  },
];

export const siteName = "🎬BookSphere";

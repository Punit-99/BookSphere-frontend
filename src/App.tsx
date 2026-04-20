import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

import Unauthorized from "./pages/common/Unauthorized";
import BookingPage from "./pages/user/BookingPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";

import AuthProvider from "./providers/AuthProvider";

import RequireAuth from "./routes/RequireAuth";
import RoleGuard from "./routes/RoleGuard";
import RootRedirect from "./routes/RootRedirect";

import { ROLES } from "./lib/constant";

import MoviesPage from "./pages/admin/MoviesPage";
import TheatresPage from "./pages/admin/TheatresPage";
import ShowsPage from "./pages/admin/ShowsPage";
import PaymentFailed from "./pages/common/PaymentFailed";
import PaymentSuccess from "./pages/common/PaymentSuccess";
import MyBookingsPage from "./pages/user/MyBookingsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route element={<RequireAuth />}>
              <Route element={<RoleGuard allowedRoles={[ROLES.USER]} />}>
                <Route path="/book/:movieId" element={<BookingPage />} />
                <Route path="/my-bookings" element={<MyBookingsPage />} />
              </Route>
            </Route>
          </Route>

          {/* PAYMENT ROUTES */}
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentFailed />} />

          {/* ADMIN */}
          <Route element={<RequireAuth />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin">
                <Route index element={<AdminDashboard />} />
                <Route path="theatres" element={<TheatresPage />} />
                <Route path="movies" element={<MoviesPage />} />
                <Route path="shows" element={<ShowsPage />} />
              </Route>

              <Route path="/superadmin">
                <Route index element={<SuperAdminDashboard />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

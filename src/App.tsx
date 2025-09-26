import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyProfileLayout from "./components/templates/companyProfile";
import HomePages from "./components/pages/homePages";
import LoginPage from "./components/pages/loginPage";
import RegisterPage from "./components/pages/registerPage";
import CustomerView from "./components/templates/customerView";
import MenuPage from "./components/pages/customer/menuPage";
import ProtectedRoute from "./components/routes/protectedRoutes";
import useAuthStore from "./components/store/useAuthStore";
import CustomerLoginView from "./components/templates/customerLoginView";
import Reservasi from "./components/pages/customer/reservasi";
import { Toaster } from "sonner";
import PublicRoute from "./components/routes/publicRoutes";
import PromoPage from "./components/pages/customer/promo";
import FavoriteMenuPage from "./components/pages/customer/favoriteMenu";
import ProfilePage from "./components/pages/profile";
import HistoryOrderPage from "./components/pages/customer/historyOrder";
export default function App() {
  useAuthStore.getState().restore();
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<CompanyProfileLayout />}>
            <Route path="/" element={<HomePages />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<CustomerView />}>
            <Route path="/menu" element={<MenuPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<CustomerLoginView />}>
            <Route path="/menulogin" element={<MenuPage />} />
            <Route path="/reservasi" element={<Reservasi />} />
            <Route path="/promo" element={<PromoPage />} />
            <Route path="/favorit" element={<FavoriteMenuPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history-order" element={<HistoryOrderPage />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 Not Found</div>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

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
import HistoryReservasiPage from "./components/pages/customer/historyReservasi";
import HistoryPoinPage from "./components/pages/customer/historyPoin";
import FeedbackPage from "./components/pages/customer/feedback";
import KasirTemplate from "./components/templates/kasir";
import KasirPesananPage from "./components/pages/kasir/pesanan";
import KasirMenuPage from "./components/pages/kasir/menu";
import KasirReservasiPage from "./components/pages/kasir/reservasi";
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
            <Route path="/history-reservasi" element={<HistoryReservasiPage />} />
            <Route path="/history-poin" element={<HistoryPoinPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Route>

          <Route element={<KasirTemplate />}>
            <Route path="/kasir/pesanan" element={<KasirPesananPage />} />
            <Route path="/kasir/menu" element={<KasirMenuPage />} />
            <Route path="/kasir/reservasi" element={<KasirReservasiPage />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 Not Found</div>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

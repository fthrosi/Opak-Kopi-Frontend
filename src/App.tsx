import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyProfileLayout from "./components/templates/companyProfile";
import HomePages from "./components/pages/homePages";
import LoginPage from "./components/pages/loginPage";
import RegisterPage from "./components/pages/registerPage";
import CustomerView from "./components/templates/customerView";
import MenuPage from "./components/pages/customer/menuPage";
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
import TambahPesanan from "./components/pages/kasir/tambahPesanan";
import PesananOwnerPage from "./components/pages/owner/pesanan";
import ReservasiOwnerPage from "./components/pages/owner/reservasi";
import MenuOwnerPage from "./components/pages/owner/menu";
import PromoOwnerPage from "./components/pages/owner/promo";
import KritikSaranOwnerPage from "./components/pages/owner/kritikSaran";
import KategoriMenuOwnerPage from "./components/pages/owner/kategoriMenu";
import PenggunaOwnerPage from "./components/pages/owner/pengguna";
import LaporanOwnerPage from "./components/pages/owner/Laporan";
import Dashboard from "./components/pages/owner/dashboard";
import RoleBasedRoute from "./components/routes/roleBasedRoute";
import EmailPage from "./components/pages/emailResetPassword";
import OTPPage from "./components/pages/otp";
import PasswordPage from "./components/pages/password";
import ContactPage from "./components/pages/contact";
import useSocketStore from "./components/store/socketStore";
import { useEffect } from "react";

export default function App() {
  const {initSocket,disconnectSocket} = useSocketStore();
  const {isLoggedIn,isCheckingAuth} = useAuthStore();
  const {restore} = useAuthStore();

  useEffect(() => { 
    restore();
  }, [restore]);
  useEffect(() => {
    if (isCheckingAuth) {
      return;
    }
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        initSocket();
      }, 100);
      
      return () => {
        clearTimeout(timer);
      };
    } else {
      disconnectSocket();
    }
   
  }, [isLoggedIn, initSocket,disconnectSocket]);
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
            <Route path="/kontak" element={<ContactPage />} />
          </Route>
          <Route path="/email" element={<EmailPage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/password" element={<PasswordPage />} />
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={["Pelanggan"]} />}>
          <Route element={<CustomerLoginView />}>
            <Route path="/menulogin" element={<MenuPage />} />
            <Route path="/reservasi" element={<Reservasi />} />
            <Route path="/promo" element={<PromoPage />} />
            <Route path="/favorit" element={<FavoriteMenuPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history-order" element={<HistoryOrderPage />} />
            <Route
              path="/history-reservasi"
              element={<HistoryReservasiPage />}
            />
            <Route path="/history-poin" element={<HistoryPoinPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Route>
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={["Kasir"]} />}>
          <Route element={<KasirTemplate />}>
            <Route path="/kasir/pesanan" element={<KasirPesananPage />} />
            <Route path="/kasir/menu" element={<KasirMenuPage />} />
            <Route path="/kasir/reservasi" element={<KasirReservasiPage />} />
            <Route path="/kasir/tambah-pesanan" element={<TambahPesanan />} />
            <Route path="/kasir/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={["Kasir", "Owner"]} />}>
          <Route element={<KasirTemplate />}>
            <Route path="/staff/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={["Owner"]} />}>
          <Route element={<KasirTemplate />}>
            <Route path="/owner/pesanan" element={<PesananOwnerPage />} />
            <Route path="/owner/reservasi" element={<ReservasiOwnerPage />} />
            <Route path="/owner/menu" element={<MenuOwnerPage />} />
            <Route path="/owner/promo" element={<PromoOwnerPage />} />
            <Route
              path="/owner/kritik-saran"
              element={<KritikSaranOwnerPage />}
            />
            <Route path="/owner/kategori" element={<KategoriMenuOwnerPage />} />
            <Route path="/owner/pengguna" element={<PenggunaOwnerPage />} />
            <Route path="/owner/laporan" element={<LaporanOwnerPage />} />
            <Route path="/owner/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

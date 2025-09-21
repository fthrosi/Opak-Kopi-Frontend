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

export default function App() {
  useAuthStore.getState().restore();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CompanyProfileLayout />}>
          <Route path="/" element={<HomePages />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<CustomerView />}>
          <Route path="/menu" element={<MenuPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<CustomerLoginView />}>
            <Route path="/menulogin" element={<MenuPage />} />
            <Route path="/reservasi" element={<Reservasi />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

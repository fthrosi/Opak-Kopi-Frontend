import { BrowserRouter,Route,Routes } from "react-router-dom";
import CompanyProfileLayout from "./components/templates/companyProfile";
import HomePages from "./components/pages/homePages";
import LoginPage from "./components/pages/loginPage";
import RegisterPage from "./components/pages/registerPage";
import CustomerView from "./components/templates/customerView";
import MenuPage from "./components/pages/menuPage";

export default function App() {
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
                
            </Routes>
        </BrowserRouter>
    );
}
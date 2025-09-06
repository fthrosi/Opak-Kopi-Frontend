import { BrowserRouter,Route,Routes } from "react-router-dom";
import CompanyProfileLayout from "./components/templates/companyProfile";
import HomePages from "./components/pages/homePages";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<CompanyProfileLayout />}>
                    <Route path="/" element={<HomePages />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
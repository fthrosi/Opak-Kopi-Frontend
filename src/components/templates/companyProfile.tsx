import Navbar from "../organism/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../organism/footer";
export default function CompanyProfileLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

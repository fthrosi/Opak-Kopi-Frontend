import Navbar from "../organism/navbar";
import { Outlet } from "react-router-dom";

export default function CompanyProfileLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

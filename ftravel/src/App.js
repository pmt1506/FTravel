import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import Cart from "./screen/Cart";
import Detail from "./screen/Detail";
import Home from "./screen/Home";
import About from "./screen/About";
import AdminServices from "./screen/dashboard/AdminServices";
import Users from "./screen/dashboard/Users";
import Reports from "./screen/dashboard/Reports";
import Tour from "./screen/services/Tour";
import VendorList from "./screen/VendorList";
import VendorServices from "./screen/dashboard/vendor/VendorServices";
import UserDetail from "./screen/dashboard/UserDetail";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <NavbarComponent/> */}
      <Routes>
        {/* Customer*/}
        <Route path="/cart/:userID" element={<Cart />} />
        <Route path="/detail/:serviceID" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/vendor-list" element={<VendorList/>} />

        {/* For Admin - sua path cho phu hop */}
        <Route path="/admin/service" element={<AdminServices />} />
        <Route path="/admin/user" element={<Users />} />
        <Route path="/admin/user/detail" element={<UserDetail />} />
        <Route path="/admin/report" element={<Reports />} />

        {/* For Vendor - sua path cho phu hop */}
        <Route path="/vendor/service" element={<VendorServices />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

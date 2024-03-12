import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Detail from "./screen/commonScreen/Detail";

// import NavbarComponent from "./components/Navbar";
import Home from "./screen/commonScreen/Home";
import About from "./screen/commonScreen/About";
import Cart from "./screen//commonScreen/Cart";
import Footer from "./components/common/Footer";
import NavbarComponent from "./components/common/Navbar";
import AdminServices from "./screen/dashboard/AdminServices";
import Users from "./screen/dashboard/Users";
import Reports from "./screen/dashboard/Reports";
import Tour from "./screen/services/Tour";
import VendorList from "./screen/commonScreen/VendorList";
import VendorServices from "./screen/dashboard/vendor/VendorServices";
import UserDetail from "./screen/dashboard/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer*/}
        <Route path="/cart/:userID" element={<Cart />} />
        <Route path="/detail/:serviceID" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/vendor-list" element={<VendorList/>}/>

        {/* For Admin - sua path cho phu hop */}
        <Route path="/admin/service" element={<AdminServices />} />
        <Route path="/admin/user" element={<Users />} />
        <Route path="/admin/user/detail" element={<UserDetail />} />
        <Route path="/admin/report" element={<Reports />} />

        {/* For Vendor - sua path cho phu hop */}
        <Route path="/vendor/service" element={<VendorServices />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;

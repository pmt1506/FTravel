import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Detail from "./screen/commonScreen/Detail";

import Home from "./screen/commonScreen/Home";
import About from "./screen/commonScreen/About";
import Cart from "./screen//commonScreen/Cart";
import AdminServices from "./screen/dashboard/AdminServices";
import Users from "./screen/dashboard/Users";
import Reports from "./screen/dashboard/Reports";
import Tour from "./screen/services/Tour";
import Hotel from "./screen/services/Hotel";
import Event from "./screen/services/Event";
import VendorList from "./screen/commonScreen/VendorList";
import VendorServices from "./screen/dashboard/vendor/VendorServices";
import UserDetail from "./screen/dashboard/UserDetail";
import VendorAddService from "./screen/dashboard/vendor/VendorAddService";
import EditProfile from "./screen/dashboard/EditProfile";
import ChangePass from "./screen/dashboard/ChangePass";
import UserBill from "./screen/dashboard/userBill";
import AddService from "./screen/dashboard/vendor/AddService";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer*/}
        <Route path="/cart/" element={<Cart />} />
        <Route path="/detail/:serviceID" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Services */}
        <Route path="/tour" element={<Tour />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/event" element={<Event />} />
        <Route path="/vendor-list" element={<VendorList />} />

        {/* For Admin - sua path cho phu hop */}
        <Route path="/admin/service" element={<AdminServices />} />
        <Route path="/admin/user" element={<Users />} />
        {/* <Route path="/admin/user/detail" element={<UserDetail />} /> */}
        <Route path="/admin/report" element={<Reports />} />

        {/* For Vendor - sua path cho phu hop */}
        <Route path="/vendor/service" element={<VendorServices />} />
        <Route path="/vendor/add" element={<AddService />} />
        <Route path="/vendor/service/add" element={<VendorAddService />} />
        <Route path="/dashboard" element={<UserDetail />} />
        <Route path="/dashboard/bill" element={<UserBill />} />
        <Route path="/dashboard/profile/edit/" element={<EditProfile />} />
        <Route path="/dashboard/password/" element={<ChangePass />} />
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

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
import Services from "./screen/dashboard/Services";
import Users from "./screen/dashboard/Users";
import Reports from "./screen/dashboard/Reports";
import Tour from "./screen/services/Tour";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart/:userID" element={<Cart />} />
        <Route path="/detail/:serviceID" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Services */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/tour" element={<Tour />} />

        <Route path="/dashboard/service" element={<Services />} />
        <Route path="/dashboard/user" element={<Users />} />
        <Route path="/dashboard/report" element={<Reports />} />
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

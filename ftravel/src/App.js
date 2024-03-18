import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import Cart from "./screen/Cart";
import Detail from "./screen/Detail";
import Home from "./screen/Home";
import About from "./screen/About";
// import NavbarComponent from "./components/Navbar";
import Services from "./screen/dashboard/Services";
import Users from "./screen/dashboard/Users";
import Reports from "./screen/dashboard/Reports";
import Tour from "./screen/services/Tour";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <NavbarComponent/> */}
      <Routes>
        <Route path="/cart/:userID" element={<Cart />} />
        <Route path="/detail/:serviceID" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="" element />
        <Route path="" element />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Services */}
        <Route path="/tour" element={<Tour />} />
        <Route path="" element />

        <Route path="/dashboard/service" element={<Services />} />
        <Route path="/dashboard/user" element={<Users />} />
        <Route path="/dashboard/report" element={<Reports />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

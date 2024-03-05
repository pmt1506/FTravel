import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
import Footer from "./components/Footer";
// import NavbarComponent from "./components/Navbar";
import Home from "./screen/Home";
import About from "./screen/About";
import Cart from "./screen/Cart";
import Services from "./screen/dashboard/Services";
import Users from "./screen/dashboard/Users";
import Reports from "./screen/dashboard/Reports";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
     {/* <NavbarComponent/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="" element />
        <Route path="" element />

        <Route path="/dashboard/service" element={<Services/>} />
        <Route path="/dashboard/user" element={<Users/>} />
        <Route path="/dashboard/report" element={<Reports/>} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

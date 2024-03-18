import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import NavbarComponent from "./components/Navbar";
import Detail from "./screen/Detail";
// import NavbarComponent from "./components/Navbar";
import Home from "./screen/Home";
import About from "./screen/About";
import Cart from "./screen/Cart";
import Tour from "./screen/services/Tour";
import EditProfile from "./screen/dashboard/EditProfile";
import ChangePass from "./screen/dashboard/ChangePass";
import UserDetail from "./screen/dashboard/UserDetail";

function App() {
  return (
    <BrowserRouter>
      {/* <Header />
      <NavbarComponent/> */}
      <Routes>
        <Route path="/cart/:userID" element={<Cart />} />
        <Route path="/detail/:serviceID" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* <Services/> */}
        <Route path="/tour" element={<Tour />} />

        <Route path="/dashboard/:accID" element={<UserDetail />} />
        <Route path="/dashboard/profile/:accID" element={<EditProfile />} />
        <Route path="/dashboard/password/:accID" element={<ChangePass />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

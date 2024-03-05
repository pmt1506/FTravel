import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import Cart from "./screen/Cart";
import Detail from "./screen/Detail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavbarComponent />
      <Routes>
        <Route path="/cart/:userID" element={<Cart />} />
        <Route path="/detail/:serviceID" element={<Detail />} />
        <Route path="" element />
        <Route path="" element />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

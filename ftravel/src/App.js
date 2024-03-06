import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavbarComponent from "./components/Navbar";
<<<<<<< HEAD
import Cart from "./screen/Cart";
import Detail from "./screen/Detail";
=======
import Home from "./screen/Home";
import About from "./screen/About";
>>>>>>> main

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavbarComponent />
      <Routes>
<<<<<<< HEAD
        <Route path="/cart/:userID" element={<Cart />} />
        <Route path="/detail/:serviceID" element={<Detail />} />
=======
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
>>>>>>> main
        <Route path="" element />
        <Route path="" element />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

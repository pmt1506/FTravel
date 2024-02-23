import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import Home from "./screen/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="" element />
        <Route path="" element />
        <Route path="" element />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

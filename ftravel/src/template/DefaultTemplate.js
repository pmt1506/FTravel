import "../css/Dashboard.css";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import NavbarComponent from "../components/common/Navbar";

export default function DefaultTemplate({ children }) {
  return (
    <>
      <Header />
      <NavbarComponent />
      {children}
      <Footer />
    </>
  );
}

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <div className=" bg-[#2C3E50] text-white ">
      <section className=" mb-10 sticky top-0 z-50 bg-[#2C3E50] text-white ">
        <nav className="w-11/12 mx-auto sticky top-0 z-50 ">
          <Navbar />
        </nav>
      </section>
      <Outlet></Outlet>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;

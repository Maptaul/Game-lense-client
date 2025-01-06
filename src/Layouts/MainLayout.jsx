import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="space-y-6 flex flex-col min-h-screen bg-[#2C3E50] text-white">
      <section className="bg-[#2C3E50] text-white sticky top-0 z-50 ">
        <nav className="w-11/12 mx-auto sticky top-0 z-50 ">
          <Navbar />
        </nav>
      </section>

      <main className="w-11/12 mx-auto py-6 min-h-screen ">
        <Outlet />
      </main>

      <footer className="bg-[#2C3E50] text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;

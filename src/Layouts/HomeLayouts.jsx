import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import HighestRatedGames from "../components/HighestRatedGames ";
import Navbar from "../components/Navbar";
import NewReleases from "../components/NewReleases";
import Newsletter from "../components/Newsletter";
import TrendingGames from "../components/TrendingGames ";

const HomeLayouts = () => {
  return (
    <div className="space-y-6 bg-[#2C3E50] text-white ">
      {/* header  */}
      <section className="sticky top-0 z-50 bg-[#2C3E50] text-white ">
        <nav className=" mx-auto sticky top-0 z-50 ">
          <Navbar />
        </nav>
      </section>
      {/* Main  */}
      <main className="space-y-6 min-h-screen">
        {/* banner  */}
        <section className="w-11/12 mx-auto ">
          <Banner />
        </section>
        {/* Highest Rated Game Section */}
        <section className="w-11/12 mx-auto ">
          <HighestRatedGames />
        </section>
        <section className="w-11/12 mx-auto ">
          <TrendingGames />
        </section>
        <section className="w-11/12 mx-auto ">
          <NewReleases />
        </section>
        <section className="w-11/12 mx-auto ">
          <Newsletter />
        </section>
      </main>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default HomeLayouts;

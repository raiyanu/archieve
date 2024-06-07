import React from "react";
import Navbar from "../Components/Navbar";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../Components/HeroSection";
import Brands from "../Components/Brands";
import AboutMe from "../Components/AboutMe";
import Footer from "../Components/Footer";
document.getElementsByTagName("title")[0].text = " RayDev | Home ";

function Home() {
  return (
    <>
      <MainLayout>
        <Navbar />
        <HeroSection />
        {/* <Brands /> */}
        <AboutMe />
        <Footer />
      </MainLayout>
    </>
  );
}

export default Home;

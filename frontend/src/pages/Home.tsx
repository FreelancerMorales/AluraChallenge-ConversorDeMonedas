import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MainContainer from "../components/containers/MainContainer";
import Converter from "../components/Converter";

const Home = () => {
  return (
    <div className="main">
      <Header />
      <MainContainer children={<Converter />} />
      <Footer />
    </div>
  );
};

export default Home;

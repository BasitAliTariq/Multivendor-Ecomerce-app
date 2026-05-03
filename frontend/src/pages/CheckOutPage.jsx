import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Checkout from "../components/Checkout/Checkout.jsx";
import CheckoutSteps from "../components/Checkout/CheckoutSteps.jsx";

const CheckOutPage = () => {
  return (
    <div className=" bg-[#f5f5f5]">
      <Header />
      <br />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckOutPage;

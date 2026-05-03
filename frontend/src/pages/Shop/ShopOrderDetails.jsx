import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import Footer from "../../components/Layout/Footer";
import OrderDetails from "../../components/Shop/OrderDetails.jsx";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashBoardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;

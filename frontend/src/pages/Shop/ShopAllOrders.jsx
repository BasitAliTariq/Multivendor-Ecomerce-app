import React from "react";
import AllOrders from "../../components/Shop/AllOrders.jsx";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.jsx";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.jsx";

const ShopAllOrders = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className="w-full flex justify-between">
        <div className="w-20 md:w-[330px]">
          <DashBoardSideBar active={2} />
        </div>
        <div className="flex w-full justify-center">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;

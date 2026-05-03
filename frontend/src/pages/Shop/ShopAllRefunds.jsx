import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import AllRefundOrders from "../../components/Shop/AllRefundOrders.jsx";

const ShopAllRefunds = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className="w-full flex justify-between">
        <div className="w-20 md:w-[330px]">
          <DashBoardSideBar active={10} />
        </div>
        <div className="flex w-full justify-center">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;

import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import AllProducts from "../../components/Shop/AllProducts.jsx";

const ShopAllProducts = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className="flex justify-between w-full">
        <div className="w-20 md:w-[330px]">
          <DashBoardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex  ">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;

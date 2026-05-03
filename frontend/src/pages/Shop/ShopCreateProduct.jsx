import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import CreateProduct from "../../components/Shop/CreateProduct.jsx";

function ShopCreateProduct() {
  return (
    <div>
      <DashBoardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-20 md:w-[330px]">
          <DashBoardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex  ">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
}

export default ShopCreateProduct;

import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import CreateEvent from "../../components/Shop/CreateEvent.jsx";

const ShopCreateEvents = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-20 md:w-[330px]">
          <DashBoardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex  ">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvents;

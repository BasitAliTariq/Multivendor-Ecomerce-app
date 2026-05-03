import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.jsx";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.jsx";
import DashBpoardHero from "../../components/Shop/DashBpoardHero.jsx";

function ShopDashBoardPage() {
  return (
    <div>
      <DashBoardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-20 md:w-[330px]">
          <DashBoardSideBar active={1} />
        </div>
        <DashBpoardHero />
      </div>
    </div>
  );
}

export default ShopDashBoardPage;

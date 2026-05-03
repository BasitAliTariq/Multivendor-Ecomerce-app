import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
function DashBoardSideBar({ active }) {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll top-0 left-0 z-10  ">
      {/* Dashboartd  */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            className={`${active === 1 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            DashBoard
          </h5>
        </Link>
      </div>

      {/* all orders */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            className={`${active === 2 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Order
          </h5>
        </Link>
      </div>

      {/* All Products */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiPackage
            size={30}
            className={`${active === 3 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      {/* Create Product */}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            className={`${active === 4 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      {/* All Events */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            className={`${active === 5 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      {/* Create Event */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile
            size={30}
            className={`${active === 6 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      {/* withdraw money */}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            className={`${active === 7 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      {/* Shop Inbox  */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            className={`${active === 8 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>
      {/* Discount codes */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupouns" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            className={`${active === 9 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      {/* Order Refunds */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            className={`${active === 10 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 10 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      {/* Setings  */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            className={`${active === 11 ? "text-[crimson]" : "text-[#555]"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-normal ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
}

export default DashBoardSideBar;

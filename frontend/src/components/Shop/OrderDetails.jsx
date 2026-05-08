import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShopFun } from "../../redux/actions/order";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";

const OrderDetails = () => {
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersShopFun(seller._id));
  }, [dispatch]);

  const data = shopOrders && shopOrders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true },
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true },
      )
      .then((res) => {
        toast.success("Order updated!");
        dispatch(getAllOrdersShopFun(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      {/* order details and order list */}
      <div className="w-full flex items-center justify-between">
        {/* order details  */}
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="text-[25px] pl-2">Order Details</h1>
        </div>
        {/* Dashboard orders link */}
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} bg-[#fce1e6]! rounded-sm! text-[#e94560] font-semibold h-[45px]! text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>
      {/* Order id and plced on */}
      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            {/* Item image */}
            <img src={item.images?.[0]} alt="" className="w-[80x] h-20" />
            {/* item name , price and quantity */}
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}
      {/* Total price */}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      {/* Shipping address and payment info */}
      <div className="w-full md:flex items-center">
        {/* Shipping address */}
        <div className="w-full md:w-[60%]">
          <h4 className="pt-3 text-[20px] font-semibold">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        {/* Payment info */}
        <div className="w-full md:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      {/* Order status */}
      <h4 className="pt-3 text-[20px] font-semibold">Order Status:</h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status),
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
      {data?.status === "Processing refund" ||
      data?.status === "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {["Processing refund", "Refund Success"]
            .slice(
              ["Processing refund", "Refund Success"].indexOf(data?.status),
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}
      {/* update status button */}
      <div
        className={`${styles.button} mt-5 bg-[#FCE1E6]! rounded-sm! text-[#E94560] font-semibold h-[45px]! text-[18px]`}
        onClick={
          data?.status !== "Processing refund"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;

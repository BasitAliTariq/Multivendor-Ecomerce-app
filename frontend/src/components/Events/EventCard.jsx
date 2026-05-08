import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCartFunc } from "../../redux/actions/cart.js";

function EventCard({ active, data }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const addToCartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id == data._id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCartFunc(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img src={data.images?.[0]} alt="" />
      </div>
      <div className="w-full lg:w-[45%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between ">
          <div className="flex">
            <h5 className="font-medium text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-normal text-[17px] text-[#44a55e] ">
            120 sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-white`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-white ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;

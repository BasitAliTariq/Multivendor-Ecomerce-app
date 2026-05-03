import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { data, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToCartFunc, removeFromCartFun } from "../../redux/actions/cart";
import { toast } from "react-toastify";

function Cart({ setOpenCart }) {
  const { cart } = useSelector((state) => state.cart);
  const disptch = useDispatch();

  const removeFromCartHandler = (data) => {
    disptch(removeFromCartFun(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );

  const quantityChangeHandler = (data) => {
    disptch(addToCartFunc(data));
  };

  return (
    <div className="fixed inset-0 bg-[#0000004b] z-50">
      <div className="fixed top-0 right-0 h-screen w-[25%] bg-white flex flex-col justify-between shadow-sm ">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center ">
            <div className="w-full flex justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer "
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5> Cart Items is empty</h5>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto flex-1">
              <div className="flex w-full justify-end pt-5 pr-5 ">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Items length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-medium">
                  {cart && cart.length} items
                </h5>
              </div>
              {/* Cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      data={i}
                      key={index}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            {/* Check out button */}
            <div className="px-5 pb-3">
              <Link to="/check-out">
                <div
                  className={`h-[45px] flex items-center justify-center w-full bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-white text-[18px] font-medium">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={14} color="#fff" />
          </div>
          <span className="pl-2.5"> {data.qty} </span>
          <div
            className="bg-[#a7abb147] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer  "
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={14} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backend_url}/${data?.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-normal text-[15px] text-[#00000082]">
            ${data.discountPrice}*{value}
          </h4>
          <h4 className="font-medium text-[17px] pt-[3px] text-[#d02222] font-sans ">
            Us${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;

import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { data, Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlistFun } from "../../redux/actions/wishlist";
import { addToCartFunc } from "../../redux/actions/cart";
import { toast } from "react-toastify";

function WishList({ setOpenWishlist }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeWishlistHandler = (data) => {
    dispatch(removeFromWishlistFun(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCartFunc(newData));
    toast.success("Item added to cart successfully");
  };

  return (
    <div className="fixed inset-0 bg-[#0000004b] z-50">
      <div className="fixed top-0 right-0 h-screen w-[25%] bg-white flex flex-col justify-between shadow-sm ">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center ">
            <div className="w-full flex justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer "
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5> Wishlist Items is empty</h5>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto flex-1">
              <div className="flex w-full justify-end pt-5 pr-5 ">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Items length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-medium">
                  {wishlist && WishList.length} items
                </h5>
              </div>
              {/* Wishlist Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle
                      data={i}
                      key={index}
                      removeWishlistHandler={removeWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const CartSingle = ({ data, removeWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeWishlistHandler(data)}
        />
        <img
          src={data?.images?.[0]}
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          alt=""
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-medium text-[17px] pt-[3px] text-[#d02222] font-sans ">
            Us${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursour-pointer"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistFunc,
  removeFromWishlistFun,
} from "../../../redux/actions/wishlist.js";
import { addToCartFunc } from "../../../redux/actions/cart.js";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings.jsx";

function ProductCard({ data, isEvent }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlistFun(data));
  };
  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlistFunc(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already exists in cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCartFunc(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer ">
        <div className="flex justify-end"></div>
        {/* product image */}
        <Link
          to={
            isEvent
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
        >
          <img
            // src={data.image_Url[0]?.url}
            // src={`${data.images[0]?.url}`}
            src={data?.images?.[0]}
            alt="image"
            className="w-full h-[170px] object-cover rounded-sm"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          {/* shop name */}
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        {/* product name */}
        <Link
          to={
            isEvent
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
        >
          <h4 className="pb-3 font-medium">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          {/* five stars */}
          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>
          <div className="py-2 flex  items-center justify-between">
            <div className="flex">
              {/* discounted price */}
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.discountPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              {/* regular price */}
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + "$" : null}
              </h4>
            </div>
            <span className="font-normal text-[17px] text-[#68d274]">
              {data.sold_out} sold
            </span>
          </div>
        </Link>
        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={30}
              className="cursor-pointer absolute right-2 top-5 bg-white p-1 rounded-full shadow-md"
              onClick={() => removeFromWishListHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={30}
              className="cursor-pointer absolute right-2 top-5 bg-white p-1 rounded-full shadow-md"
              onClick={() => addToWishListHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={30}
            className="cursor-pointer absolute right-2 top-14 bg-white p-1 rounded-full shadow-md"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={30}
            className="cursor-pointer absolute right-2 top-24  bg-white p-1 rounded-full shadow-md"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to Cart"
          />
          {/* Make the details of card */}
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
}

export default ProductCard;

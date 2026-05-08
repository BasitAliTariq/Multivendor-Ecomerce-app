// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineMessage,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { Link } from "react-router-dom";

// function ProductDetails({ data }) {
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//   const [select, setSelect] = useState(0);
//   const navigate = useNavigate();

//   const incrementCount = () => {
//     setCount(count + 1);
//   };

//   const decrementCount = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };
//   const handleMessageSubmit = () => {
//     navigate("/inbox?conversation=507ebse6789");
//   };

//   return (
//     <div className="bg-white ">
//       {data ? (
//         <div className={`unset ${styles.section} w-[90%] md:w-[80%]`}>
//           <div className="w-full py-5">
//             <div className="block w-full md:flex">
//               {/* Left Side */}
//               <div className="w-full md:w-[50%]">
//                 <img
//                   src={data.image_Url[select].url}
//                   alt=""
//                   className="w-[80%]"
//                 />
//                 <div className="w-full flex">
//                   <div
//                     className={`${
//                       select === 0 ? "border" : "null"
//                     } cursor-pointer`}
//                   >
//                     <img
//                       src={data?.image_Url[0].url}
//                       alt=""
//                       className="h-[200px]"
//                       onClick={() => setSelect(0)}
//                     />
//                   </div>
//                   <div
//                     className={`${
//                       select === 1 ? "border" : "null"
//                     } cursor-pointer`}
//                   >
//                     <img
//                       src={data?.image_Url[1].url}
//                       alt=""
//                       className="h-[200px]"
//                       onClick={() => setSelect(1)}
//                     />
//                   </div>
//                 </div>
//               </div>
//               {/* Right Side */}
//               <div className="w-full md:w-[50%] pt-5">
//                 <h1 className={`${styles.productTitle}`}>{data.name}</h1>
//                 <p>{data.description}</p>
//                 <div className="flex pt-3">
//                   <h4 className={`${styles.productDiscountPrice}`}>
//                     {data.discount_price}$
//                   </h4>
//                   <h3 className={`${styles.price}`}>
//                     {data.price ? data.price + "$" : null}
//                   </h3>
//                 </div>
//                 <div className="flex items-center mt-12 justify-between pr-3">
//                   <div>
//                     <button
//                       onClick={decrementCount}
//                       className="bg-linear-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                     >
//                       -
//                     </button>
//                     <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
//                       {count}
//                     </span>
//                     <button
//                       onClick={incrementCount}
//                       className="bg-linear-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div>
//                     {click ? (
//                       <AiFillHeart
//                         size={30}
//                         className="cursor-pointer "
//                         onClick={() => setClick(!click)}
//                         color={click ? "red" : "#333"}
//                         title="Remove from wishlist"
//                       />
//                     ) : (
//                       <AiOutlineHeart
//                         size={30}
//                         className="cursor-pointer "
//                         onClick={() => setClick(!click)}
//                         color={click ? "red" : "#333"}
//                         title="Add to wishlist"
//                       />
//                     )}
//                   </div>
//                 </div>
//                 <div
//                   className={`${styles.button} mt-6 rounded-sm h-11 flex items-center`}
//                 >
//                   <span className="text-white flex items-center">
//                     Add to cart <AiOutlineShoppingCart className="ml-1" />
//                   </span>
//                 </div>
//                 {/* Shop logo */}
//                 <div className="flex items-center pt-8">
//                   <img
//                     src={data.shop.shop_avatar.url}
//                     alt=""
//                     className="w-[50px] h-[50px] rounded-full mr-2"
//                   />
//                   {/* shop name and ratings */}
//                   <div className="pr-8">
//                     <h3 className={`${styles.shop_name} pb-1 pt-1`}>
//                       {data.shop.name}
//                     </h3>
//                     <h5 className="pb-3 text-[15px]">
//                       ({data.shop.ratings}) Ratings
//                     </h5>
//                   </div>
//                   <div
//                     className={`${styles.button} bg-purple-600 mt-4 rounded! h-11!`}
//                     onClick={handleMessageSubmit}
//                   >
//                     <span className="text-white flex items-center">
//                       Send Message <AiOutlineMessage className="ml-1" />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ProductDetailsInfo data={data} />
//           <br />
//           <br />
//         </div>
//       ) : null}
//     </div>
//   );
// }

// const ProductDetailsInfo = ({ data }) => {
//   const [active, setActive] = useState(1);
//   return (
//     <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded">
//       <div className="w-full flex justify-between border-b pt-10 pb-2">
//         {/* Produc details heading */}
//         <div className="relative">
//           <h5
//             classname="text-bleck text-[18px] px-1 leading-5 font-medium cursor-pointer md:text-[20px]"
//             onClick={() => setActive(1)}
//           >
//             Product Details
//           </h5>
//           {active === 1 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//         {/* Produc reviews heading */}
//         <div className="relative">
//           <h5
//             classname="text-bleck text-[18px] px-1 leading-5 font-medium cursor-pointer md:text-[20px]"
//             onClick={() => setActive(2)}
//           >
//             Product Reviews
//           </h5>
//           {active === 2 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//         {/* Seller info heading heading */}
//         <div className="relative">
//           <h5
//             classname="text-bleck text-[18px] px-1 leading-5 font-medium cursor-pointer md:text-[20px]"
//             onClick={() => setActive(3)}
//           >
//             Seller information
//           </h5>
//           {active === 3 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//       </div>
//       {active === 1 ? (
//         <>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
//             voluptatibus et enim, numquam nostrum minima quibusdam ad beatae
//             voluptatum consectetur rem temporibus, at error obcaecati natus
//             facilis aspernatur unde modi?
//           </p>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
//             eveniet laudantium provident, expedita suscipit magni quisquam nemo
//             quibusdam laborum blanditiis, qui quae fugiat incidunt nihil optio.
//             Qui fugiat consequatur ullam.
//           </p>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
//             eveniet laudantium provident, expedita suscipit magni quisquam nemo
//             quibusdam laborum blanditiis, qui quae fugiat incidunt nihil optio.
//             Qui fugiat consequatur ullam.
//           </p>
//         </>
//       ) : null}
//       {active === 2 ? (
//         <div className="w-full justify-center min-h-[40vh] flex items-center">
//           <p>No Reviews Yet!</p>
//         </div>
//       ) : null}
//       {active === 3 ? (
//         <div className="w-full block md:flex py-5">
//           {/* Left side */}
//           <div className="w-full md:w-[50%]">
//             <div className="flex items-center">
//               <img
//                 src={data.shop.shop_avatar.url}
//                 alt=""
//                 className="w-[50px] h-[50px] rounded-full"
//               />
//               <div className="pl-3">
//                 <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
//                 <h5 className="pb-2 text-[15px]">
//                   ({data.shop.ratings}) Ratings
//                 </h5>
//               </div>
//             </div>
//             <p className="pt-2">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
//               inventore eius laudantium quisquam temporibus libero id pariatur
//               ipsam saepe laborum incidunt dolor perferendis sequi quam nostrum
//               mollitia adipisci, sed totam.
//             </p>
//           </div>
//           {/* Right Side */}
//           <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
//             <div className="text-left">
//               <h5 className="font-medium">
//                 Joined on:{" "}
//                 <span className="font-medium">3 December,2025 </span>{" "}
//               </h5>
//               <h5 className="font-medium pt-3">
//                 Total Products:{" "}
//                 <span className="font-medium">1,2333 </span>{" "}
//               </h5>
//               <h5 className="font-medium pt-3">
//                 Total Reviews: <span className="font-medium">45 </span>{" "}
//               </h5>
//               <Link to="/">
//                 <div
//                   className={`${styles.button} rounded-sm! h-[39.5px]! mt-3`}
//                 >
//                   <h4 className="text-white">Visit Shop</h4>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrroductShop } from "../../redux/actions/product";
import {
  addToWishlistFunc,
  removeFromWishlistFun,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCartFunc } from "../../redux/actions/cart";
import Ratings from "./Ratings";
import axios from "axios";

function ProductDetails({ data }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllPrroductShop(data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [dispatch, data, wishlist]);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

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
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCartFunc(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated == false) {
      toast.error("please login to send message");
      return;
    }

    const groupTitle = data.shop._id + user._id;
    const userId = user._id;
    const sellerId = data.shop._id;

    if (isAuthenticated) {
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("please login to continue");
    }
  };

  if (!data) return null;

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0,
    );

  const averageRating =
    totalReviewsLength > 0 ? totalRatings / totalReviewsLength : 0;

  return (
    <div className="bg-white">
      <div className={`unset ${styles.section} w-[90%] md:w-[80%]`}>
        <div className="w-full py-5">
          <div className="block w-full md:flex">
            {/* LEFT SIDE */}
            <div className="w-full md:w-[50%]">
              <img src={data?.images?.[select]} alt="" className="w-[80%]" />

              <div className="w-full flex gap-2 mt-3">
                {data?.images?.map((img, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer ${
                      select === index ? "border" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-[120px]"
                      onClick={() => setSelect(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-[50%] pt-5">
              <h1 className={styles.productTitle}>{data?.name}</h1>

              <p>{data?.description}</p>

              <div className="flex pt-3 gap-4">
                <h4 className={styles.productDiscountPrice}>
                  {data?.discountPrice}$
                </h4>

                {data?.originalPrice && (
                  <h3 className={styles.price}>{data.originalPrice}$</h3>
                )}
              </div>

              {/* QUANTITY + WISHLIST */}
              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    onClick={decrementCount}
                    className="bg-teal-500 text-white font-bold px-4 py-2"
                  >
                    -
                  </button>

                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                    {count}
                  </span>

                  <button
                    onClick={incrementCount}
                    className="bg-teal-500 text-white font-bold px-4 py-2"
                  >
                    +
                  </button>
                </div>

                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => removeFromWishListHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Remove from Wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishListHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Add to Wishlist"
                    />
                  )}
                </div>
              </div>

              {/* ADD TO CART */}
              <div
                className={`${styles.button} mt-6 rounded-sm h-11 flex items-center`}
                onClick={() => addToCartHandler(data._id)}
              >
                <span className="text-white flex items-center">
                  Add to cart
                  <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>

              {/* SHOP INFO */}
              <div className="flex items-center pt-8">
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={data?.shop?.avatar}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </Link>

                <div className="pr-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data?.shop?.name}
                    </h3>
                  </Link>

                  <h5 className="pb-3 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>

                <div
                  className={`${styles.button} bg-purple-600 mt-4 h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message
                    <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductDetailsInfo
          data={data}
          products={products}
          totalReviewsLength={totalReviewsLength}
          averageRating={averageRating}
        />
      </div>
    </div>
  );
}

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <h5 className="cursor-pointer" onClick={() => setActive(1)}>
          Product Details
        </h5>

        <h5 className="cursor-pointer" onClick={() => setActive(2)}>
          Product Reviews
        </h5>

        <h5 className="cursor-pointer" onClick={() => setActive(3)}>
          Seller Information
        </h5>
      </div>

      {active === 1 && (
        <p className="py-5 whitespace-pre-line">{data?.description}</p>
      )}

      {active == 2 ? (
        <div className="justify-center min-h-[40vh] flex flex-col items-center w-full overflow-y-scroll">
          {data &&
            (data.reviews
              ? data.reviews.map((item, index) => (
                  <div className="w-full flex my-2" key={index}>
                    <img
                      src={item.user.avatar}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <div className="pl-2 ">
                      <div className="w-full flex items-center">
                        <h1 className="font-medium mr-3">{item.user.name}</h1>
                        <Ratings rating={data?.ratings} />
                      </div>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                ))
              : null)}

          <div className="w-full flex justify-center">
            {data && data.reviews && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 ? (
        <div className="w-full block md:flex py-5">
          {/* Left side */}
          <div className="w-full md:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={data?.shop?.avatar}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          {/* Right Side */}
          <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-medium">
                Joined on:{" "}
                <span className="font-medium">
                  {data.shop?.createdAt?.slice(0, 10)}{" "}
                </span>{" "}
              </h5>
              <h5 className="font-medium pt-3">
                Total Products:{" "}
                <span className="font-medium">
                  {products && products.length}
                </span>{" "}
              </h5>
              <h5 className="font-medium pt-3">
                Total Reviews:{" "}
                <span className="font-medium">{totalReviewsLength} </span>{" "}
              </h5>
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div
                  className={`${styles.button} rounded-sm! h-[39.5px]! mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;

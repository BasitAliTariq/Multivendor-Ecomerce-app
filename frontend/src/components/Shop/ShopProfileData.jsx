// import React, { useEffect, useState } from "react";
// import { productData } from "../../static/data";
// import ProductCard from "../Route/ProductCard/ProductCard";
// import { Link, useParams } from "react-router-dom";
// import styles from "../../styles/styles";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPrroductShop } from "../../redux/actions/product";

// function ShopProfileData({ isOwner }) {
//   const [active, setActive] = useState(1);
//   const { products } = useSelector((state) => state.product);
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllPrroductShop(id));
//   }, [dispatch]);
//   return (
//     <div className="w-full">
//       {/* Shop products running events and shop reviews */}
//       <div className="flex w-full items-center justify-between">
//         <div className="w-full flex">
//           {/* Shop Products */}
//           <div className="flex items-center" onClick={() => setActive(1)}>
//             <h5
//               className={`font-medium text-[20px] ${
//                 active === 1 ? "text-red-500" : "text-[#333]"
//               } cursor-pointer pr-5`}
//             >
//               Shop Products
//             </h5>
//           </div>
//           {/* Running Events */}
//           <div className="flex items-center" onClick={() => setActive(2)}>
//             <h5
//               className={`font-medium text-[20px] ${
//                 active === 2 ? "text-red-500" : "text-[#333]"
//               } cursor-pointer pr-5`}
//             >
//               Running Events
//             </h5>
//           </div>
//           {/* Shop Reviews */}
//           <div className="flex items-center" onClick={() => setActive(3)}>
//             <h5
//               className={`font-medium text-[20px] ${
//                 active === 3 ? "text-red-500" : "text-[#333]"
//               } cursor-pointer pr-5`}
//             >
//               Shop Reviews
//             </h5>
//           </div>
//         </div>
//         <div>
//           {isOwner && (
//             <div>
//               <Link to="/dashboard">
//                 <div className={`${styles.button} rounded-smh-[42px]`}>
//                   <span className="text-white">Go DashBoard</span>
//                 </div>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       <br />
//       <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-5 mb-12  border-0  ">
//         {products &&
//           products.map((i, index) => (
//             <ProductCard data={i} key={index} isShop={true} />
//           ))}
//       </div>
//     </div>
//   );
// }

// export default ShopProfileData;

import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrroductShop } from "../../redux/actions/product";
import Ratings from "../products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const { events, isLoading } = useSelector((state) => state.event);
  console.log;

  const [active, setActive] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPrroductShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  console.log("allEvents: ", events);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-semibold ${
                active == 1 ? "text-red-500" : "text-[#333]"
              } text-[20px] cursor-pointer pr-5`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-ssemibold ${
                active == 2 ? "text-red-500" : "text-[#333]"
              }  text-[20px] cursor-pointer pr-5`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-semibold ${
                active == 3 ? "text-red-500" : "text-[#333]"
              }  text-[20px] cursor-pointer pr-5`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} rounded-sm! h-[42px]`}>
                  <span className="text-white"> Go to Dashboard </span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />

      {active === 1 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-5 mb-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-5 mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Events have for this shop!
            </h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4">
                <img
                  src={item.user.avatar}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-semibold pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-normal text-[#000000a7]">
                    {item?.comment}
                  </p>
                  <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;

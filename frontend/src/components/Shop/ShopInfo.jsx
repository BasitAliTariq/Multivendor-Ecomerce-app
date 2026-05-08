import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllPrroductShop } from "../../redux/actions/product";

function ShopInfo({ isOwner }) {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPrroductShop(id));
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, { withCredentials: true });
    navigate("/shop-login");
    window.location.reload();
  };
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
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={data.avatar}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-2.5 flex items-center  ">
          {data.description}
        </p>
      </div>
      {/* Address */}
      <div className="p-3">
        <h5 className="font-medium">Address</h5>
        <h4 className="text-[#000000a6]">{data.address}</h4>
      </div>
      {/* Phone Number */}
      <div className="p-3">
        <h5 className="font-medium">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
      </div>
      {/* Total Products */}
      <div className="p-3">
        <h5 className="font-medium">Total products</h5>
        <h4 className="text-[#000000a6]">{products && products.length}</h4>
      </div>
      {/* Shop Ratings */}
      <div className="p-3">
        <h5 className="font-medium">Shop Ratings</h5>
        <h4 className="text-[#000000a6]">{averageRating}/5</h4>
      </div>
      {/* Joined date */}
      <div className="p-3">
        <h5 className="font-medium">Joined On</h5>
        <h4 className="text-[#000000a6]">{data?.createdAt?.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          {/* Edit shop */}
          <Link to="/settings">
            <div
              className={`${styles.button} w-full! h-[42px]! rounded-[5px]!`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          {/* Logout */}
          <div className={`${styles.button} w-full! h-[42px]! rounded-[5px]!`}>
            <span className="text-white" onClick={logoutHandler}>
              Log Out
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopInfo;

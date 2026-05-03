import React from "react";
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ShopLoginPage() {
  const navigate = useNavigate();
  const { isSellerAuthenticated, isloading } = useSelector(
    (state) => state.seller
  );
  useEffect(() => {
    if (isSellerAuthenticated == true) {
      navigate(`/dashboard`, { replace: true });
    }
  }, [isloading, isSellerAuthenticated]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;

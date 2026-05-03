import React from "react";
import ShopCreate from "../components/Shop/ShopCreate.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function ShopCreatePage() {
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
      <ShopCreate />
    </div>
  );
}

export default ShopCreatePage;

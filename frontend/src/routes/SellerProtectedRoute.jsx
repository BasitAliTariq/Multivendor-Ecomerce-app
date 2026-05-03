import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isloading, isSellerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );
  if (isloading === true) {
    return <Loader />;
  }
  if (isloading === false) {
    if (!isSellerAuthenticated) {
      return <Navigate to={`/shop-login`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;

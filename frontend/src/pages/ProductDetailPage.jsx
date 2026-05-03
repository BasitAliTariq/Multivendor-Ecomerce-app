import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { productData } from "../static/data.jsx";
import SuggestedProduct from "../components/Products/SuggestedProduct .jsx";
import { useSelector } from "react-redux";

function ProductDetailPage() {
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents, isLoading } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const productData = allProducts?.find((i) => i._id === id);
      setData(productData);
    }
  }, [allProducts, id, allEvents]);

  return (
    <div>
      <Header />
      {data && <ProductDetails data={data} />}
      {/* <ProductDetails data={data} /> */}
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      {/* {data && <SuggestedProduct data={data} />} */}
      <Footer />
    </div>
  );
}

export default ProductDetailPage;

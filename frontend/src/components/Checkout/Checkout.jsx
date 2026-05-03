import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { City, Country } from "country-state-city";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [userInfo, setUserInfo] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const navigate = useNavigate();

  const paymentSubmit = () => {
    if (country === "" || city === "" || address1 === "" || zipCode === null) {
      toast.error("Please choose your delivery address");
    } else if (cart.length == 0) {
      toast.error("No items in cart");
    } else {
      const shippingAddress = {
        country,
        city,
        address1,
        address2,
        zipCode,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      //update local storage with latest ordered array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment", { state: { orderData } });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.discountPrice * item.qty,
    0,
  );

  // shipping charge will be 1 %
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;
    await axios
      .get(`${server}/coupon/get-coupon-value/${name}`)
      .then((res) => {
        //if coupon code exists then find the products whose shops provided the coupon code
        //and apply the coupon code on those products
        if (res.data.couponCode !== null) {
          const shopId = res.data.couponCode.shop._id;
          const couponValue = res.data.couponCode.value;

          const eligibleProductsForCoupon =
            cart && cart.filter((item) => item.shop._id === shopId);

          if (eligibleProductsForCoupon.length === 0) {
            toast.error("Coupon Code is not applicable for this shop");
            setCouponCode("");
          } else {
            const eligibleProductsPriceForCoupon =
              eligibleProductsForCoupon.reduce(
                (acc, item) => acc + item.discountPrice * item.qty,
                0,
              );
            toast.success("Coupon Code applied successfully");
            const discount =
              (eligibleProductsPriceForCoupon * couponValue) / 100;
            setDiscountPrice(discount);
            setCouponCodeData(res.data.couponCode);
            setCouponCode("");
          }
        }
        if (res.data.couponCode == null) {
          toast.error("Coupon Code does not exist");
          setCouponCode("");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setCouponCode("");
      });
  };

  const discountPercentage = couponCodeData ? discountPrice : 0;

  const totalPrice = couponCodeData
    ? subTotalPrice + shipping - discountPercentage
    : subTotalPrice + shipping;

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] block md:flex">
        {/* Left side shipping info */}
        <div className="w-full md:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            city={city}
            address1={address1}
            address2={address2}
            zipCode={zipCode}
            userInfo={userInfo}
            setCountry={setCountry}
            setCity={setCity}
            setAddress1={setAddress1}
            setAddress2={setAddress2}
            setZipCode={setZipCode}
            setUserInfo={setUserInfo}
          />
        </div>
        {/* Right sdide cart data */}
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <CartData
            subTotalPrice={subTotalPrice}
            shipping={shipping}
            discountPercentage={discountPercentage}
            totalPrice={totalPrice}
            couponCode={couponCode}
            handleSubmit={handleSubmit}
            setCouponCode={setCouponCode}
          />
        </div>
      </div>
      {/* Payment button */}
      <div
        className={`${styles.button} w-[150px] md:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  city,
  address1,
  address2,
  zipCode,
  userInfo,
  setCountry,
  setCity,
  setAddress1,
  setAddress2,
  setZipCode,
  setUserInfo,
}) => {
  return (
    <div className="w-full md:w-[95%] bg-white p-5 rounded-md pb-8 shadow-xl">
      <h5 className="text-[18px] font-medium">Shipping Address</h5>
      <br />
      <form>
        {/* name and email */}
        <div className="flex w-full pb-3 gap-4">
          {/* name */}
          <div className="w-[50%]">
            <label className="pb-2 block">Full Name</label>
            <input
              type="text"
              required
              value={user && user.name}
              className={`${styles.input} w-[95%]`}
            />
          </div>
          {/* email */}
          <div className="w-[50%]">
            <label className="pb-2 block">Email</label>
            <input
              type="email"
              required
              value={user && user.email}
              className={`${styles.input}`}
            />
          </div>
        </div>

        {/* Phone number and zip code */}
        <div className="flex w-full pb-3 gap-4">
          {/* phone number */}
          <div className="w-[50%]">
            <label className="pb-2 block">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} w-[95%]`}
            />
          </div>
          {/* zip code */}
          <div className="w-[50%]">
            <label className="pb-2 block">Zip Code</label>
            <input
              type="number"
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={`${styles.input}`}
            />
          </div>
        </div>
        {/* Country and city */}
        <div className="w-full flex pb-3">
          {/* Country */}
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-10 rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {/* City */}
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-[95%] border h-10 rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {City &&
                City.getCitiesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Address 1 and Adress 2 */}
        <div className="w-full flex pb-3 gap-4">
          {/* Address 1 */}
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} w-[95%]`}
            />
          </div>
          {/* Address 2 */}
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div></div>
      </form>
      <br />
      <h5
        className="text-[18px] inline-block cursor-pointer"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose from saved address
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-2" key={index}>
                <input
                  type="radio"
                  className="mr-3"
                  name="saved-address"
                  value={item.addressType}
                  onChange={() => {
                    (setCountry(item.country),
                      setCity(item.city),
                      setAddress1(item.address1),
                      setAddress2(item.address2),
                      setZipCode(item.zipCode));
                  }}
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  subTotalPrice,
  shipping,
  discountPercentage,
  totalPrice,
  couponCode,
  setCouponCode,
  handleSubmit,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 pb-8 shadow-xl">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-normal text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-semibold">{subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-normal text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-semibold">{shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-normal text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-semibold">
          {discountPercentage ? "$" + discountPercentage.toString() : "$0.00"}
        </h5>
      </div>
      <h5 className="text-[18px] font-semibold text-end pt-3">
        {totalPrice.toFixed(2)}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-10 pl-2`}
          placeholder="Coupoun code"
          onChange={(event) => setCouponCode(event.target.value)}
          required
        />
        <input
          className={`w-full h-10 border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;

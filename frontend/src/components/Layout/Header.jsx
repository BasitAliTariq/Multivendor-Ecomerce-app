import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { productData, categoriesData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart.jsx";
import WishList from "../WishList/WishList.jsx";
import { RxCross1 } from "react-icons/rx";

function Header({ activeHeaduing }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSellerAuthenticated } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase()),
      );
    setSearchData(filteredProducts);
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        {/* top bar */}
        <div className="hidden md:flex items-center justify-between py-4">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>
          {/* Search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product.."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[45px] w-full px-2 border-[#3957db] border-[3px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-9 p-4">
                {searchData &&
                  searchData.map((i) => {
                    return (
                      <Link to={`/product/${i._id}`} key={i._id}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={i.images?.[0]}
                            alt="product pic"
                            className="w-[45px] h-[45px] mr-2.5 "
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-white flex items-center">
                {isSellerAuthenticated ? "Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
        {/* navbar */}
      </div>
      <div
        className={`${
          active == true ? "shadow-sm  fixed top-0 left-0 z-10" : null
        } transition hidden md:flex items-center justify-between w-full bg-[#3321ca] h-[70px] `}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Catagories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-2.5 w-[270px] hidden md:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-medium select-none rounded-t-md `}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* Nav Items */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeaduing} />
          </div>
          {/* Rignt side */}
          <div className="flex">
            {/* heart */}
            <div
              className={`${styles.noramlFlex}`}
              onClick={() => setOpenWishlist(true)}
            >
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 /83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight  text-center   ">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            {/* Shopping cart */}
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 /83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight  text-center   ">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            {/* profile picture */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    {
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                    }
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 /83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* openCart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* Wish list popup */}
            {openWishlist ? (
              <WishList setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      {/* Mobile header */}
      <div className="w-full h-[60px] fixed bg-white z-50 top-0 lef-0 shadow-sm md:hidden">
        <div className="w-full flex items-center justify-between">
          {/*  */}
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          {/* Cart Icon */}
          <div>
            <div className="relative mr-5">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight  text-center   ">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>
        {/* Header sidebar popup */}
        {open && (
          <div
            className={`${
              active == true ? "shadow-sm  fixed top-0 left-0 z-10" : null
            }fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
              {/* Heart icon and Closing cross icon */}
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15-px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight  text-center   ">
                      0
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              {/* Search Bar */}
              <div className="my-8 w-[92%] m-auto h-10 relative">
                <input
                  type="text"
                  placeholder="Search Product.."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[45px] w-full px-2 border-[#3957db] border-[3px] rounded-md"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-9 p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        return (
                          <Link to={`/product/${i._id}`}>
                            <div className="w-full flex items-start py-3">
                              <img
                                src={i.image_Url[0].url}
                                alt="product pic"
                                className="w-[45px] h-[45px] mr-2.5 "
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              <Navbar active={activeHeaduing} />
              <div className={`${styles.button} ml-4 rounded-sm!`}>
                <Link to="/shop-create">
                  <h1 className="text-white flex items-center">
                    {isSellerAuthenticated ? "Dashboard" : "Become Seller"}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />

              <div className="flex w-full justify-center">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-2.5 text-[#000000b7] "
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7] "
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <div>
                    <Link to="/profile">
                      {
                        <img
                          src={user.avatar}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full"
                        />
                      }
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;

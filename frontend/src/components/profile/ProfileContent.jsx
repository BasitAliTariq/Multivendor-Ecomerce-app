import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  deleeteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State, City } from "country-state-city";
import { MdTrackChanges } from "react-icons/md";

import { toast } from "react-toastify";
import axios from "axios";
import { clearError, clearSuccessMessage } from "../../redux/reducers/user";
import { getAllOrdersUserFun } from "../../redux/actions/order";
function ProfileContent({ active }) {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation({ name, email, password, phoneNumber }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success("User avatar updated successfully!");
        dispatch(loadUser());
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Failed to upload avatar");
      });
  };
  return (
    <div className="w-full">
      {/* Active  */}
      {active === 1 && (
        <>
          {/* Image */}
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={user?.avatar}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          {/* Form */}
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              {/* Name and email */}
              <div className="w-full block md:flex pb-3">
                {/* Name */}
                <div className="w-full md:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]! bg-white border-gray-300 mb-4 md:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* Email Address  */}
                <div className="w-full md:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]! bg-white border-gray-300 `}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* Phone Number and password   */}
              <div className="w-full block md:flex pb-3">
                {/* Phone Number */}
                <div className="w-full md:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]! bg-white border-gray-300 mb-4 md:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {/* Password */}
                <div className="w-full md:w-[50%]">
                  <label className="block pb-2">Enter Yor Password</label>
                  <input
                    type="password"
                    className={`${styles.input} w-[95%]! bg-white border-gray-300 mb-4 md:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit button */}
              <input
                className={`w-[250px] h-10 border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* Order  */}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund  */}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {/* Track order  */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/* Change password  */}
      {active === 6 && (
        <div>
          <ChangePasswpord />
        </div>
      )}
      {/* User Addres */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
}

const AllOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user && user._id;
  const { orders } = useSelector((state) => state.order);

  console.log(orders);

  useEffect(() => {
    dispatch(getAllOrdersUserFun(userId));
  }, [dispatch, userId]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart[0].qty,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUserFun(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};
const TrackOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user && user._id;
  const { orders } = useSelector((state) => state.order);

  console.log(orders);

  useEffect(() => {
    dispatch(getAllOrdersUserFun(userId));
  }, [dispatch, userId]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart[0].qty,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePasswpord = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/user/update-user-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true },
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((e) => {
        toast.error(e.response.data.message || "Failed to change password");
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className=" block text-[25px] font-medium text-[#000000ba] text-center pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          {/* old password */}
          <div className="w-full md:w-[50%] mt-5">
            <label className="block pb-2">Enter your existing password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! bg-white border-gray-300 mb-4 md:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          {/* new password */}
          <div className="w-full md:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! bg-white border-gray-300 mb-4 md:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {/* confirmed password */}
          <div className="w-full md:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! bg-white border-gray-300 mb-4 md:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Update button */}
          <input
            className={`w-[15%] h-10 border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields");
    } else {
      const data = dispatch(
        updateUserAddress({
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        }),
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
      setZipCode(null);
    }
  };

  const handleDelete = (item) => {
    dispatch(deleeteUserAddress(item._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  {/* Country */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      // className="w-[95%] border rounded-[5px]"
                      className={`${styles.input}`}
                    >
                      <option value="" className="block pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* City */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your city</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      // className="w-[95%] border rounded-[5px]"
                      className={`${styles.input}`}
                    >
                      <option value="" className="block pb-2">
                        Choose your City
                      </option>
                      {City &&
                        City.getCitiesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* Address 1 */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  {/* Address 2 */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  {/* Zip code */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  {/* Address type */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Adress Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      // className="w-[95%] border rounded-[5px]"
                      className={`${styles.input}`}
                    >
                      <option value="" className="block pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* Submit button */}
                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} cursor-pointer mt-5`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-medium text-[#000000ba] pb-2">
          My Address
        </h1>
        <div
          className={`${styles.button} rounded-md!`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white"> Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-[70px] rounded-sm flex items-center px-3 shadow justify-between pr-10"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-medium">{item.addressType}</h5>
            </div>

            <div className="pl-8 flex items-center">
              <h6>
                {item.address1} {item.address2}
              </h6>
            </div>

            <div className="pl-8 flex items-center">
              <h6>{user.phoneNumber}</h6>
            </div>

            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You have not any saved address
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { getAllOrdersShopFun } from "../../redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import { backdropClasses } from "@mui/material";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [addPaymentMethod, setAddPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  // const availableBalance = seller?.availableBalance.toFixed(2);
  const availableBalance =
    typeof seller?.availableBalance === "number"
      ? seller.availableBalance.toFixed(2)
      : 0.0;
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersShopFun(seller._id));
  }, [dispatch]);

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    axios
      .put(
        `${server}/shop/update-withdraw-method`,
        {
          withdrawMethod,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        toast.success("Payment method added successfully!");
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });

        setAddPaymentMethod(false);
        dispatch(loadSeller());
      })
      .catch((err) => {
        toast.error("Failed to add payment method.");
      });
  };

  const handleDeleteWithdrawMethod = () => {
    axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      })
      .catch((err) => {
        toast.error("Failed to delete withdraw method.");
      });
  };

  const withdrawHandler = () => {
    const amount = withdrawAmount;

    if (amount < 50) {
      toast.error("You cannot withdraw less than 50");
      return;
    }

    if (amount > Number(availableBalance)) {
      toast.error("You cannot withdraw more than your available balance");
      return;
    }

    axios
      .post(
        `${server}/withdraw/create-withdraw-request`,
        { amount },
        { withCredentials: true },
      )
      .then((res) => {
        toast.success("Withdraw request sent successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white h-[42px]! rounded`}
          onClick={() => {
            if (availableBalance < 50) {
              toast.error("You need at least $50 to withdraw.");
            } else {
              setOpen(true);
            }
          }}
        >
          Withdraw
        </div>
      </div>

      {open && (
        <div className="w-full h-screen z-999 fixed flex top-0 left-0 items-center justify-center bg-[#0000004e]">
          <div
            className={`p-3 w-[95%] md:w-[50%] min-h-[40vh] ${
              addPaymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } shadow rounded bg-white`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => {
                  setOpen(false);
                  setAddPaymentMethod(false);
                }}
                className="cursor-pointer"
              />
            </div>

            {addPaymentMethod ? (
              <div>
                <h3 className="text-[22px] text-center font-semibold">
                  Add new withdraw method
                </h3>
                <form onSubmit={handleAddPaymentMethod}>
                  <div>
                    <label>
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your bank name"
                      className={`${styles.input} mt-2`}
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                    />
                  </div>

                  <div className="mt-2">
                    <label>
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your bank country"
                      className={`${styles.input} mt-2`}
                      required
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mt-2">
                    <label>
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your bank swift code"
                      className={`${styles.input} mt-2`}
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mt-2">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="Number"
                      placeholder="Enter your bank account number"
                      className={`${styles.input} mt-2`}
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mt-2">
                    <label>
                      Account Holder Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your account holder name"
                      className={`${styles.input} mt-2`}
                      required
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mt-2">
                    <label>
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your bank address"
                      className={`${styles.input} mt-2`}
                      required
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.button} mt-4 text-white`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px]">Available Withdraw Methods</h3>
                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="md:flex w-full items-center justify-center">
                      <div className="md:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3,
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>

                        <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                      </div>

                      <div className="md:w-[50%]">
                        <AiOutlineDelete
                          size={20}
                          className="cursor-pointer"
                          onClick={() => handleDeleteWithdrawMethod()}
                        />
                      </div>
                    </div>

                    <br />
                    <h4>Available Balance: {availableBalance}$</h4>
                    <br />
                    <div className="md:flex items-center w-full">
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="md:w-[150px] rounded p-1 w-full md:mr-2 border"
                      />
                      <div
                        className={`${styles.button} text-white h-10!`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[16px] pt-2">
                      No withdraw methods available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} text-white text-[18px] mt-5`}
                        onClick={() => setAddPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;

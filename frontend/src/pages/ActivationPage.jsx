// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// function ActivationPage() {
//   const { activation_token } = useParams();
//   const [error, setError] = useState(false);
//   useEffect(() => {
//     if (activation_token) {
//       const activationEmail = async () => {
//         try {
//           const res = await axios.post(`${server}/user/activation`, {
//             activation_token,
//           });
//           console.log(res.data.message);
//         } catch (error) {
//           console.log(error.response.data.message);
//           setError(true);
//         }
//       };
//       activationEmail();
//     }
//   }, []);
//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
//       {error ? (
//         <p>Your token is expirted</p>
//       ) : (
//         <p>Your account has been created successfully</p>
//       )}
//     </div>
//   );
// }

// export default ActivationPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  const activateEmail = async () => {
    setStatus("loading");
    try {
      const res = await axios.post(
        `${server}/user/activation`,
        { activation_token },
        { headers: { "Content-Type": "application/json" } }
      );
      setStatus("success");
    } catch (e) {
      console.log(e.message);
      setStatus("error");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      {status === "success" && (
        <p className="text-green-600 text-lg font-semibold">
          🎉 Your account has been successfully created!
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 text-lg font-semibold">
          ❌ Your activation token is expired or invalid.
        </p>
      )}

      <button
        onClick={activateEmail}
        disabled={status === "loading" || status === "success"}
        className={`${
          status === "success"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-500"
        } text-white py-2 px-6 rounded font-semibold transition-all duration-200`}
      >
        {status === "loading" ? "Verifying..." : "Verify your account"}
      </button>
    </div>
  );
};

export default ActivationPage;

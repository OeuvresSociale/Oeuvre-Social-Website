import "../Styles/otp.css";
import React, { useEffect, useState } from "react";
import images from "../Assets/images.png";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // const history = useHistory();
  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("otp:", otp.join("")); // Combine OTP array into a single string
      const response = await axios.get("http://localhost:8000/api/verifyOTP", {
        otp: otp.join(""),
      }); // Send OTP in the request body
      console.log("response:", response.data);
      // history.push("/New")
    } catch (error) {
      console.error("Error in verifying OTP:", error);
    }
  };

  return (
    <div className="otpwrap">
      <div className="otwrapper">
        <div className="blueesection">
          <img src={images} alt="logo" className="loogo" />
          <div className="tiitle">
            {" "}
            <h1>Belink</h1>{" "}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Enter the code</h2>
          <div className="input-box">
            <input
              type="text"
              maxLength="1"
              value={otp[0]}
              onChange={(e) => {
                handleChange(0, e.target.value);
                if (e.target.value.length === 1) {
                  e.target.nextElementSibling.focus();
                }
              }}
              required
            />
            <input
              type="text"
              maxLength="1"
              value={otp[1]}
              onChange={(e) => {
                handleChange(1, e.target.value);
                if (e.target.value.length === 1) {
                  e.target.nextElementSibling.focus(); // Focus next element
                }
              }}
              required
            />
            <input
              type="text"
              maxLength="1"
              value={otp[2]}
              onChange={(e) => {
                handleChange(2, e.target.value);
                if (e.target.value.length === 1) {
                  e.target.nextElementSibling.focus();
                }
              }}
              required
            />
            <input
              type="text"
              maxLength="1"
              value={otp[3]}
              onChange={(e) => {
                handleChange(3, e.target.value);
                if (e.target.value.length === 1) {
                  e.target.nextElementSibling.focus();
                }
              }}
              required
            />
            <input
              type="text"
              maxLength="1"
              value={otp[4]}
              onChange={(e) => {
                handleChange(4, e.target.value);
                if (e.target.value.length === 1) {
                  e.target.nextElementSibling.focus();
                }
              }}
              required
            />
            <input
              type="text"
              maxLength="1"
              value={otp[5]}
              onChange={(e) => handleChange(5, e.target.value)}
              required
            />
          </div>

          <button type="submit">Verifier</button>
        </form>
      </div>
    </div>
  );
};

export default OTP;

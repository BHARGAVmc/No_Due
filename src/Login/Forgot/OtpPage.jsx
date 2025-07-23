import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import "./OtpPage.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@mits\.ac\.in$/;

const OtpPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [sendDisabled, setSendDisabled] = useState(false);      // for send/resend
  const [verifyDisabled, setVerifyDisabled] = useState(false);  // for verify
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!EMAIL_REGEX.test(inputEmail)) {
      alert("Enter a valid email.");
      return;
    }

    setSendDisabled(true); // disable button for 30s

    try {
      const res = await axios.post("http://127.0.0.1:8000/forgot/send-otp/", {
        email: inputEmail,
      });

      if (res.data.message === "OTP sent successfully") {
        setOtpSent(true);
        setTimer(30);
        setOtpError("");
        alert("OTP sent to your email.");
      } else {
        alert("Failed to send OTP.");
        setSendDisabled(false);
      }
    } catch (err) {
      alert("Failed to send OTP. Please check email or server.");
      setSendDisabled(false);
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyDisabled(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/forgot/verify-otp/", {
        email: inputEmail,
        otp: otp,
      });

      if (res.data.message === "OTP verified successfully") {
        alert("OTP Verified Successfully!");
        navigate("/ResetPassword", { state: { email: inputEmail } });
      } else {
        setOtpError("Invalid OTP");
      }
    } catch (err) {
      setOtpError("Invalid OTP or server error.");
    }

    setVerifyDisabled(false);
  };

  const handleResend = async () => {
    setSendDisabled(true);
    await handleSendOtp();
  };

  useEffect(() => {
    if (timer === 0) {
      setSendDisabled(false);
      return;
    }
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className="otp-container">
      <div className="back-button-otp" onClick={() => navigate("/Login")}>
        <FaArrowLeft /> <span>Back</span>
      </div>

      <h2>Secure OTP Login</h2>

      <div className="form-group">
        <label>Email ID</label>
        <input
          className="ip1"
          type="email"
          placeholder="Enter your email..."
          value={inputEmail}
          onChange={(e) => {
            setInputEmail(e.target.value);
            if (!EMAIL_REGEX.test(e.target.value)) {
              setSendDisabled(false);
            }
          }}
        />
      </div>

      {!otpSent ? (
        <button
          className="btn-primary"
          onClick={handleSendOtp}
          disabled={sendDisabled}
        >
          {sendDisabled ? "Please wait..." : "Send OTP"}
        </button>
      ) : (
        <>
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              className="ip1"
              type="text"
              placeholder="6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpError && <p className="error-text">{otpError}</p>}
          </div>

          <button
            className="btn-primary"
            onClick={handleVerifyOtp}
            disabled={verifyDisabled}
          >
            {verifyDisabled ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="resend-text">
            {timer > 0 ? (
              <p>
                Resend OTP in <strong>{timer}s</strong>
              </p>
            ) : (
              <button
                className="btn-link"
                onClick={handleResend}
                disabled={sendDisabled}
              >
                {sendDisabled ? "Please wait..." : "Resend OTP"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OtpPage;
// src/OtpPage.js
import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./OtpPage.css";

// ✅ Email Context
export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

// ✅ OTP Page Component
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OtpPage = () => {
  const { setEmail } = useContext(EmailContext);
  const [inputEmail, setInputEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!inputEmail) {
      alert("Please enter your email.");
      return;
    }

    if (!EMAIL_REGEX.test(inputEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    setEmail(inputEmail);
    setOtpSent(true);
    setTimer(30);
    console.log(`OTP sent to ${inputEmail}`);
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      alert("OTP Verified Successfully!");
      navigate("/reset-password");
    } else {
      alert("Invalid OTP!");
    }
  };

  const handleResend = () => {
    setTimer(30);
    console.log(`Resending OTP to ${inputEmail}`);
  };

  useEffect(() => {
    if (timer === 0) return;
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className="otp-container">
      <h2>Secure OTP Login</h2>

      <div className="form-group">
        <label>Email ID</label>
        <input
          type="email"
          placeholder="Enter your email..."
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
      </div>

      {!otpSent ? (
        <button className="btn-primary" onClick={handleSendOtp}>
          Send OTP
        </button>
      ) : (
        <>
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={handleVerifyOtp}>
            Verify OTP
          </button>

          <div className="resend-text">
            {timer > 0 ? (
              <p>
                Resend OTP in <strong>{timer}s</strong>
              </p>
            ) : (
              <button className="btn-link" onClick={handleResend}>
                Resend OTP
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OtpPage;

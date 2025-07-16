// // src/OtpPage.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./OtpPage.css";

// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const OtpPage = () => {
//   const [inputEmail, setInputEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [timer, setTimer] = useState(0);
//   const navigate = useNavigate();

//   const handleSendOtp = () => {
//     if (!inputEmail) {
//       alert("Please enter your email.");
//       return;
//     }

//     if (!EMAIL_REGEX.test(inputEmail)) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     setOtpSent(true);
//     setTimer(30);
//     // console.log(OTP sent to ${inputEmail});
//   };

//   const handleVerifyOtp = () => {
//     if (otp === "123456") {
//       alert("OTP Verified Successfully!");
//       navigate("/ResetPassword", { state: { email: inputEmail } });
//     } else {
//       alert("Invalid OTP!");
//     }
//   };

//   const handleResend = () => {
//     setTimer(30);
//     // console.log(Resending OTP to ${inputEmail});
//   };

//   useEffect(() => {
//     if (timer === 0) return;
//     const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     return () => clearInterval(countdown);
//   }, [timer]);

//   return (
//     <div className="otp-container">
//       <h2>Secure OTP Login</h2>

//       <div className="form-group">
//         <label>Email ID</label>
//         <input
//         className="ip1"
//           type="email"
//           placeholder="Enter your email..."
//           value={inputEmail}
//           onChange={(e) => setInputEmail(e.target.value)}
//         />
//       </div>

//       {!otpSent ? (
//         <button className="btn-primary" onClick={handleSendOtp}>
//           Send OTP
//         </button>
//       ) : (
//         <>
//           <div className="form-group">
//             <label>Enter OTP</label>
//             <input
//             className="ip1"
//               type="text"
//               placeholder="6-digit OTP"
//               maxLength={6}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//           </div>

//           <button className="btn-primary" onClick={handleVerifyOtp}>
//             Verify OTP
//           </button>

//           <div className="resend-text">
//             {timer > 0 ? (
//               <p>
//                 Resend OTP in <strong>{timer}s</strong>
//               </p>
//             ) : (
//               <button className="btn-link" onClick={handleResend}>
//                 Resend OTP
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default OtpPage;

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
  const [buttonDisabled, setButtonDisabled] = useState(false); // disable state
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!EMAIL_REGEX.test(inputEmail)) {
      alert("Enter a valid email.");
      return;
    }

    setButtonDisabled(true);

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
        setButtonDisabled(false);
      }
    } catch (err) {
      alert("Failed to send OTP. Please check email or server.");
      setButtonDisabled(false);
    }
  };

  const handleVerifyOtp = async () => {
    setButtonDisabled(true);
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
        setButtonDisabled(false); // Re-enable if invalid
      }
    } catch (err) {
      setOtpError("Invalid OTP or server error.");
      setButtonDisabled(false); // Re-enable if error
    }
  };

  const handleResend = async () => {
    setButtonDisabled(true);
    await handleSendOtp(); // Reuses logic
  };

  // Countdown effect for resend OTP
  useEffect(() => {
    if (timer === 0) {
      setButtonDisabled(false); // Re-enable when timer ends
      return;
    }
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className="otp-container">
      {/* Back Icon */}
      <div className="back-button" onClick={() => navigate("/Login")}>
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
              setButtonDisabled(false); // Enable button on invalid email change
            }
          }}
        />
      </div>

      {!otpSent ? (
        <button
          className="btn-primary"
          onClick={handleSendOtp}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Please wait..." : "Send OTP"}
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
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Verifying..." : "Verify OTP"}
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
                disabled={buttonDisabled}
              >
                {buttonDisabled ? "Please wait..." : "Resend OTP"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OtpPage;
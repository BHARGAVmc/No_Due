import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [gmail, setgmail] = useState('');
  const [mailErr, setmailErr] = useState('');
  const [password, setpassword] = useState('');
  const [passErr, setpassErr] = useState('');
  const [cpass, setcpass] = useState('');
  const [cpaassErr, setcpaassErr] = useState('');
  const [otpin, setotpin] = useState(false);
  const [otp, setotp] = useState('');
  const [otpErr, setotpErr] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);


  // Disable states
  const [disableVerify, setDisableVerify] = useState(false);
  const [disableOtpSubmit, setDisableOtpSubmit] = useState(false);
  const [disableRegister, setDisableRegister] = useState(false);

  const handleEmailChange = (value) => {
    if (emailVerified) return; // Block modification if verified
    setgmail(value);
    const valid = /^[a-zA-Z0-9._%+-]+@mits\.ac\.in$/;
    if (value === '') {
      setmailErr("Enter mail ID");
    } else if (!valid.test(value)) {
      setmailErr("Enter valid Gmail");
    } else {
      setmailErr("");
    }
    setotpErr("");
    setDisableVerify(false);
};


  const handlePasswordChange = (value) => {
    setpassword(value);
    const val = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-?|])[A-Za-z\d!@#$%^&*_\-?|]{6,}$/;
    if (value === '') {
      setpassErr("Enter password");
    } else if (!val.test(value)) {
      setpassErr("Password must be at least 6 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character");
    } else {
      setpassErr("");
    }
  };

  const handleCpassChange = (value) => {
    setcpass(value);
    if (password !== value) {
      setcpaassErr("Password not matched");
    } else {
      setcpaassErr("");
    }
  };

  const otpcheck = async (e) => {
    e.preventDefault();
    setDisableVerify(true);

    if (!gmail || mailErr) {
      setmailErr("Enter a valid MITS mail ID");
      setDisableVerify(false);
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/forgot/send-otp/", {
        email: gmail,
      });

      if (res.data.message === "OTP sent successfully") {
        alert("OTP sent to your mail");
        setotpin(true);
        setotpErr("");
      } else {
        setotpErr("Failed to send OTP");
        setDisableVerify(false);
      }
    } catch (err) {
      setotpErr("Error sending OTP");
      setDisableVerify(false);
    }
  };

  const otpche = async (e) => {
    e.preventDefault();
    setDisableOtpSubmit(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/forgot/verify-otp/", {
        email: gmail,
        otp: otp
      });

      if (res.data.message === "OTP verified successfully") {
        setotpErr("Successful");
        setotpin(false);
        setEmailVerified(true); // Lock email input
      }

      else {
        setotpErr("Invalid OTP");
        setDisableOtpSubmit(false);
      }
    } catch (err) {
      setotpErr("Invalid OTP or Server Error");
      setDisableOtpSubmit(false);
    }
  };

  const check = async (e) => {
    e.preventDefault();
    setDisableRegister(true);

    if (!emailVerified || !gmail || !password || !cpass || mailErr || passErr || cpaassErr || !userType) {
      alert("Please submit all fields properly");
      setDisableRegister(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/signup/", {
        email: gmail,
        password: password,
        role: userType
      });

      setMessage("Signup Successful!");
      navigate('/Login');
    } catch (error) {
      if (error.response) {
        alert("Signup failed: " + JSON.stringify(error.response.data));
      } else {
        alert("Server not reachable");
      }
      setDisableRegister(false);
    }
  };

  return (
    <div className="container">
      <center>
        <form className="signup-form">
          <div className="form-group">
            <label>
              <input
                type="radio"
                name="userType"
                value="student"
                checked={userType === 'student'}
                onChange={(e) => setUserType(e.target.value)}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="faculty"
                checked={userType === 'faculty'}
                onChange={(e) => setUserType(e.target.value)}
              />
              Faculty
            </label>
            <br /><br />

            <b>Enter Mail ID:</b><br />
            <input
              className='ip'
              type="text"
              placeholder="Enter mail id"
              value={gmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              disabled={emailVerified}
            />
            <span className="error-text">{mailErr}</span><br />


            {mailErr === "" && gmail !== "" && otpErr !== "Successful" && (
              <button className='otp-button' onClick={otpcheck} disabled={disableVerify}>
                {disableVerify ? "Please wait..." : "Verify"}
              </button>
            )}

            {otpin && (
              <div className="otp-group">
                <b>OTP:</b>
                <input
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                />
                <button className='otp-button' onClick={otpche} disabled={disableOtpSubmit}>
                  {disableOtpSubmit ? "Checking..." : "Submit"}
                </button>
                <br />
                <span className={otpErr === "Successful" ? "success-text" : "error-text"}>
                  {otpErr}
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <b>Enter Password:</b><br />
            <div className="password-toggle-wrapper">
              <input
                className='ip'
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="toggle-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <span className="error-text">{passErr}</span>
          </div>

          <div className="form-group">
            <b>Confirm Password:</b><br />
            <div className="password-toggle-wrapper">
              <input
                className='ip'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={cpass}
                onChange={(e) => handleCpassChange(e.target.value)}
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="toggle-icon">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <span className="error-text">{cpaassErr}</span>
          </div>

          <div>
            <button onClick={check} disabled={disableRegister}>
              {disableRegister ? "Registering..." : "Register"}
            </button>{' '}
            <button onClick={() => navigate('/Login')}>Back</button>
          </div>

          {message && <p className="success-text">{message}</p>}
        </form>
      </center>
    </div>
  );
}
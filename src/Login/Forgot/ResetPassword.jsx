// src/ResetPassword.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    if (!email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }else if (password !== confirmPassword) {
      alert("Passwords do not match.");
    }else{
      alert('Password Reseted Successfully')
      navigate('/Login')
    }

    // alert(Password reset for ${email});
    // setResetDone(true);
  };

  if (!email) {
    // If no email passed, redirect back
    navigate("/");
    return null;
  }


  return (
    <div className="reset-container">
      <h2>Reset Password</h2>

      <div className="form-group">
        <label>Email ID</label>
        <input type="email" className="ip1" value={email} readOnly />
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
        className="ip1"
          type="password"
          placeholder="Enter new password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
        className="ip1"
          type="password"
          placeholder="Re-enter password..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;
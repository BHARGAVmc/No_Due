// src/ResetPassword.js
import React, { useContext, useState } from "react";
import { EmailContext } from "./OtpPage"; // EmailContext from OtpPage
import "./ResetPassword.css";

function ResetPassword() {
  const { email } = useContext(EmailContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    if (!email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert(`Password reset for ${email}`);
    setResetDone(true);
  };

  if (resetDone) {
    return (
      <div className="reset-container">
        <h1 style={{ color: "green", fontSize: "2rem", textAlign: "center" }}>
          ✅ Your password is reseted.
        </h1>
      </div>
    );
  }

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>

      <div className="form-group">
        <label>Email ID</label>
        <input type="email" value={email} readOnly />
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
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

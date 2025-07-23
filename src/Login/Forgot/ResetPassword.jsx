import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./ResetPassword.css";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [resetDone, setResetDone] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleReset = async () => {
  if (!email || !password || !confirmPassword) {
    alert("All fields are required.");
    return;
  }

  const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-?|])[A-Za-z\d!@#$%^&*_\-?|]{6,}$/;
  if (!passwordRegex.test(password)) {
    alert("Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/forgot/reset-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirm_password: confirmPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Password Reset Successfully");
      navigate("/Login");
    } else {
      alert(data.error || "Something went wrong");
    }
  } catch (err) {
    alert("Server error while resetting password");
  }
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
        <div className="password-toggle-wrapper">
          <input
            className="ip1"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)} className="toggle-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <div className="password-toggle-wrapper">
          <input
            className="ip1"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="toggle-icon">
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

      </div>

      <button className="btn-primary" onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;
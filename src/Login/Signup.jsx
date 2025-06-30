import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
// import Login from './Login';

export default function Signup() {
  const navigate =useNavigate();
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


  
  const handleEmailChange = (value) => {
    setgmail(value);
    const valid = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value === '') {
      setmailErr("Enter mail ID");
    } else if (!valid.test(value)) {
      setmailErr("Enter valid gmail");
    } else {
      setmailErr("");
    }
  };

  const handlePasswordChange = (value) => {
    setpassword(value);
    const val = /^[a-zA-Z0-9~!@#$%^&*_-|?]{6,}$/;
    if (value === '') {
      setpassErr("Enter password");
    } else if (!val.test(value)) {
      setpassErr("Password should contain at least 6 characters");
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

  const otpcheck = (e) => {
    e.preventDefault();
    const valid = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (gmail === '') {
      setmailErr("Enter mail ID");
    } else if (!valid.test(gmail)) {
      setmailErr("Enter valid gmail");
    } else {
      setmailErr("");
      setotpin(true);
    }
  };

  const check = (e) => {
    e.preventDefault();
    if (!gmail || !password || !cpass || mailErr || passErr || cpaassErr) {
      alert("Please submit all fields properly");
    } else {
      alert("Registered successfully!");
      navigate('/Login')
      // navigate('/Login',{ state: { role: userType } })

    }
  };

  const otpche = (e) => {
    e.preventDefault();
    if (otp === "123") {
      setotpErr("Successful");
      setotpin(false);
    } else {
      setotpErr("Invalid OTP");
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
              </label><br />{' '} <br />
            <b>Enter Mail Id  : </b>
            <input
              type="text"
              placeholder="Enter mail id"
              value={gmail}
              onChange={(e) => handleEmailChange(e.target.value)}
            />{' '}
            <span className="error-text">{mailErr}</span><br />
            {mailErr==="" && gmail!==""&&otpErr!=="Successful"&&(
            <button className='otp-button' onClick={otpcheck}>Verify</button> 
            )}

            {otpin && (
              <div className="otp-group">
                <b>OTP: </b>
                <input
                  type="password"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                />{' '}
                <button className='otp-button' onClick={otpche}>Submit</button> <br />
              </div>
            )}
            <span className={otpErr==="Successful"?"success-text":"error-text"}>{otpErr}</span>
          </div>

          <div className="form-group">
            <b>Enter Password : </b>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            /> <br />
            <span className="error-text">{passErr}</span>
          </div>

          <div className="form-group">
            <b>Confirm Password: </b>
            <input
              type="password"
              placeholder="Enter confirm password"
              value={cpass}
              onChange={(e) => handleCpassChange(e.target.value)}
            /> <br />
            <span className="error-text">{cpaassErr}</span>
          </div>

          <div>
            <button onClick={check}>Register</button>{' '}
            <button onClick={() => navigate('/Login')}> Back</button>
          </div>
        </form>
      </center>
    </div>
  );
} 
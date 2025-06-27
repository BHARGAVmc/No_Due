import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './Login.css'; 

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [gmail, setgmail] = useState('');
  const [mailErr, setmailErr] = useState('');
  const [password, setpassword] = useState('');
  const [passErr, setpassErr] = useState('');
  const { role } = location.state || {};
  
  const handleEmailChange = (value) => {
    setgmail(value);
    const valid = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value === '') {
      setmailErr('Enter mail ID');
    } else if (!valid.test(value)) {
      setmailErr('Enter valid mail ID');
    } else {
      setmailErr('');
    }
  };

  const handlePasswordChange = (value) => {
    setpassword(value);
    const val = /^[a-zA-Z0-9~!@#$%^&*_-|?]{6,}$/;
    if (value === '') {
      setpassErr('Enter password');
    } else if (!val.test(value)) {
      setpassErr('Password should contain at least 6 characters');
    } else {
      setpassErr('');
    }
  };

  const check = (e) => {
    e.preventDefault();
    if (!gmail || !password || mailErr || passErr) {
      alert('Please fix the errors before submitting.');
    }else{
      // navigate('/SubjectDash')
       navigate('/FacultyDash')
    }
    // } else if(==="Student"){
    //       navigate('/SubjectDash')
    // }else if(role==="Faculty"){
    //   navigate('/FacultyDash')
    // }
  };

  return (
    <div className="container">
  <div className="content-wrapper">
    <h1 className="main-heading">Welcome To NoDue System!</h1>
    <form className="signup-form">
      <div className="form-group">
        <b>Mail ID: </b>
        <input
          type="text"
          placeholder="Enter mail ID"
          value={gmail}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <br />
        <span className="error-text">{mailErr}</span>
      </div>

      <div className="form-group">
        <b>Password: </b>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <br />
        <span className="error-text">{passErr}</span>
      </div>
      <p
        onClick={() => navigate('/OtpPage')}
        className='forgot'
      >
        Forgot Password?
      </p>
      <div>
        <button type="submit" onClick={check}>Login</button>{' '}
        <button type="button" onClick={() => navigate('/Signup')}>Sign up</button>
      </div>
    </form>
  </div>
</div>
  );
}

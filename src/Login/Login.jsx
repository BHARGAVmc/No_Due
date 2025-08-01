import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css'; 
import axios from 'axios';


export default function Login() {
  const navigate = useNavigate();
  // const location = useLocation();
  const [gmail, setgmail] = useState('');
  const [mailErr, setmailErr] = useState('');
  const [password, setpassword] = useState('');
  const [passErr, setpassErr] = useState('');
  // const { role } = location.state || {};
  
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

  const [showPassword, setShowPassword] = useState(false);

  const check = async (e) => {
  e.preventDefault();
  if (!gmail || !password || mailErr || passErr) {
    alert('Please fix the errors before submitting.');
    return;
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
      email: gmail,
      password: password,
    });

    const role = response.data.user.role;
    const profileComplete = response.data.profile_complete;

    if (role === 'student') {
      if(!profileComplete){
      navigate('/StudentIn', {state: { email: gmail, password: password }});
      }else{
        navigate('/SubjectDash', {state: { email: gmail, password: password }})
      }
    } else if (role === 'faculty') {
      navigate('/FacultyDash', {state: { email: gmail, password: password }});
    } else {
      alert('Unknown user role');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Invalid credentials');
  }
};

  return (
    <div className="container">
  <div className="content-wrapper">
    <div className='signup'>
      <h1 className="main-heading">Welcome To NoDue System...!</h1>
      <div className='sign'>
      <div><img src="/img2.jpg" alt="logo" className='img' height={200} width={200} /> </div>
      <div>
    <form className="signup-form">
      <div className="form-group">
        <b>Mail ID: </b>
        <input 
        className='ip1'
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
        <div className="password-toggle-wrapper">
      <input
        className='ip2'
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      <span onClick={() => setShowPassword(!showPassword)} className="toggle-icon">
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>

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
    </div>
    </div>
</div>
  );
}

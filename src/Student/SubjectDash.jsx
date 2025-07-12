import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './SubjectDash.css';


const CircularProgress = ({ percentage }) => {
  const radius = 15.9155;
  const dash = percentage;

  return (
    <svg viewBox="0 0 36 36" className="circular-chart">
      <path
        className="circle-bg"
        d={`M18 2.0845
            a ${radius} ${radius} 0 0 1 0 31.831
            a ${radius} ${radius} 0 0 1 0 -31.831`}
      />
      <path
        className="circle-progress"
        strokeDasharray={`${dash}, 100`}
        d={`M18 2.0845
            a ${radius} ${radius} 0 0 1 0 31.831
            a ${radius} ${radius} 0 0 1 0 -31.831`}
      />
      <text x="18" y="20.35" className="percentage-text">
        {percentage}%
      </text>
    </svg>
  );
};


const SubjectCard = ({ subject }) => {
  const navigate = useNavigate();

  const total = subject.requirements.length;
  const completed = subject.requirements.filter(r => r.is_completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleClick = () => {
    navigate('/SDetailsDash', { state: { subject } });
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-left">
        <p>{subject.subject_name.charAt(0).toUpperCase() + subject.subject_name.slice(1)}    - {subject.faculty_name.charAt(0).toUpperCase() + subject.faculty_name.slice(1)}</p>
      </div>
      <div className="card-right">
        {/* <span className="label">Completion</span> */}
        <CircularProgress percentage={percentage} />
      </div>
    </div>
  );
};


const Home = ({ subjects }) => {
  return (
    <div className="home-container">
      <h1>List of Subjects</h1>
      {subjects.map((subj, index) => (
        <SubjectCard key={index} subject={subj} />
      ))}
    </div>
  );
};


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state || {};

  const [showProfile, setShowProfile] = useState(false);
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);

  
  useEffect(() => {
    if (email && password) {
      axios.post("http://127.0.0.1:8000/details/subjects/", {
        email: email,
        password: password
      }).then((res) => {
        setStudent(res.data.student);
        setSubjects(res.data.subjects);
      }).catch((err) => {
        console.error("API error:", err);
        alert("Failed to fetch subject details.");
      });
    }
  }, [email, password]);

  const handleLogout = () => {
    alert("You have been logged out.");
    setShowProfile(false);
    navigate('/');
  };

  const rollNo = student?.roll_no || "Loading...";

  return (
    <div className="App">
      <div className="top-bar">
        <FaUserCircle
          className="profile-icon-top"
          onClick={() => setShowProfile(!showProfile)}
          title={showProfile ? "Hide Profile" : "View Profile"}
        />
      </div>

      {showProfile && (
        <div className="profile-box">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Roll No:</strong> {rollNo}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}

      <Home subjects={subjects} />
    </div>
  );
};

export default App;

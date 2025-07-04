import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './SubjectDash.css';

const subjects = [
  { id: 1, name: "Subject 1", completed: 3, total: 5 },
  { id: 2, name: "Subject 2", completed: 4, total: 5 },
  { id: 3, name: "Subject 3", completed: 2, total: 5 },
  { id: 4, name: "Subject 4", completed: 1, total: 5 }
];

const CircularProgress = ({ percentage }) => {
  const radius = 15.9155;
  const dash = (percentage * 100) / 100;
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

const SubjectCard = ({ id, name, completed, total }) => {
  const percentage = Math.round((completed / total) * 100);

  const handleClick = () => {
    // Navigate to SDetailsDash page
    window.location.href = 'SDetailsDash';  // You can also use SDetailsDash.html if it's an HTML file
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-left">{name}</div>
      <div className="card-right">
        <span className="label">Percentage</span>
        <CircularProgress percentage={percentage} />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <h1>List of Subjects</h1>
      {subjects.map(subject => (
        <SubjectCard
          key={subject.id}
          id={subject.id}
          name={subject.name}
          completed={subject.completed}
          total={subject.total}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [showProfile, setShowProfile] = useState(false);
  const name = "U. Varalakshmi";
  const rollNo = "21BCE13360";

  const handleLogout = () => {
    alert("You have been logged out.");
    setShowProfile(false);
  };

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
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Roll No:</strong> {rollNo}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}

      <Home />
    </div>
  );
};

export default App;
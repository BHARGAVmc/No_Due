import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import './FacultyDash.css';
function FacultyDash() {
    const department=[
        {   id:1,
            name:'CSE-AIML',
            classes:['2nd Year-AIML','2nd Year-Networks','1st Year-AIML']
        },
        {   id:1,
            name:'ECE',
            classes:['1st Year-ECE','2nd Year-ECE','3rd Year-ECE']
        },
         {   id:1,
            name:'EEE',
            classes:['1st Year-EEE','2nd Year-EEE','3rd Year-EEE']
        },
    ];
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "Guest";
  const email = location.state?.name || "Guest emial";
  const [showProfile, setShowProfile] = useState(false);
  const handleLogout = () => {
    navigate('/Login');
  };
  const handleClassClick = (deptName,className) => {
    console.log('Clicked:', deptName,className);
    navigate('/DetailsDash',{state : {department:deptName,section:className}});
  };
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };
  return (
  <div className="App">
    <div className="header-bar">
      <div className="title">Classes attending</div>
      <div className="profile-group">
        <FaCircleUser className="profile-icon" size={28} onClick={toggleProfile} />
        <span className="faculty-name">{name}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      {showProfile && (
        <div className="profile-dropdown">
          <h3>{name} • {name}</h3>
          <p className="email">{email}</p>
        </div>
      )}
    </div>
    {department.map((dep) => (
      <div className="lists" key={dep.id}>
        <h2>{dep.name}</h2>
        <ul>
          {dep.classes.map((cls, index) => (
            <li key={index} onClick={() => handleClassClick(dep.name, cls)}>
              <p>{cls}</p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)
}
export default FacultyDash;

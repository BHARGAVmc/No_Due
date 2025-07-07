import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import './FacultyDash.css';
function FacultyDash() {
const department = [
  {
    id: 1,
    name: 'CSE-AIML',
    years: [
      {
        year: '1st Year',
        sections: ['Section-A', 'Section-B']
      },
      {
        year: '2nd Year',
        sections: ['Section-A', 'Section-B']
      }
    ]
  },
  {
    id: 2,
    name: 'ECE',
    years: [
      {
        year: '1st Year',
        sections: ['Section-A', 'Section-B', 'Section-C']
      },
      {
        year: '2nd Year',
        sections: ['Section-A', 'Section-B']
      }
    ]
  },
  {
    id: 3,
    name: 'EEE',
    years: [
      {
        year: '1st Year',
        sections: ['Section-A', 'Section-B', 'Section-C']
      },
      {
        year: '2nd Year',
        sections: ['Section-A', 'Section-B']
      }
    ]
  }
];
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "Guest";
  const email = location.state?.email || "guest@example.com";
  const [showProfile, setShowProfile] = useState(false);
  const [openBlocks, setOpenBlocks] = useState({});
  const toggleProfile = () => setShowProfile(!showProfile);
  const handleLogout = () => navigate('/Login');
  const toggleBlock = (key) => {
    setOpenBlocks((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const handleClassClick = (dept, year, section) => {
    navigate('/DetailsDash', {
      state: { department: dept, years : year, section }
    });
  };
  return (
    <div className="App">
      <div className="header-bar">
        <div className="title">Clasess Attending</div>
        <div className="profile-group">
          <FaCircleUser className="profile-icon" size={28} onClick={toggleProfile} />
          <span className="faculty-name">{name}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        {showProfile && (
          <div className="profile-dropdown">
            <h3>{name}</h3>
            <p className="email">{email}</p>
          </div>
        )}
      </div>
      {department.map((dep) => {
        const key = `dept-${dep.id}`;
        return (
          <div className="lists" key={dep.id}>
            <h2 onClick={() => toggleBlock(key)} style={{ cursor: 'pointer' }}>
              {dep.name}
            </h2>
            {openBlocks[key] && (
              <ul>
                {dep.years.map((yearObj, yIndex) =>
  yearObj.sections.map((section, secIndex) => (
    <li
      key={`${yIndex}-${secIndex}`}
      onClick={() =>
        handleClassClick(dep.name, yearObj.year, section)
      }
    >
      <p>{section} - {yearObj.year}</p>
    </li>
  ))
)}
</ul>
)}
</div>
);
})}
</div>
);
}
export default FacultyDash;
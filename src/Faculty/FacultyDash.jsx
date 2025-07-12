// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaCircleUser } from 'react-icons/fa6';
// import './FacultyDash.css';
// import axios from 'axios';

// function FacultyDash() {
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showProfile, setShowProfile] = useState(false);
//   const [groupedData, setGroupedData] = useState({});

//   const navigate = useNavigate();
//   const location = useLocation();
//   const name = location.state?.name || "Faculty";
//   const { email, password } = location.state || {};
//   console.log(email, password)

//   useEffect(() => {
//     axios.post("http://127.0.0.1:8000/fdash/faculty-login/", {
//       email: email,
//       password: password
//     })
//       .then(response => {
//         setSubjects(response.data);
//         setLoading(false);

//         // Grouping data
//         const grouped = {};
//         response.data.forEach(item => {
//           const yearLabel = `${item.year === "1" ? "1st" : item.year === "2" ? "2nd" : item.year === "3" ? "3rd" : "4th"} Year`;
//           const key = `${item.branch} - ${yearLabel}`;
          
//           if (!grouped[key]) grouped[key] = [];
          
//           if (!grouped[key].some(sec => sec.section === item.section)) {
//             grouped[key].push({
//               section: item.section,
//               year: yearLabel,
//               branch: item.branch
//             });
//           }
//         });

//         setGroupedData(grouped);
//       })
//       .catch(error => {
//         console.error("Error fetching faculty subject data:", error);
//         setLoading(false);
//       });
//   }, [email, password]);

//   const toggleProfile = () => setShowProfile(!showProfile);
//   const handleLogout = () => navigate('/Login');
//   const handleAddClick = () => navigate('/FacultyIn', { state: { email, password } });

//   const handleClassClick = (branch, year, section) => {
//     navigate('/DetailsDash', {
//       state: { department: branch, years: year, section }
//     });
//   };

//   if (loading) return <p>Loading Faculty Dashboard...</p>;

//   return (
//     <div className="App">
//       <div className="header-bar">
//         <div className="title-row">
//           <button className="add-button" onClick={handleAddClick}>Add</button>
//           <div className="title">Classes Attending</div>
//         </div>
//         <div className="profile-group">
//           <FaCircleUser className="profile-icon" size={28} onClick={toggleProfile} />
//           <span className="faculty-name">{name}</span>
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>
//         {showProfile && (
//           <div className="profile-dropdown">
//             <h3>{name}</h3>
//             <p className="email">{email}</p>
//           </div>
//         )}
//       </div>

//       <div className="lists">
//         {subjects.length === 0 ? (
//           <p>No subjects assigned.</p>
//         ) : (
//           Object.entries(groupedData).map(([groupKey, sections], idx) => (
//             <div className="subject-block" key={idx}>
//               <h2>{groupKey}</h2>
//               <ul>
//                 {sections.map((sec, i) => (
//                   <li
//                     key={`${groupKey}-${sec.section}`}
//                     onClick={() => handleClassClick(sec.branch, sec.year, sec.section)}
//                     style={{ cursor: 'pointer' }}
//                   >
//                     Section-{sec.section} - {sec.year}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default FacultyDash;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import './FacultyDash.css';
import axios from 'axios';

function FacultyDash() {
  const [subjects, setSubjects] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [expandedBranches, setExpandedBranches] = useState({});
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "Faculty";
  const { email, password } = location.state || {};
  console.log(email, password)

  useEffect(() => {
    axios.post("http://127.0.0.1:8000/fdash/faculty-login/", {
      email,
      password
    })
      .then(response => {
        setSubjects(response.data);
        setLoading(false);

        // Grouping by branch
        const grouped = {};
        response.data.forEach(item => {
          const yearLabel =
            item.year === "1" ? "1st" :
            item.year === "2" ? "2nd" :
            item.year === "3" ? "3rd" : "4th";

          if (!grouped[item.branch]) grouped[item.branch] = [];

          // Avoid duplicate year-section entries
          if (!grouped[item.branch].some(s => s.section === item.section && s.year === item.year)) {
            grouped[item.branch].push({
              year: item.year,
              section: item.section,
              yearLabel
            });
          }
        });

        setGroupedData(grouped);
      })
      .catch(error => {
        console.error("Error fetching faculty subject data:", error);
        setLoading(false);
      });
  }, [email, password]);

  const toggleProfile = () => setShowProfile(!showProfile);
  const handleLogout = () => navigate('/Login');
  const handleAddClick = () => navigate('/FacultyIn', { state: { email, password } });

  const handleClassClick = (branch, year, section) => {
    navigate('/DetailsDash', {
      state: { email,password,department: branch, years: year, section }
    });
  };

  const toggleBranch = (branch) => {
    setExpandedBranches(prev => ({
      ...prev,
      [branch]: !prev[branch]
    }));
  };

  if (loading) return <p>Loading Faculty Dashboard...</p>;

  return (
    <div className="App">
      <div className="header-bar">
        <div className="title-row">
          <button className="add-button" onClick={handleAddClick}>Add</button>
          <div className="title">Classes Attending</div>
        </div>
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

      <div className="lists">
        {subjects.length === 0 ? (
          <p>No subjects assigned.</p>
        ) : (
          Object.entries(groupedData).map(([branch, details], idx) => (
            <div className="subject-block" key={idx}>
              <h2
                style={{ cursor: 'pointer', color: 'white' }}
                onClick={() => toggleBranch(branch)}
              >
                {branch}
              </h2>
              {expandedBranches[branch] && (
                <ul>
                  {details.map((sec, i) => (
                    <li
                      key={`${branch}-${sec.section}-${i}`}
                      style={{ cursor: 'pointer', marginLeft: '20px' }}
                      onClick={() => handleClassClick(branch, sec.year, sec.section)}
                    >
                      {sec.yearLabel} Year - Section {sec.section}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FacultyDash;


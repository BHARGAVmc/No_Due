import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './SDetailsDash.css';
import { Trash2 } from 'lucide-react';

const Item = ({ title, checked, onChange, status, onClickTitle }) => {
  const handleTitleHoverOrTouch = () => {
    onClickTitle(title, checked);
  };

  return (
    <div className="sdetails-item">
      <div className="sdetails-item-content">
        <span
          className="sdetails-clickable"
          onMouseEnter={handleTitleHoverOrTouch}
          onTouchStart={handleTitleHoverOrTouch}
        >
          {title}
        </span>
        {status && <span className="sdetails-status">{status}</span>}
      </div>
      <div
        title={checked ? "Already submitted" : ""}
        className={`sdetails-checkbox ${checked ? 'checked disabled' : ''}`}
        onClick={() => {
          if (!checked) onChange();
        }}
      />
    </div>
  );
};

const SubItem = ({ title, checked, onChange, onUpload, onDelete, uploadedFile }) => {
  const fileInputRef = useRef();

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="sdetails-sub-item">
      <div className="sdetails-sub-item-content">
        <span>{title}</span>
        {title === 'Soft Copy' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="sdetails-upload-button" onClick={handleUploadClick}>
              {uploadedFile || 'Choose File'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="/"
            />
            {uploadedFile && (
              <button
                className="sdetails-delete-button"
                onClick={onDelete}
                title="Delete uploaded file"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        )}
      </div>
      <div
        title={checked ? "Already submitted" : ""}
        className={`sdetails-checkbox ${checked ? 'checked disabled' : ''}`}
        onClick={() => {
          if (!checked) onChange();
        }}
      />
    </div>
  );
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.state?.subject;

  
  const [checkedItems, setCheckedItems] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  if (!subject) {
    return <p>No subject data found.</p>;
  }

  const total = subject.requirements.length;
  const completed = subject.requirements.filter(r => r.is_completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const radius = 25;
const circumference = 2 * Math.PI * radius;
const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  const handleCheck = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleTitleClick = (item, isChecked) => {
    if (item === 'NPTEL Certificate') setShowDetails((prev) => !prev);
    alert(isChecked ? `${item} was submitted` : `You have not submitted ${item}`);
  };

  const handleUpload = (file) => {
    setUploadedFile(file.name);
    setCheckedItems((prev) => ({
      ...prev,
      'Soft Copy': true,
      'NPTEL Certificate': true,
    }));
    alert(`File "${file.name}" uploaded successfully!`);
  };

  const handleDeleteUpload = () => {
    setUploadedFile(null);
    setCheckedItems((prev) => ({
      ...prev,
      'Soft Copy': false,
      'NPTEL Certificate': false,
    }));
  };

  const subItemTitles = ['Hard Copy', 'Soft Copy'];

  return (
    <div className="sdetails-container">
      <div className="sdetails-header">
        <button onClick={() => navigate(-1)}>←</button>

        <div>
          <p className="faculty-name"> 
            {subject.subject_name.charAt(0).toUpperCase() + subject.subject_name.slice(1)}  -  {subject.faculty_name.charAt(0).toUpperCase() + subject.faculty_name.slice(1)}
          </p>
        </div>

        <div className="sdetails-percentage-container">
        <svg viewBox="0 0 120 120" width="120" height="120" className="sdetails-progress-circle">
            <circle className="sdetails-progress-circle-bg" cx="60" cy="60" r="50" strokeWidth="8" fill="none" />
            <circle
                className="sdetails-progress-circle-fill"
                cx="60"
                cy="60"
                r="50"
                strokeWidth="8"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset="0"
                transform="rotate(-90 60 60)"  
            />
            <text className="sdetails-progress-text" x="60" y="66">{percentage}%</text>
            </svg>
        </div>
      </div>

      {subject.requirements.map((req) => (
        <Item
          key={req.requirement_type}
          title={req.requirement_type}
          checked={req.is_completed}
          onChange={() => handleCheck(req.requirement_type)}
          status={req.remarks || null}
          onClickTitle={handleTitleClick}
        />
      ))}

      {showDetails && (
        <div className="sdetails-sub-items">
          {subItemTitles.map((title) => (
            <SubItem
              key={title}
              title={title}
              checked={checkedItems[title]}
              onChange={() => handleCheck(title)}
              onUpload={title === 'Soft Copy' ? handleUpload : () => {}}
              onDelete={title === 'Soft Copy' ? handleDeleteUpload : () => {}}
              uploadedFile={title === 'Soft Copy' ? uploadedFile : null}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

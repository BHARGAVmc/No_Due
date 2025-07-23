import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './SDetailsDash.css';
import { Trash2 } from 'lucide-react';

const Item = ({ title, checked, onChange, status, onClickTitle, softCopyRequired, hardCopyRequired }) => {
  

  return (
    <div className="sdetails-item">
      <div className="sdetails-item-content">
        <span className="sdetails-clickable" onClick={() => onClickTitle(title, checked)}>
          {title}
        </span>

        <div className="sdetails-copy-indicators">
          {softCopyRequired && <span className="dot green" title="Soft Copy required" />}
          {hardCopyRequired && <span className="dot red" title="Hard Copy required" />}
        </div>
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

const SubItem = ({ title, checked, onChange, onUpload, onDelete, uploadedFile, softCopyRequired, hardCopyRequired }) => {
  const fileInputRef = useRef();
  const handleUploadClick = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) onChange(file);
  };

  const isRequired = title === 'Soft Copy' ? softCopyRequired : hardCopyRequired;

  return (
    <div className="sdetails-sub-item">
      <div className="sdetails-sub-item-content">
        <span>{title}</span>

        {title === 'Soft Copy' && softCopyRequired && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="sdetails-upload-button" onClick={handleUploadClick}>
              {uploadedFile ? uploadedFile.name : 'Choose File'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="*"
            />
            {uploadedFile && (
              <>
                <button
                  className="sdetails-delete-button"
                  onClick={onDelete}
                  title="Delete uploaded file"
                >
                  <Trash2 size={18} />
                </button>

                <button
                  className="sdetails-upload-button"
                  onClick={onUpload}
                  disabled={!softCopyRequired || !uploadedFile}
                >
                  Upload
                </button>
              </>
            )}
          </div>
        )}

        {title === 'Soft Copy' && !softCopyRequired && (
          <span style={{ fontSize: '12px', color: 'gray' }}>Upload not required</span>
        )}
        {title === 'Hard Copy' && !hardCopyRequired && (
          <span style={{ fontSize: '12px', color: 'gray' }}>Submission not required</span>
        )}
      </div>

      <div
        title={!isRequired ? "Not required" : checked ? "Already submitted" : ""}
        className={`sdetails-checkbox ${checked ? 'checked disabled' : ''} ${!isRequired ? 'disabled' : ''}`}
        onClick={() => {
          if (!checked && isRequired) onChange();
        }}
      />
    </div>
  );
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.state?.subject;
  console.log("📥 Subject from previous page:", subject);

  const [showRemark, setShowRemark] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedRequirementWithUpload, setSelectedRequirementWithUpload] = useState(null);

  if (!subject) return <p>No subject data found.</p>;

  const total = subject.requirements.length;
  const completed = subject.requirements.filter(r => r.is_completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  const handleCheck = (item) => {
    const isUploaded = subject.requirements.find(
      (r) => r.requirement_type === item && r.is_completed
    );
    if (isUploaded) return;

    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleTitleClick = (item) => {
  console.log("Selected:", item);
  setSelectedRequirementWithUpload(item);
};

  const handleUpload = async () => {
  if (!uploadedFile || !subject || !selectedRequirementWithUpload) {
    alert("Please select a requirement and a file before uploading.");
    return;
  }
console.log("DEBUG ❗subject.student_roll_no:", subject.student_roll_no);
console.log("DEBUG ❗subject.subject_code:", subject.subject_code);
console.log("DEBUG ❗subject.faculty_email:", subject.faculty_email);

  if (!subject.student_roll_no || !subject.subject_code || !subject.faculty_email) {
    alert("Missing subject details.");
    return;
  }

  try {
    const formData = new FormData();
    // formData.append("roll_no", subject.roll_no);
    formData.append("roll_no", subject.student_roll_no);
    formData.append("subject_code", subject.subject_code);
    formData.append("requirement_type", selectedRequirementWithUpload);
    formData.append("email", subject.faculty_email);
    formData.append("upload_type", "soft");
    formData.append("certificate_file", uploadedFile);

    const response = await fetch("http://127.0.0.1:8000/fdetails/upload-certificate-v2/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      alert("Uploaded successfully");
      setCheckedItems((prev) => ({
        ...prev,
        [selectedRequirementWithUpload]: true,
      }));
      setUploadedFile(null); // ✅ clear file after success
    } else {
      alert("Upload failed: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Upload failed", error);
    alert("Something went wrong");
  }
};


  const handleDeleteUpload = () => {
    setUploadedFile(null);
    setCheckedItems((prev) => ({
      ...prev,
      'Soft Copy': false,
      [selectedRequirementWithUpload]: false,
    }));
  };

  const selectedReqData = subject.requirements.find(
    (r) => r.requirement_type === selectedRequirementWithUpload
  );
  console.log("Selected Requirement Data:", selectedReqData);

  return (
    <div className="sdetails-container">
      <div className="sdetails-header">
        <button onClick={() => navigate(-1)}>←</button>

        <div>
          <p className="faculty-name">
            {subject.subject_name.charAt(0).toUpperCase() + subject.subject_name.slice(1)} - {subject.faculty_name.charAt(0).toUpperCase() + subject.faculty_name.slice(1)}
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
          softCopyRequired={req.soft_copy_required}
          hardCopyRequired={req.hard_copy_required}
        />
      ))}

      {selectedRequirementWithUpload &&
          selectedReqData &&
          selectedRequirementWithUpload.toLowerCase().includes("certificate") && (
            <div className="sdetails-sub-items">
              {['Hard Copy', 'Soft Copy'].map((title) => {
                const isRequired =
                  title === 'Soft Copy'
                    ? selectedReqData.soft_copy_required
                    : selectedReqData.hard_copy_required;

                if (!isRequired) return null;

                return (
                  <SubItem
                    key={title}
                    title={title}
                    checked={title === 'Soft Copy'
                      ? selectedReqData.soft_copy_completed
                      : selectedReqData.hard_copy_completed}
                    onChange={title === 'Soft Copy' ? setUploadedFile : () => handleCheck(title)}
                    onUpload={title === 'Soft Copy' ? handleUpload : () => {}}
                    onDelete={title === 'Soft Copy' ? handleDeleteUpload : () => {}}
                    uploadedFile={title === 'Soft Copy' ? uploadedFile : null}
                    softCopyRequired={selectedReqData.soft_copy_required}
                    hardCopyRequired={selectedReqData.hard_copy_required}
                  />
                );
              })}
            </div>
        )}
        {subject.requirements?.[0]?.remarks && (
            <div className="sdetails-remark-footer">
              <button
                className="sdetails-remark-toggle"
                onClick={() => setShowRemark(!showRemark)}
              >
                {showRemark ? 'Hide Remark' : 'Show Remark'}
              </button>

              {showRemark && (
                <div className="sdetails-remark-popup">
                  {subject.requirements[0].remarks}
                </div>
              )}
            </div>
          )}
    </div>
  );
}

export default App;

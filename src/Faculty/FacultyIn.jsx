import React, { useState } from 'react';
import './FacultyIn.css';

const BranchForm = () => {
  const [formData, setFormData] = useState({
    branch: '',
    year: '',
    sem: '',
    section: '',
    courseCode: '',
    subject: '',
    facultyName: ''
  });

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['I', 'II'];
  const sections = Array.from({ length: 11 }, (_, i) => String.fromCharCode(65 + i)); // A to K

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.values(formData);
    const allFieldsFilled = values.every(value => value.trim() !== "");

    if (!allFieldsFilled) {
      alert("⚠️ Please fill in all the fields before submitting.");
      return;
    }

    alert("✅ Successfully submitted");
    window.location.href='/FacultyDash';
  };

  const handleBack = () => {
    window.location.href = '/FacultyDash';
  };

  return (
    <div className="custom-branch-form-container">
      {/* 🔙 Back Arrow */}
      <div onClick={handleBack} style={{ cursor: 'pointer', fontSize: '24px', marginBottom: '10px' }}>
        ← Back
      </div>

      <h2 className="custom-branch-title">Branch selection</h2>
      <form className="custom-branch-form" onSubmit={handleSubmit}>
        <label className="custom-branch-label">
          Faculty Name:
          <input
            className="custom-branch-input"
            type="text"
            name="facultyName"
            value={formData.facultyName}
            onChange={handleChange}
          />
        </label>

        <label className="custom-branch-label">
          Branch:
          <select
            className="custom-branch-select"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          >
            <option value="">-- Select Branch --</option>
            {['CAI', 'CIVIL', 'CSC', 'CSD', 'CSM', 'CSN', 'CSE', 'CST', 'ECE', 'EEE', 'MECH'].map((branch, idx) => (
              <option key={idx} value={branch}>{branch}</option>
            ))}
          </select>
        </label>

        <label className="custom-branch-label">
          Year:
          <select
            className="custom-branch-select"
            name="year"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">-- Select Year --</option>
            {years.map((year, idx) => <option key={idx} value={year}>{year}</option>)}
          </select>
        </label>

        <label className="custom-branch-label">
          Sem:
          <select
            className="custom-branch-select"
            name="sem"
            value={formData.sem}
            onChange={handleChange}
          >
            <option value="">-- Select Sem --</option>
            {semesters.map((sem, idx) => <option key={idx} value={sem}>{sem}</option>)}
          </select>
        </label>

        <label className="custom-branch-label">
          Section:
          <select
            className="custom-branch-select"
            name="section"
            value={formData.section}
            onChange={handleChange}
          >
            <option value="">-- Select Section --</option>
            {sections.map((sec, idx) => <option key={idx} value={sec}>{sec}</option>)}
          </select>
        </label>

        <label className="custom-branch-label">
          Course code:
          <input
            className="custom-branch-input"
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
          />
        </label>

        <label className="custom-branch-label">
          Subject:
          <input
            className="custom-branch-input"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </label>

        <div className="custom-branch-button-group">
          <button className="custom-branch-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BranchForm;

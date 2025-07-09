import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentIn.css";

const StudentDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roll_number: "",
    branch: "",
    year: "",
    sem: "",
    section: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { roll_number, branch, year, sem, section } = formData;

    // Validate fields
    if (!roll_number.trim() || !branch || !year || !sem || !section) {
      alert("⚠️ Please fill in all the fields.");
      return;
    }

    // Show success and navigate
    alert("✅ Successfully submitted!");
    navigate("/subjectdash");
  };

  return (
    <div className="student-form-container">
      <h2 className="student-form-heading">Student Details</h2>
      <form onSubmit={handleSubmit} className="student-form-form">
        <label className="student-form-label">
          Roll Number:
          <input
            type="text"
            name="roll_number"
            value={formData.roll_number}
            onChange={handleChange}
            maxLength={10}
            required
            className="student-form-input"
            placeholder="Enter 10-digit Roll Number"
          />
        </label>

        <label className="student-form-label">
          Branch:
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="student-form-select"
          >
            <option value="">-- Select Branch --</option>
            <option value="CAI">CAI</option>
            <option value="CIVIL">CIVIL</option>
            <option value="CSC">CSC</option>
            <option value="CSD">CSD</option>
            <option value="CSM">CSM</option>
            <option value="CSN">CSN</option>
            <option value="CSE">CSE</option>
            <option value="CST">CST</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>
        </label>

        <label className="student-form-label">
          Year:
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="student-form-select"
          >
            <option value="">-- Select Year --</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </label>

        <label className="student-form-label">
          Semester:
          <select
            name="sem"
            value={formData.sem}
            onChange={handleChange}
            required
            className="student-form-select"
          >
            <option value="">-- Select Semester --</option>
            <option value="I">I</option>
            <option value="II">II</option>
          </select>
        </label>

        <label className="student-form-label">
          Section:
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
            className="student-form-select"
          >
            <option value="">-- Select Section --</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
          </select>
        </label>

        <button type="submit" className="student-form-button">
          Submit
        </button>
      </form>
    </div>
  );
};
export default StudentDetailsForm;

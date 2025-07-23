import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./StudentIn.css";

const StudentDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};

  const [formData, setFormData] = useState({
    roll_no: "",
    branch: "",
    year: "",
    semester: "", 
    section: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: email,
        password: password,
        roll_no: formData.roll_no,
        branch: formData.branch,
        year: formData.year,
        semester: formData.semester,  
        section: formData.section
      };

      const response = await axios.post("http://127.0.0.1:8000/student/update/", payload);

      if (response.status === 200 || response.status === 201) {
        alert("Student profile updated successfully");
        navigate("/SubjectDash", { state: { email, password } });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update student details");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="student-form-container">
      <h2 className="student-form-heading">Student Details</h2>
      <form onSubmit={handleSubmit} className="student-form-form">
        <label className="student-form-label">
          Roll Number:
          <input
            type="text"
            name="roll_no"
            maxLength="10"
            required
            className="student-form-input"
            value={formData.roll_no}
            onChange={handleChange}
          />
        </label>

        <label className="student-form-label">
          Branch:
          <select
            name="branch"
            required
            className="student-form-select"
            value={formData.branch}
            onChange={handleChange}
          >
            <option value="">Select Branch</option>
            <option value="CSM">CSM</option>
            <option value="CSE">CSE</option>
            <option value="CSN">CSN</option>
            <option value="CSD">CSD</option>
            <option value="CIV">CIV</option>
            <option value="MECH">MECH</option>
            <option value="CST">CST</option>
            <option value="CSC">CSC</option>
            <option value="CAI">CAI</option>
          </select>
        </label>

        <label className="student-form-label">
          Year:
          <select
            name="year"
            required
            className="student-form-select"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>

        <label className="student-form-label">
          Semester:
          <select
            name="semester"  
            required
            className="student-form-select"
            value={formData.semester}
            onChange={handleChange}
          >
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>

        <label className="student-form-label">
          Section:
          <select
            name="section"
            required
            className="student-form-select"
            value={formData.section}
            onChange={handleChange}
          >
            <option value="">Select Section</option>
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
            <option value="K">K</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="N">N</option>
            <option value="O">O</option>
            <option value="P">P</option>
          </select>
        </label>

        <div className="student-form-buttons">
          <button type="button" onClick={handleBack} className="student-form-back-button">
            Back
          </button>
          <button type="submit" className="student-form-submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentDetailsForm;

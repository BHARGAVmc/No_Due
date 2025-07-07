import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentDetailsForm.css";

const StudentDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    sem: "",
    section: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/submit/", formData);
      navigate("/sdetailsdash");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Branch :
          <select name="branch" onChange={handleChange} required>
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

        <label>
          Year :
          <select name="year" onChange={handleChange} required>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </label>

        <label>
          Sem :
          <select name="sem" onChange={handleChange} required>
            <option value="">Select Sem</option>
            <option value="1">1st Sem</option>
            <option value="2">2nd Sem</option>
          </select>
        </label>

        <label>
          Section :
          <select name="section" onChange={handleChange} required>
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentDetailsForm;

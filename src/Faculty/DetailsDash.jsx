import React, { useState } from "react";
import "./approval.css";

const Approval = () => {
  const [students, setStudents] = useState([
    { roll: "23691A3301", remarks: "" },
    { roll: "23691A3302", remarks: "" },
    { roll: "23691A3304", remarks: "" },
    { roll: "23691A3305", remarks: "" },
  ]);

  const initialItems = ["Assignment 1", "Assignment 2", "Certificate"];
  const [dropdownItems, setDropdownItems] = useState(initialItems);
  const [selectedRoll, setSelectedRoll] = useState(null);
  const [otherInput, setOtherInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleRoll = (roll) => {
    setSelectedRoll(selectedRoll === roll ? null : roll);
  };

  const handleAddOther = () => {
    const trimmed = otherInput.trim();
    if (trimmed && !dropdownItems.includes(trimmed)) {
      setDropdownItems([...dropdownItems, trimmed]);
    }
    setOtherInput("");
  };

  const handleDeleteItem = (itemToDelete) => {
    setDropdownItems(dropdownItems.filter((item) => item !== itemToDelete));
  };

  const handleSave = () => {
    alert("Changes saved successfully!");
  };

  return (
    <div className="container">
      <div className="top-bar">
        <button className="back-btn">Back</button>
        <h1>AI & MI Section</h1>
        <div className="dropdown-container">
          <button
            className="add-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            ADD ▾
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              {dropdownItems.map((item, idx) => (
                <div key={idx} className="dropdown-item">
                  <span>{item}</span>
                  <span
                    className="delete-icon"
                    onClick={() => handleDeleteItem(item)}
                  >
                    ✖
                  </span>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add Others"
                value={otherInput}
                onChange={(e) => setOtherInput(e.target.value)}
              />
              <button className="add-button" onClick={handleAddOther}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
{students.map((student, index) => (
  <div key={index} className="student-card">
    {/* Roll Number (click to toggle dropdown) */}
    <div className="roll" onClick={() => toggleRoll(student.roll)}>
      <strong>{student.roll}</strong>
    </div>

    {/* Dropdown with checkbox items, shown only when selected */}
    {selectedRoll === student.roll && (
      <div className="dropdown-box">
        {dropdownItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px",
            }}
          >
            <label>
              <input type="checkbox" /> {item}
            </label>
            {item.toLowerCase().includes("certificate") && (
              <button
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                  backgroundColor: "#0288d1",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
                onClick={() => alert(`Viewing ${item} for ${student.roll}`)}
              >
                View
              </button>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Remarks box always shown */}
    <input
      type="text"
      placeholder="Remarks"
      value={student.remarks}
      onChange={(e) => {
        const newStudents = [...students];
        newStudents[index].remarks = e.target.value;
        setStudents(newStudents);
      }}
      style={{
        marginTop: "10px",
        padding: "8px",
        width: "100%",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
    />
  </div>
))}

      

      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Approval;

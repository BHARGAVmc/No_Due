// import React, { useEffect,useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from "axios";
// import "./DetailsDash.css";

// const Approval = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
// const { email,department, years, section } = location.state || {};

//   const [students, setStudents] = useState([
//     { roll: "23691A3301", remarks: "" },
//     { roll: "23691A3302", remarks: "" },
//     { roll: "23691A3304", remarks: "" },
//     { roll: "23691A3305", remarks: "" },
//   ]);

//   const initialItems = ["Assignment 1", "Assignment 2", "Certificate"];
//   const [dropdownItems, setDropdownItems] = useState(initialItems);
//   const [selectedRoll, setSelectedRoll] = useState(null);
//   const [otherInput, setOtherInput] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);

// useEffect(() => {
//   const fetchStudentData = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/fdetails/get-student-details/", {
//         email: email,
//         branch: department,
//         year: years,
//         semester: "1",
//         section: section
//       });

//       const rollList = response.data.roll_numbers;
//       const requirements = response.data.requirements;

//       // Build student array with remarks and grouped requirements
//       const formattedStudents = rollList
//           .sort() // ascending order
//           .map((roll) => {
//             const studentRequirements = requirements.filter(req => req.roll_no === roll);
//             return {
//               roll,
//               remarks: studentRequirements[0]?.remarks || "",
//               requirements: studentRequirements
//             };
//           });


//       setStudents(formattedStudents);

//       // Set dropdown items from requirement types (remove duplicates)
//       const allReqTypes = [...new Set(requirements.map(req => req.requirement_type))];
//       setDropdownItems(allReqTypes);

//     } catch (error) {
//       console.error("Error fetching student data:", error);
//     }
//   };

//   fetchStudentData();
// }, []);

//   const toggleRoll = (roll) => {
//     setSelectedRoll(selectedRoll === roll ? null : roll);
//   };

//   // const handleAddOther = () => {
//   //   const trimmed = otherInput.trim();
//   //   if (trimmed && !dropdownItems.includes(trimmed)) {
//   //     setDropdownItems([...dropdownItems, trimmed]);
//   //   }
//   //   setOtherInput("");
//   // };
// const handleAddOther = async () => {
//   const trimmed = otherInput.trim();
//   if (!trimmed || dropdownItems.includes(trimmed)) return;

//   try {
//     await axios.post("http://127.0.0.1:8000/fdetails/add-requirement/", {
//       email: email,
//       branch: department,
//       year: years,
//       semester: "1",
//       section: section,
//       requirement_type: trimmed,
//       remarks: "Not Submitted"
//     });

//     // After adding requirement, reload updated data
//     setOtherInput("");
//     setShowDropdown(false);
//     window.location.reload(); // Or better: call fetchStudentData() again if moved to separate function

//   } catch (error) {
//     console.error("Error adding requirement:", error);
//   }
// };

//   const handleDeleteItem = (itemToDelete) => {
//     setDropdownItems(dropdownItems.filter((item) => item !== itemToDelete));
//   };

//   const handleSave = async () => {
//   try {
//     const updates = [];

//     students.forEach((student) => {
//       student.requirements.forEach((req) => {
//         updates.push({
//           roll_no: student.roll,
//           subject_code: req.subject_code,
//           requirement_type: req.requirement_type,
//           is_completed: req.is_completed,
//           remarks: student.remarks
//         });
//       });
//     });

//     await axios.post("http://127.0.0.1:8000/fdetails/update-requirements/", {
//       email: email,
//       updates: updates
//     });

//     alert("Changes saved successfully!");
//   } catch (error) {
//     console.error("Error saving updates:", error);
//     alert("Failed to save. Try again.");
//   }
// };


//   return (
//     <div className="cont">
//       <div className="top">
//         <button className="back-button" onClick={() => navigate("/FacultyDash", {
//             state: { department, years, section }
//           })}>
//           Back
//         </button>
//         <h1>AI & MI Section</h1>
//         <button className="add-button" onClick={() => setShowDropdown(true)}>
//           ADD ➕
//         </button>
//       </div>

//       {showDropdown && (
//         <div className="side-panel">
//           <div className="side-panel-header">
//             <h4>Add Items</h4>
//             <span className="close-icon" onClick={() => setShowDropdown(false)}>
//               ✖
//             </span>
//           </div>

//           {dropdownItems.map((item, idx) => (
//             <div key={idx} className="ditem">
//               <span>{item}</span>
//               <span
//                 className="delete-icon"
//                 onClick={() => handleDeleteItem(item)}
//               >
//                 ✖
//               </span>
//             </div>
//           ))}

//           <input
//             type="text"
//             placeholder="Add Others"
//             value={otherInput}
//             onChange={(e) => setOtherInput(e.target.value)}
//           />
//           <button className="add-button" onClick={handleAddOther}>
//             Add
//           </button>
//         </div>
//       )}

//       {students.map((student, index) => (
//         <div key={index} className="scard">
//           <div className="roll" onClick={() => toggleRoll(student.roll)}>
//             <strong>{student.roll}</strong>
//           </div>

//           {selectedRoll === student.roll && (
//             <div className="dbox">
//               {dropdownItems.map((item, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   <label>
//                   <input
//                   type="checkbox"
//                   checked={
//                     student.requirements?.find((r) => r.requirement_type === item)?.is_completed || false
//                   }
//                   onChange={(e) => {
//                     const updatedStudents = [...students];
//                     const targetStudent = updatedStudents[index];

//                     const reqIndex = targetStudent.requirements.findIndex(
//                       (r) => r.requirement_type === item
//                     );

//                     if (reqIndex >= 0) {
//                       targetStudent.requirements[reqIndex].is_completed = e.target.checked;
//                     }

//                     setStudents(updatedStudents);
//                   }}
//                 />

//                   {item}
//                   </label>
//                   {item.toLowerCase().includes("certificate") && (
//                     <button
//                       style={{
//                         padding: "4px 8px",
//                         fontSize: "12px",
//                         cursor: "pointer",
//                         backgroundColor: "#0288d1",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "4px",
//                       }}
//                       onClick={()=>navigate('/CertificateView')}
//                     >
//                       View
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           <input
//             type="text"
//             placeholder="Remarks"
//             value={student.remarks}
//             onChange={(e) => {
//               const newStudents = [...students];
//               newStudents[index].remarks = e.target.value;
//               setStudents(newStudents);
//             }}
//             style={{
//               marginTop: "10px",
//               padding: "8px",
//               width: "100%",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>
//       ))}

//       <button className="save-button" onClick={handleSave}>
//         Save
//       </button>
//     </div>
//   );
// };

// export default Approval;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailsDash.css";

const Approval = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email,password, department, years, section } = location.state || {};

  const [students, setStudents] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selectedRoll, setSelectedRoll] = useState(null);
  const [otherInput, setOtherInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [softRequired, setSoftRequired] = useState(false);
const [hardRequired, setHardRequired] = useState(false);
const [selectAllSubmitted, setSelectAllSubmitted] = useState({});



  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/fdetails/get-student-details/", {
          email,
          branch: department,
          year: years,
          semester: "1",
          section
        });

        const rollList = response.data.roll_numbers;
        const requirements = response.data.requirements;

        const formattedStudents = rollList
          .sort()
          .map((roll) => {
            const studentRequirements = requirements.filter(req => req.roll_no === roll);
         return {
            roll,
            remarks: studentRequirements[0]?.remarks || "",
            requirements: studentRequirements.map(req => ({
              ...req,
              soft_copy_required: req.soft_copy_required || false,
              hard_copy_required: req.hard_copy_required || false
            }))
          };

          });

        setStudents(formattedStudents);

        const allReqTypes = [...new Set(requirements.map(req => req.requirement_type))];
        setDropdownItems(allReqTypes);

      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [email, department, years, section]);

  const toggleRoll = (roll) => {
    setSelectedRoll(selectedRoll === roll ? null : roll);
  };
  const handleAddOther = async () => {
  const trimmed = otherInput.trim();
  if (!trimmed || dropdownItems.includes(trimmed)) return;

  try {
    await axios.post("http://127.0.0.1:8000/fdetails/add-requirement/", {
      email,
      branch: department,
      year: years,
      semester: "1",
      section,
      requirement_type: trimmed,
      soft_copy_required: softRequired,
      hard_copy_required: hardRequired,
      remarks: "Not Submitted"
    });

    setOtherInput("");
    setSoftRequired(false);
    setHardRequired(false);
    setShowDropdown(false);
    window.location.reload();
  } catch (error) {
    console.error("Error adding requirement:", error);
  }
};


  const handleDeleteItem = async (itemToDelete) => {
  try {
    await axios.post("http://127.0.0.1:8000/fdetails/delete-requirement/", {
      email,
      branch: department,
      year: years,
      semester: "1",
      section,
      requirement_type: itemToDelete
    });

    setDropdownItems(dropdownItems.filter((item) => item !== itemToDelete));

    // Also remove from each student's requirements
    const updatedStudents = students.map(student => ({
      ...student,
      requirements: student.requirements.filter(r => r.requirement_type !== itemToDelete)
    }));
    setStudents(updatedStudents);

  } catch (error) {
    console.error("Error deleting requirement:", error);
    alert("Failed to delete requirement.");
  }
};
const handleSave = async () => {
  try {
    const updates = [];

    const updatedStudents = [...students];

    updatedStudents.forEach((student, studentIndex) => {
      student.requirements.forEach((req, reqIndex) => {
        let isCompleted = req.is_completed;

        if (req.requirement_type.toLowerCase().includes("certificate")) {
         const softRequired = req.soft_copy_required;
        const hardRequired = req.hard_copy_required;
        const softSubmitted = req.soft_copy_submitted;
        const hardSubmitted = req.hard_copy_submitted;

        if (softRequired && hardRequired) {
          isCompleted = softSubmitted && hardSubmitted;
        } else if (softRequired) {
          isCompleted = softSubmitted;
        } else if (hardRequired) {
          isCompleted = hardSubmitted;
        } else {
          isCompleted = req.is_completed; 
        }
        updatedStudents[studentIndex].requirements[reqIndex].is_completed = isCompleted;
       }
        updates.push({
          roll_no: student.roll,
          subject_code: req.subject_code,
          requirement_type: req.requirement_type,
          is_completed: isCompleted,
          remarks: student.remarks,
          soft_copy_submitted: req.soft_copy_submitted || false,
          hard_copy_submitted: req.hard_copy_submitted || false,
        });
      });
    });
    const response = await axios.post("http://127.0.0.1:8000/fdetails/update-requirements/", {
      email,
      updates,
    });

    if (response.status === 200 || response.status === 201) {
      setStudents(updatedStudents); 
      alert("Changes saved successfully!");
    } else {
      alert("Failed to save. Try again.");
    }
  } catch (error) {
    console.error("Error saving updates:", error);
    alert("Failed to save. Try again.");
  }
};
// const handleSelectAllToggle = (requirementName) => {
//   const isCertificate = requirementName.toLowerCase().includes("certificate");

//   const updatedStudents = students.map((student) => {
//     const updatedRequirements = student.requirements.map((req) => {
//       if (req.requirement_type === requirementName) {
//         return {
//           ...req,
//           is_completed: true,
//           ...(isCertificate && {
//             soft_copy_submitted: true,
//             hard_copy_submitted: true,
//           }),
//         };
//       }
//       return req;
//     });

//     return {
//       ...student,
//       requirements: updatedRequirements,
//     };
//   });

//   setStudents(updatedStudents);

//   updatedStudents.forEach((student) => {
//     const selectedRequirement = student.requirements.find(
//       (req) => req.requirement_type === requirementName
//     );

//     if (selectedRequirement) {
//       const payload = {
//         roll_no: student.roll,
//         subject_code: selectedRequirement.subject_code,
//         requirement_type: selectedRequirement.requirement_type,
//         is_completed: true,
//         ...(isCertificate && {
//           soft_copy_submitted: true,
//           hard_copy_submitted: true,
//         }),
//         remarks: student.remarks || "",
//       };

//       axios
//         .post("http://127.0.0.1:8000/fdetails/update-requirements/", {
//           email,
//           updates: [payload],
//         })
//         .then(() => {
//           console.log(`✅ Updated for ${student.roll}`);
//         })
//         .catch((error) => {
//           console.error(`❌ Error updating for ${student.roll}:`, error);
//         });
//     }
//   });

//   // ✅ Update checkbox UI state
//   setSelectAllSubmitted((prev) => ({
//     ...prev,
//     [requirementName]: !prev[requirementName],
//   }));
// };

const handleSelectAllToggle = (requirementName) => {
  const isCertificate = requirementName.toLowerCase().includes("certificate");
  const isCurrentlySelected = !!selectAllSubmitted[requirementName];

  const updatedStudents = students.map((student) => {
    const updatedRequirements = student.requirements.map((req) => {
      if (req.requirement_type === requirementName) {
        return {
          ...req,
          is_completed: !isCurrentlySelected,
          ...(isCertificate && {
            soft_copy_submitted: !isCurrentlySelected,
            hard_copy_submitted: !isCurrentlySelected,
          }),
        };
      }
      return req;
    });

    return {
      ...student,
      requirements: updatedRequirements,
    };
  });

  setStudents(updatedStudents);

  // Backend update: send toggled values
  updatedStudents.forEach((student) => {
    const selectedRequirement = student.requirements.find(
      (req) => req.requirement_type === requirementName
    );

    if (selectedRequirement) {
      const payload = {
        roll_no: student.roll,
        subject_code: selectedRequirement.subject_code,
        requirement_type: selectedRequirement.requirement_type,
        is_completed: !isCurrentlySelected,
        ...(isCertificate && {
          soft_copy_submitted: !isCurrentlySelected,
          hard_copy_submitted: !isCurrentlySelected,
        }),
        remarks: student.remarks || "",
      };

      axios
        .post("http://127.0.0.1:8000/fdetails/update-requirements/", {
          email,
          updates: [payload],
        })
        .then(() => {
          console.log(`✅ Updated for ${student.roll}`);
        })
        .catch((error) => {
          console.error(`❌ Error updating for ${student.roll}:`, error);
        });
    }
  });

  // Toggle checkbox state
  setSelectAllSubmitted((prev) => ({
    ...prev,
    [requirementName]: !isCurrentlySelected,
  }));
};




  return (
    <div className="cont">
      <div className="top">
        <button
          className="back-button"
          onClick={() =>
            navigate("/FacultyDash", {
              replace: true, 
              state: {  email, password,department, years, section },
            })
          }
        >
          Back
        </button>
        <h1>AI & MI Section</h1>
        <button className="add-button" onClick={() => setShowDropdown(true)}>
          ADD ➕
        </button>
      </div>

      {showDropdown && (
        <div className="side-panel">
          <div className="side-panel-header">
            <h4>Add Items</h4>
            <span className="close-icon" onClick={() => setShowDropdown(false)}>
              ✖
            </span>
          </div>

          {dropdownItems.map((item, idx) => (
            <div key={idx} className="ditem">
              <span>{item}</span>
              <span className="delete-icon" onClick={() => handleDeleteItem(item)}>
                ✖
              </span>
              <div className="select-all-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={!!selectAllSubmitted[item]}
                    onChange={() => handleSelectAllToggle(item)}
                  />
                  For All
                </label>
              </div>
            </div>
          ))}

           <input
            type="text"
            placeholder="Add Requirement"
            value={otherInput}
            onChange={(e) => setOtherInput(e.target.value)}
          />

          <div className="copy-options">
            <label>
              <input
                type="checkbox"
                checked={softRequired}
                onChange={(e) => setSoftRequired(e.target.checked)}
              />
              Soft Copy Required
            </label>
            <label>
              <input
                type="checkbox"
                checked={hardRequired}
                onChange={(e) => setHardRequired(e.target.checked)}
              />
              Hard Copy Required
            </label>
          </div>

          <button className="add-button" onClick={handleAddOther}>
            Add
          </button>

        </div>
      )}

      {students.map((student, index) => (
        <div key={index} className="scard">
          <div className="roll" onClick={() => toggleRoll(student.roll)}>
            <strong>{student.roll}</strong>
          </div>
          {selectedRoll === student.roll && (
            <div className="dbox">
              {dropdownItems.map((item, i) => (
                <div key={i} className="requirement-item">
                  <label>
                    <input
                          type="checkbox"
                          checked={
                            student.requirements?.find((r) => r.requirement_type === item)?.is_completed || false
                          }
                          disabled={item.toLowerCase().includes("certificate")}
                          onChange={(e) => {
                            const updatedStudents = [...students];
                            const reqIndex = updatedStudents[index].requirements.findIndex(
                              (r) => r.requirement_type === item
                            );
                            // Only allow manual update if NOT a certificate
                            if (reqIndex >= 0 && !item.toLowerCase().includes("certificate")) {
                              updatedStudents[index].requirements[reqIndex].is_completed = e.target.checked;
                            }
                            setStudents(updatedStudents);
                          }}
                        />
                    {item}
                  </label>
                  {item.toLowerCase().includes("certificate") && (
                <div className="cert-options">
                  {(() => {
                    const req = student.requirements.find(r => r.requirement_type === item);

                    return (
                      <>
                        {req?.soft_copy_required && (
                            <label>
                              <input
                                type="checkbox"
                                checked={req?.soft_copy_submitted || false}
                                onChange={(e) => {
                                  const updatedStudents = [...students];
                                  const reqIndex = updatedStudents[index].requirements.findIndex(r => r.requirement_type === item);
                                  if (reqIndex >= 0) {
                                    updatedStudents[index].requirements[reqIndex].soft_copy_submitted = e.target.checked;
                                  }
                                  setStudents(updatedStudents);
                                }}
                              />
                              Soft Copy Submitted
                            </label>
                          )}

                          {req?.soft_copy_required && req?.soft_copy_file && (
                            <button
                              className="view-button"
                              onClick={() => navigate("/CertificateView", {
                                state: {
                                  roll_no: student.roll,
                                  subject_code: req.subject_code,
                                  requirement_type: req.requirement_type
                                }
                              })}
                            >
                              View
                            </button>
                          )}

                          {req?.hard_copy_required && (
                            <label>
                              <input
                                type="checkbox"
                                checked={req?.hard_copy_submitted || false}
                                onChange={(e) => {
                                  const updatedStudents = [...students];
                                  const reqIndex = updatedStudents[index].requirements.findIndex(r => r.requirement_type === item);
                                  if (reqIndex >= 0) {
                                    updatedStudents[index].requirements[reqIndex].hard_copy_submitted = e.target.checked;
                                  }
                                  setStudents(updatedStudents);
                                }}
                              />
                              Hard Copy Submitted
                            </label>
                          )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder="Remarks"
            value={student.remarks}
            onChange={(e) => {
              const newStudents = [...students];
              newStudents[index].remarks = e.target.value;
              setStudents(newStudents);
            }}
            className="remarks-input"
          />
        </div>
      ))}

      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Approval;

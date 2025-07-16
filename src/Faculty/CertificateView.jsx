import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CertificateView = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ⬅ Import and use this
  const { roll_no, subject_code, requirement_type } = location.state || {};
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let url = null;

    const fetchCertificate = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/fdetails/get-certificate/?roll_no=${roll_no}&subject_code=${subject_code}&requirement_type=${requirement_type}`
        );

        if (!res.ok) throw new Error("Failed to fetch file");

        const blob = await res.blob();
        url = URL.createObjectURL(blob);
        setFileUrl(url);
      } catch (err) {
        console.error("Error fetching file", err);
        setError("Failed to load certificate.");
      }
    };

    if (roll_no && subject_code && requirement_type) {
      fetchCertificate();
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [roll_no, subject_code, requirement_type]);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "15px" }}>
        ⬅ Back
      </button>
      <h2>Certificate Viewer</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileUrl ? (
        <>
          <iframe
            src={fileUrl}
            width="100%"
            height="600px"
            title="Certificate Preview"
          />
          <a href={fileUrl} download={`${roll_no}_${requirement_type}.pdf`}>
            <button style={{ marginTop: "10px" }}>Download Certificate</button>
          </a>
        </>
      ) : (
        !error && <p>Loading certificate...</p>
      )}
    </div>
  );
};

export default CertificateView;

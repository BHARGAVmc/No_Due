import React from 'react';
import './CertificateView.css';

function CertificateView({ onBack }) {
  const handleApprove = () => alert("✅ Certificate Approved");
  const handleDeny = () => alert("❌ Certificate Denied");

  return (
    <div className="certificate-wrapper">
      {/* Top-left back button */}
      <button className="back-btn" onClick={onBack || (() => alert("Back clicked"))}>←</button>

      <h1 className="heading">Certificate</h1>

      {/* Full-width image view */}
      <div className="image-container">
        <img
          src="https://i.ibb.co/Hqpkxwd/tha2.jpg"  // Replace with your actual image URL
          alt="Certificate"
          className="certificate-image"
        />
      </div>

      <div className="action-buttons">
        <button className="approve-btn" onClick={handleApprove}>Approve</button>
        <button className="deny-btn" onClick={handleDeny}>Deny</button>
      </div>
    </div>
  );
}

export default CertificateView;

import React, { useState, useRef } from 'react';
import './SDetailsDash.css';

// Item component
const Item = ({ title, checked, onChange, status, onClickTitle }) => {
    const handleTitleClick = () => {
        onClickTitle();
        alert(checked ? `${title} was submitted` : `You have not submitted ${title}`);
    };

    return (
        <div className="sdetails-item">
            <div className="sdetails-item-content">
                <span className="sdetails-clickable" onClick={handleTitleClick}>
                    {title}
                </span>
                {status && <span className="sdetails-status">{status}</span>}
            </div>
            <div
                title={checked ? "Already submitted" : ""}
                className={`sdetails-checkbox ${checked ? 'checked disabled' : ''}`}
                onClick={() => {
                    if (!checked) {
                        onChange();
                    }
                }}
            />
        </div>
    );
};

// SubItem component
const SubItem = ({ title, checked, onChange, onUpload }) => {
    const fileInputRef = useRef();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];
            if (allowedTypes.includes(file.type)) {
                onUpload(file);
            } else {
                alert('Only PDF, DOC, and DOCX files are allowed.');
            }
        }
    };

    return (
        <div className="sdetails-sub-item">
            <div className="sdetails-sub-item-content">
                <span>{title}</span>
                {title === 'Soft Copy' && (
                    <>
                        <button className="sdetails-upload-button" onClick={handleUploadClick}>
                            Upload
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                        />
                    </>
                )}
            </div>
            <div
                title={checked ? "Already submitted" : ""}
                className={`sdetails-checkbox ${checked ? 'checked disabled' : ''}`}
                onClick={() => {
                    if (!checked) {
                        onChange();
                    }
                }}
            />
        </div>
    );
};

function App() {
    const [checkedItems, setCheckedItems] = useState({
        'Assignment 1': false,
        'Assignment 2': false,
        'NPTEL Certificate': false,
        'Hard Copy': false,
        'Soft Copy': false,
    });

    const [showDetails, setShowDetails] = useState(false);

    const handleCheck = (item) => {
        setCheckedItems((prev) => {
            const newState = { ...prev, [item]: !prev[item] };
            if (item === 'Hard Copy' || item === 'Soft Copy') {
                newState['NPTEL Certificate'] = newState['Hard Copy'] || newState['Soft Copy'];
            }
            return newState;
        });
    };

    const handleTitleClick = (item) => {
        if (item === 'NPTEL Certificate') {
            setShowDetails((prev) => !prev);
        }
    };

    const handleUpload = (file) => {
        console.log('Uploaded file:', file.name);
        setCheckedItems((prev) => ({
            ...prev,
            'Soft Copy': true,
            'NPTEL Certificate': true,
        }));
        alert(`File "${file.name}" uploaded successfully!`);
    };

    // Static 0% Progress
    const percentage = 0;
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    const itemTitles = ['Assignment 1', 'Assignment 2', 'NPTEL Certificate'];
    const subItemTitles = ['Hard Copy', 'Soft Copy'];

    return (
        <div className="sdetails-container">
            <div className="sdetails-header">
                <button onClick={() => alert('You went back')}>←</button>
                <span className="title">Subject 1</span>
                <div className="sdetails-percentage-container">
                    <svg
                        width="50"
                        height="50"
                        className="sdetails-progress-circle"
                        style={{ pointerEvents: 'none' }}
                    >
                        <circle
                            className="sdetails-progress-circle-bg"
                            cx="25"
                            cy="25"
                            r={radius}
                        />
                        <circle
                            className="sdetails-progress-circle-fill"
                            cx="25"
                            cy="25"
                            r={radius}
                            strokeDasharray={strokeDasharray}
                        />
                        <g transform="rotate(90, 25, 25)">
                            <text
                                className="sdetails-progress-circle-text"
                                x="25"
                                y="25"
                                textAnchor="middle"
                                dy=".3em"
                            >
                                0%
                            </text>
                        </g>
                    </svg>
                </div>
            </div>

            {itemTitles.map((title) => (
                <Item
                    key={title}
                    title={title}
                    checked={checkedItems[title]}
                    onChange={() => handleCheck(title)}
                    status={title === 'NPTEL Certificate' && checkedItems[title] ? 'Uploaded' : null}
                    onClickTitle={() => handleTitleClick(title)}
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
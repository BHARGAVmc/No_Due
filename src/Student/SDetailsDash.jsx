import React, { useState, useRef } from 'react';
import './SDetailsDash.css';
// Item component
const Item = ({ title, checked, onChange, status, onClickTitle }) => {
    const handleTitleClick = () => {
        onClickTitle();
        alert(checked ? `${title} was submitted` : `You have not submitted ${title}`);
    };
    return (
        <div className="item">
            <div className="item-content">
                <span
                    className="cursor-pointer hover:underline"
                    onClick={handleTitleClick}
                >
                    {title}
                </span>
                {status && <span className="status">{status}</span>}
            </div>
            <div
                className={`custom-checkbox ${checked ? 'checked' : ''}`}
                onClick={onChange}
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
        <div className="sub-item">
            <div className="sub-item-content">
                <span>{title}</span>
                {title === 'Soft Copy' && (
                    <>
                        <button className="upload-button" onClick={handleUploadClick}>
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
                className={`custom-checkbox ${checked ? 'checked' : ''}`}
                onClick={onChange}
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
    const totalTasks = 5;
    const completedTasks = Object.values(checkedItems).filter(Boolean).length;
    const percentage = (completedTasks / totalTasks) * 100;
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    return (
        <div className="container">
            <div className="header">
                <button>←</button>
                <span className="title">Subject 1</span>
                <div className="percentage-container">
                    <svg width="50" height="50" className="progress-circle">
                        <circle
                            className="progress-circle-bg"
                            cx="25"
                            cy="25"
                            r={radius}
                        />
                        <circle
                            className="progress-circle-fill"
                            cx="25"
                            cy="25"
                            r={radius}
                            strokeDasharray={strokeDasharray}
                        />
                        <g transform="rotate(90, 25, 25)">
                            <text
                                className="progress-circle-text"
                                x="25"
                                y="25"
                                textAnchor="middle"
                                dy=".3em"
                            >
                                {percentage.toFixed(0)}%
                            </text>
                        </g>
                    </svg>
                </div>
            </div>
            <Item
                title="Assignment 1"
                checked={checkedItems['Assignment 1']}
                onChange={() => handleCheck('Assignment 1')}
                status={null}
                onClickTitle={() => handleTitleClick('Assignment 1')}
            />
            <Item
                title="Assignment 2"
                checked={checkedItems['Assignment 2']}
                onChange={() => handleCheck('Assignment 2')}
                status={null}
                onClickTitle={() => handleTitleClick('Assignment 2')}
            />
            <Item
                title="NPTEL Certificate"
                checked={checkedItems['NPTEL Certificate']}
                onChange={() => handleCheck('NPTEL Certificate')}
                status={checkedItems['NPTEL Certificate'] ? 'Uploaded' : null}
                onClickTitle={() => handleTitleClick('NPTEL Certificate')}
            />
            {showDetails && (
                <div className="sub-items">
                    <SubItem
                        title="Hard Copy"
                        checked={checkedItems['Hard Copy']}
                        onChange={() => handleCheck('Hard Copy')}
                        onUpload={() => {}}
                    />
                    <SubItem
                        title="Soft Copy"
                        checked={checkedItems['Soft Copy']}
                        onChange={() => handleCheck('Soft Copy')}
                        onUpload={handleUpload}
                    />
                </div>
            )}
        </div>
    );
}
export default App;
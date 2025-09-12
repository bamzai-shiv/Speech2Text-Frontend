
import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div className="file-upload-container">
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="file-upload" 
          className="file-input" 
          onChange={handleChange} 
          accept="audio/*,video/*"
        />
        <label htmlFor="file-upload" className="upload-label">
          <div className="upload-icon">
            {/* Simple SVG upload icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-7 9c-4.97 0-9 2.24-9 5h18c0-2.76-4.03-5-9-5z"/>
            </svg>
          </div>
          {file ? (
            <div className="file-info">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          ) : (
            <>
              <p>Drag & drop your file here or click to browse</p>
              <p className="file-types">Supports: MP3, WAV, MP4, AVI, etc.</p>
            </>
          )}
        </label>
      </div>

      {file && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="upload-button" onClick={() => onFileUpload(file)}>
            Transcribe Now
          </button>
          <button className="upload-button" onClick={handleRemove} style={{ backgroundColor: '#888' }}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;


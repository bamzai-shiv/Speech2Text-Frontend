import React from 'react';
import './TranscriptionResult.css';

const TranscriptionResult = ({ file, transcription, isLoading, error }) => {
  return (
    <div className="result-container">
      <div className="preview-section">
        <h3>File Preview</h3>
        {file.type.startsWith('audio/') ? (
          <div className="audio-preview">
            <audio controls src={URL.createObjectURL(file)} />
          </div>
        ) : (
          <div className="video-preview">
            <video controls src={URL.createObjectURL(file)} width="100%" />
          </div>
        )}
        <div className="file-details">
          <p><strong>Name:</strong> {file.name}</p>
          <p><strong>Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          <p><strong>Type:</strong> {file.type}</p>
        </div>
      </div>
      <div className="result-section">
        <div className="result-header">
          <h3>Transcription Result</h3>
          <div className="result-actions">
            <button className="action-button">Copy</button>
            <button className="action-button">Download</button>
          </div>
        </div>
        {isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Transcribing your file...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        ) : (
          <div className="result-content">
            {transcription || 'Your transcription will appear here...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionResult;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import TranscriptionResult from "../../components/TranscriptionResult/TranscriptionResult";
import "./Results.css";

const Results = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const { file, language, model } = location.state || {};
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!file) {
      setError("No file provided");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    const timer = setTimeout(() => {
      try {
        // In a real app, you would call your API here
        // const response = await transcribeAPI(file, language, model);
        // setTranscription(response.transcription);

        // Mock response
        setTranscription(`This is a mock transcription of your ${
          file.type.split("/")[0]
        } file.
        
Selected language: ${language}
Selected model: ${model}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.

In a real application, this would be the actual transcription of your audio/video file. The API would process the file and return the text content here.`);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to transcribe file. Please try again.");
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, 
  [file, language, model]);

  if (!file) {
    return (
      <div className="results-page">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <div className="error-message">
            No file provided. Please go back and upload a file.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="results-page">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <TranscriptionResult
          file={file}
          transcription={transcription}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default Results;

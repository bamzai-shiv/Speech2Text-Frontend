import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import FileUpload from '../../components/FileUpload/FileUpload';
import LanguageModelSelector from '../../components/LanguageModelSelector/LanguageModelSelector';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ darkMode, toggleDarkMode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedModel, setSelectedModel] = useState('basic');
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    // In a real app, you would upload the file to your API here
    // For now, we'll just navigate to the results page with the file
    navigate('/results', { state: { file, language: selectedLanguage, model: selectedModel } });
  };

  return (
    <div className="home-page">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <div className="hero-section">
          <h2>Convert Audio & Video to Text</h2>
          <p>Fast, accurate transcription in multiple Indian languages</p>
        </div>
        <FileUpload onFileUpload={handleFileUpload} />
        <LanguageModelSelector
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
      </main>
    </div>
  );
};

export default Home;
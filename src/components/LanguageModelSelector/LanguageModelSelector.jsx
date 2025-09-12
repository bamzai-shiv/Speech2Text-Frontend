import React, { useEffect, useState } from 'react';
import './LanguageModelSelector.css';

const LanguageModelSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedModel,
  setSelectedModel,
}) => {
  const [languages, setLanguages] = useState([]);
  const [models, setModels] = useState([]);

  const fallbackLanguages = [
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'ur', name: 'Urdu' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'or', name: 'Odia' },
    { code: 'as', name: 'Assamese' },
    { code: 'en', name: 'English' },
  ];

  const fallbackModels = [
    { id: 'tiny', name: 'Tiny Model' },
    { id: 'base', name: 'Base Model' },
    { id: 'small', name: 'Small Model' },
    { id: 'medium', name: 'Medium Model' },
    { id: 'large', name: 'Large Model' },
    { id: 'large-v2', name: 'Large-v2 Model' },
    { id: 'large-v3', name: 'Large-v3 Model' },
    { id: 'distil-large', name: 'Distil-large Model' },
    { id: 'turbo', name: 'Turbo Model' },
  ];

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${baseUrl}/languages/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Error response from /languages/:', text);
          throw new Error('Failed to fetch languages');
        }

        const data = await response.json();
        setLanguages(data.languages || fallbackLanguages);
      } catch (error) {
        console.error('Error loading languages:', error);
        setLanguages(fallbackLanguages);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await fetch(`${baseUrl}/select_model/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Error response from /select_model/:', text);
          throw new Error('Failed to fetch models');
        }

        const data = await response.json();
        setModels(data.models || fallbackModels);
      } catch (error) {
        console.error('Error loading models:', error);
        setModels(fallbackModels);
      }
    };

    fetchLanguages();
    fetchModels();
  }, [baseUrl, apiKey]);

  return (
    <div className="selector-container">
      <div className="selector-group">
        <label htmlFor="language-select" className="selector-label">
          Select Language
        </label>
        <select
          id="language-select"
          className="selector-dropdown"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="selector-group">
        <label htmlFor="model-select" className="selector-label">
          Select Model
        </label>
        <select
          id="model-select"
          className="selector-dropdown"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageModelSelector;

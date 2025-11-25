import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SHAPPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

function SHAPPage({ themeColor }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shapImage, setShapImage] = useState(null);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
        setResults(null);
        setShapImage(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAnalysis = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/shap/generate`, { image });
      setResults(response.data);
      setShapImage(response.data.shap_image);
    } catch (error) {
      console.error('Error:', error);
      alert('SHAP generation failed. Please ensure the backend server is running.');
    }
    setLoading(false);
  };
  
  return (
    <div className="shap-page">
      <div className="header">
        <div className="icon-circle" style={{ background: 'linear-gradient(135deg, #9b59b6, #8e44ad)' }}>
          🧠
        </div>
        <h1 style={{ color: '#9b59b6' }}>SHAP Analysis</h1>
        <p className="subtitle">Explainable AI for transparent diagnostics</p>
      </div>
      
      <div className="card">
        <h3 style={{ color: '#9b59b6' }}>Visual Explanation</h3>
        <p className="section-subtitle">
          Upload a retinal image to see which areas influenced the AI's decision
        </p>
        
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="shap-file-upload"
            className="file-input"
          />
          <label htmlFor="shap-file-upload" className="upload-label">
            <span className="upload-icon">📷</span>
            <span>Choose Image</span>
          </label>
        </div>
        
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Preview" className="image-preview" />
          </div>
        )}
        
        {image && !loading && (
          <button 
            className="analyze-btn" 
            onClick={handleAnalysis}
            style={{ backgroundColor: '#9b59b6' }}
          >
            Generate SHAP Visualization
          </button>
        )}
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Generating SHAP visualization...</p>
          </div>
        )}
        
        {shapImage && !loading && (
          <div className="shap-results">
            <h3 style={{ color: '#9b59b6' }}>SHAP Visualization</h3>
            <p className="section-subtitle">
              Highlighted areas show which regions most influenced the prediction
            </p>
            <div className="shap-image-container">
              <img src={shapImage} alt="SHAP visualization" className="shap-image" />
            </div>
            
            {results && (
              <div className="prediction-info">
                <div className="info-item">
                  <span className="label">Prediction:</span>
                  <span className="value">{results.prediction}</span>
                </div>
                <div className="info-item">
                  <span className="label">Confidence:</span>
                  <span className="value">{(results.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="info-card">
        <h3 style={{ color: '#9b59b6' }}>What is SHAP?</h3>
        <p>
          SHAP (SHapley Additive exPlanations) is a method to explain individual predictions 
          of machine learning models. It shows which features (pixels in images) contributed 
          most to the model's decision.
        </p>
        
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <h4>Transparency</h4>
            <p>See exactly what the AI is "looking at"</p>
          </div>
          
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <h4>Accuracy</h4>
            <p>Understand which areas matter most</p>
          </div>
          
          <div className="feature-item">
            <span className="feature-icon">🔬</span>
            <h4>Scientific</h4>
            <p>Based on game theory principles</p>
          </div>
          
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <h4>Trustworthy</h4>
            <p>Build confidence in AI decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SHAPPage;

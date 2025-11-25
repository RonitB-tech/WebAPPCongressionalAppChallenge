import React from 'react';
import '../styles/SettingsPage.css';

function SettingsPage({ themeColor, onThemeChange, themeColors }) {
  return (
    <div className="settings-page">
      <div className="header">
        <div className="icon-circle" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          ⚙️
        </div>
        <h1 style={{ color: themeColor }}>Settings</h1>
        <p className="subtitle">Customize your experience</p>
      </div>
      
      <div className="settings-section">
        <h2>Theme Color</h2>
        <p className="section-description">Choose your eye color to personalize the app</p>
        
        <div className="color-grid">
          {Object.entries(themeColors).map(([key, value]) => (
            <div
              key={key}
              className={`color-option ${themeColor === value.primary ? 'selected' : ''}`}
              onClick={() => onThemeChange(key)}
            >
              <div 
                className="color-circle"
                style={{ backgroundColor: value.primary }}
              >
                {themeColor === value.primary && <span className="checkmark">✓</span>}
              </div>
              <span className="color-name">{value.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="settings-section">
        <h2>About</h2>
        <div className="info-card">
          <h3>Eye Health Hub</h3>
          <p>Version 1.0.0</p>
          <p className="description">
            A comprehensive eye health application featuring AI-powered diabetic retinopathy detection, 
            pink eye analysis, vision tests, health tips, and eye care provider locator.
          </p>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">🩺</span>
            <div className="feature-content">
              <h4>AI Analysis</h4>
              <p>Advanced machine learning for retinopathy and conjunctivitis detection</p>
            </div>
          </div>
          
          <div className="feature-item">
            <span className="feature-icon">🧠</span>
            <div className="feature-content">
              <h4>SHAP Visualization</h4>
              <p>Explainable AI showing which areas influenced predictions</p>
            </div>
          </div>
          
          <div className="feature-item">
            <span className="feature-icon">👁️</span>
            <div className="feature-content">
              <h4>Vision Tests</h4>
              <p>Comprehensive suite of interactive eye tests</p>
            </div>
          </div>
          
          <div className="feature-item">
            <span className="feature-icon">❤️</span>
            <div className="feature-content">
              <h4>Health Tips</h4>
              <p>Expert advice on eye care, nutrition, and prevention</p>
            </div>
          </div>
          
          <div className="feature-item">
            <span className="feature-icon">🗺️</span>
            <div className="feature-content">
              <h4>Provider Locator</h4>
              <p>Find nearby eye care professionals</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Disclaimer</h2>
        <div className="disclaimer-card">
          <p>
            ⚠️ This application is for educational and informational purposes only. 
            It is not intended to diagnose, treat, cure, or prevent any disease. 
            Always consult with qualified healthcare professionals for medical advice.
          </p>
          <p>
            The AI models used in this application are trained on medical datasets 
            but should not replace professional medical examination and diagnosis.
          </p>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Privacy</h2>
        <div className="info-card">
          <p>
            Your images and data are processed locally and are not stored on our servers. 
            We respect your privacy and do not collect personal information.
          </p>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Support</h2>
        <div className="support-buttons">
          <button className="support-btn">
            📧 Contact Support
          </button>
          <button className="support-btn">
            📖 View Documentation
          </button>
          <button className="support-btn">
            ⭐ Rate This App
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

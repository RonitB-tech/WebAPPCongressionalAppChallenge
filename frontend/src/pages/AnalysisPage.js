import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AnalysisPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

function AnalysisPage({ themeColor }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState('retinopathy');
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAnalysis = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      const endpoint = analysisType === 'retinopathy' 
        ? `${API_URL}/api/predict/retinopathy`
        : `${API_URL}/api/predict/pinkeye`;
      
      console.log('🔥 Making request to:', endpoint);
      console.log('🔥 API_URL:', API_URL);
      
      const response = await axios.post(endpoint, { image });
      console.log('✅ Response received:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('❌ Full error:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error message:', error.message);
      
      let errorMessage = 'Analysis failed. ';
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        errorMessage += 'Cannot connect to backend server. Please ensure it is running on port 5005.';
      } else if (error.response) {
        errorMessage += `Server error: ${error.response.status} - ${error.response.data?.error || 'Unknown error'}`;
      } else {
        errorMessage += `Network error: ${error.message}`;
      }
      
      alert(errorMessage);
    }
    setLoading(false);
  };
  
  const getRecommendation = (confidence, type) => {
    if (type === 'retinopathy') {
      if (confidence > 0.7) return "High likelihood detected. Consult an ophthalmologist immediately.";
      if (confidence > 0.5) return "Moderate signs detected. Schedule an eye exam soon.";
      if (confidence > 0.3) return "Mild signs detected. Monitor and maintain regular checkups.";
      return "No significant signs detected. Continue regular monitoring.";
    } else {
      if (confidence > 0.7) return "Conjunctivitis detected. Consider seeing an eye care professional.";
      return "No conjunctivitis detected. If symptoms persist, consult a professional.";
    }
  };
  
  return (
    <div className="analysis-page">
      <div className="header">
        <div className="icon-circle" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          🩺
        </div>
        <h1 style={{ color: themeColor }}>AI Eye Analysis</h1>
        <p className="subtitle">Advanced diabetic retinopathy and conjunctivitis detection</p>
      </div>
      
      <div className="card">
        <div className="analysis-type-selector">
          <button
            className={`type-btn ${analysisType === 'retinopathy' ? 'active' : ''}`}
            onClick={() => setAnalysisType('retinopathy')}
            style={analysisType === 'retinopathy' ? { backgroundColor: themeColor } : {}}
          >
            Diabetic Retinopathy
          </button>
          <button
            className={`type-btn ${analysisType === 'pinkeye' ? 'active' : ''}`}
            onClick={() => setAnalysisType('pinkeye')}
            style={analysisType === 'pinkeye' ? { backgroundColor: themeColor } : {}}
          >
            Pink Eye (Conjunctivitis)
          </button>
        </div>
        
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="file-upload"
            className="file-input"
          />
          <label htmlFor="file-upload" className="upload-label" style={{ borderColor: themeColor }}>
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
            style={{ backgroundColor: themeColor }}
          >
            Analyze Image
          </button>
        )}
        
        {loading && (
          <div className="loading">
            <div className="spinner" style={{ borderTopColor: themeColor }}></div>
            <p>Analyzing image...</p>
          </div>
        )}
        
        {results && !loading && (
          <div className="results">
            <div className="result-header">
              <h2 style={{ color: themeColor }}>Analysis Results</h2>
            </div>
            
            <div className="result-card">
              <div className="result-item">
                <span className="result-label">Prediction:</span>
                <span className="result-value">{results.prediction}</span>
              </div>
              
              <div className="result-item">
                <span className="result-label">Confidence:</span>
                <span className="result-value">{(results.confidence * 100).toFixed(1)}%</span>
              </div>
              
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ 
                    width: `${results.confidence * 100}%`,
                    backgroundColor: themeColor 
                  }}
                ></div>
              </div>
              
              <div className="recommendation">
                <h3>Recommendation:</h3>
                <p>{getRecommendation(results.confidence, analysisType)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="info-card">
        <h3 style={{ color: themeColor }}>About This Analysis</h3>
        <p>
          {analysisType === 'retinopathy' 
            ? "Our AI model analyzes retinal images to detect signs of diabetic retinopathy, a serious complication of diabetes that affects the eyes."
            : "Our AI model analyzes eye images to detect signs of conjunctivitis (pink eye), a common and contagious eye infection."
          }
        </p>
        <p className="disclaimer">
          ⚠️ This tool is for educational purposes only and should not replace professional medical advice.
        </p>
      </div>
    </div>
  );
}

export default AnalysisPage;

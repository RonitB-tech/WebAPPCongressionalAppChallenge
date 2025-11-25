import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './styles/App.css';
import AnalysisPage from './pages/AnalysisPage';
import SHAPPage from './pages/SHAPPage';
import EyeTestsPage from './pages/EyeTestsPage';
import EyeHealthPage from './pages/EyeHealthPage';
import MapPage from './pages/MapPage';
import SettingsPage from './pages/SettingsPage';

const THEME_COLORS = {
  brown: { primary: '#8B4513', name: 'Brown' },
  blue: { primary: '#007AFF', name: 'Blue' },
  green: { primary: '#34C759', name: 'Green' },
  hazel: { primary: '#FF9500', name: 'Hazel' },
  gray: { primary: '#8E8E93', name: 'Gray' },
  amber: { primary: '#FFCC00', name: 'Amber' }
};

function TabNavigation({ themeColor }) {
  const location = useLocation();
  
  const tabs = [
    { path: '/', label: 'Analysis', icon: '🩺' },
    { path: '/shap', label: 'SHAP', icon: '🧠' },
    { path: '/eye-tests', label: 'Eye Tests', icon: '👁️' },
    { path: '/eye-health', label: 'Eye Health', icon: '❤️' },
    { path: '/map', label: 'Find Care', icon: '🗺️' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];
  
  return (
    <nav className="tab-navigation" style={{ '--theme-color': themeColor }}>
      {tabs.map(tab => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`tab-button ${location.pathname === tab.path ? 'active' : ''}`}
          style={{ color: location.pathname === tab.path ? themeColor : '#8e8e93' }}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}

function App() {
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem('themeColor') || THEME_COLORS.brown.primary
  );
  
  const updateThemeColor = (colorKey) => {
    const color = THEME_COLORS[colorKey].primary;
    setThemeColor(color);
    localStorage.setItem('themeColor', color);
  };
  
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', themeColor);
  }, [themeColor]);
  
  return (
    <Router>
      <div className="app">
        <div className="content-container">
          <Routes>
            <Route path="/" element={<AnalysisPage themeColor={themeColor} />} />
            <Route path="/shap" element={<SHAPPage themeColor={themeColor} />} />
            <Route path="/eye-tests" element={<EyeTestsPage themeColor={themeColor} />} />
            <Route path="/eye-health" element={<EyeHealthPage themeColor={themeColor} />} />
            <Route path="/map" element={<MapPage themeColor={themeColor} />} />
            <Route path="/settings" element={
              <SettingsPage 
                themeColor={themeColor} 
                onThemeChange={updateThemeColor}
                themeColors={THEME_COLORS}
              />
            } />
          </Routes>
        </div>
        <TabNavigation themeColor={themeColor} />
      </div>
    </Router>
  );
}

export default App;

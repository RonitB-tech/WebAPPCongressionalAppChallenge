import React, { useState } from 'react';
import '../styles/EyeHealthPage.css';

const CATEGORIES = [
  { id: 'tips', name: 'Daily Tips', icon: '💡' },
  { id: 'exercises', name: 'Exercises', icon: '💪' },
  { id: 'nutrition', name: 'Nutrition', icon: '🥕' },
  { id: 'habits', name: 'Healthy Habits', icon: '✨' },
  { id: 'prevention', name: 'Prevention', icon: '🛡️' }
];

const TIPS = [
  {
    title: '20-20-20 Rule',
    description: 'Every 20 minutes, look at something 20 feet away for 20 seconds',
    icon: '⏰'
  },
  {
    title: 'Proper Lighting',
    description: 'Ensure adequate lighting when reading or using digital devices',
    icon: '💡'
  },
  {
    title: 'Wear Sunglasses',
    description: 'Protect your eyes from harmful UV rays with quality sunglasses',
    icon: '🕶️'
  },
  {
    title: 'Stay Hydrated',
    description: 'Drink plenty of water to keep your eyes moist and comfortable',
    icon: '💧'
  },
  {
    title: 'Regular Eye Exams',
    description: 'Get comprehensive eye exams every 1-2 years',
    icon: '👨‍⚕️'
  }
];

const EXERCISES = [
  {
    name: 'Blinking Exercise',
    description: 'Blink rapidly for 10 seconds, then close eyes for 20 seconds. Repeat 5 times.',
    duration: '2 minutes'
  },
  {
    name: 'Focus Shifting',
    description: 'Hold finger 10 inches away. Focus on it, then on something far. Repeat 10 times.',
    duration: '3 minutes'
  },
  {
    name: 'Eye Rolling',
    description: 'Roll your eyes clockwise 10 times, then counter-clockwise 10 times.',
    duration: '2 minutes'
  },
  {
    name: 'Palming',
    description: 'Rub hands together, cup over closed eyes without pressure. Relax for 2 minutes.',
    duration: '2 minutes'
  }
];

const NUTRIENTS = [
  {
    name: 'Vitamin A',
    foods: 'Carrots, sweet potatoes, spinach',
    benefit: 'Essential for good vision and eye health',
    icon: '🥕'
  },
  {
    name: 'Omega-3',
    foods: 'Fish, flaxseeds, walnuts',
    benefit: 'Reduces dry eye and supports retinal health',
    icon: '🐟'
  },
  {
    name: 'Lutein',
    foods: 'Kale, spinach, broccoli',
    benefit: 'Protects against macular degeneration',
    icon: '🥬'
  },
  {
    name: 'Vitamin C',
    foods: 'Oranges, strawberries, bell peppers',
    benefit: 'Supports blood vessels in the eyes',
    icon: '🍊'
  },
  {
    name: 'Zinc',
    foods: 'Oysters, beef, pumpkin seeds',
    benefit: 'Helps vitamin A work effectively',
    icon: '🌰'
  }
];

function EyeHealthPage({ themeColor }) {
  const [selectedCategory, setSelectedCategory] = useState('tips');
  const [completedTips, setCompletedTips] = useState(new Set());
  
  const toggleTip = (index) => {
    const newCompleted = new Set(completedTips);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedTips(newCompleted);
  };
  
  const renderContent = () => {
    switch (selectedCategory) {
      case 'tips':
        return (
          <div className="tips-section">
            {TIPS.map((tip, index) => (
              <div 
                key={index} 
                className={`tip-card ${completedTips.has(index) ? 'completed' : ''}`}
                onClick={() => toggleTip(index)}
              >
                <div className="tip-icon">{tip.icon}</div>
                <div className="tip-content">
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
                <div className="tip-check">
                  {completedTips.has(index) ? '✓' : '○'}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'exercises':
        return (
          <div className="exercises-section">
            {EXERCISES.map((exercise, index) => (
              <div key={index} className="exercise-card">
                <div className="exercise-header">
                  <h3>{exercise.name}</h3>
                  <span className="duration">{exercise.duration}</span>
                </div>
                <p>{exercise.description}</p>
              </div>
            ))}
          </div>
        );
      
      case 'nutrition':
        return (
          <div className="nutrition-section">
            {NUTRIENTS.map((nutrient, index) => (
              <div key={index} className="nutrient-card">
                <div className="nutrient-icon">{nutrient.icon}</div>
                <h3>{nutrient.name}</h3>
                <p className="foods"><strong>Sources:</strong> {nutrient.foods}</p>
                <p className="benefit">{nutrient.benefit}</p>
              </div>
            ))}
          </div>
        );
      
      case 'habits':
        return (
          <div className="habits-section">
            <div className="habit-card">
              <h3>🖥️ Screen Time Management</h3>
              <ul>
                <li>Take regular breaks from screens</li>
                <li>Use blue light filters</li>
                <li>Position screens at arm's length</li>
                <li>Keep screen brightness comfortable</li>
              </ul>
            </div>
            
            <div className="habit-card">
              <h3>😴 Quality Sleep</h3>
              <ul>
                <li>Get 7-9 hours of sleep nightly</li>
                <li>Keep bedroom dark</li>
                <li>Avoid screens before bed</li>
                <li>Maintain consistent sleep schedule</li>
              </ul>
            </div>
            
            <div className="habit-card">
              <h3>🚭 Avoid Smoking</h3>
              <ul>
                <li>Smoking increases risk of cataracts</li>
                <li>Damages optic nerve</li>
                <li>Increases macular degeneration risk</li>
                <li>Seek help to quit if needed</li>
              </ul>
            </div>
          </div>
        );
      
      case 'prevention':
        return (
          <div className="prevention-section">
            <div className="prevention-card">
              <h3>🩺 Regular Checkups</h3>
              <p>Comprehensive eye exams can detect problems early, including:</p>
              <ul>
                <li>Glaucoma</li>
                <li>Cataracts</li>
                <li>Macular degeneration</li>
                <li>Diabetic retinopathy</li>
              </ul>
            </div>
            
            <div className="prevention-card">
              <h3>🛡️ Protective Measures</h3>
              <ul>
                <li>Wear safety glasses for hazardous activities</li>
                <li>Use UV-protective sunglasses outdoors</li>
                <li>Keep contact lenses clean</li>
                <li>Never sleep in contacts unless approved</li>
              </ul>
            </div>
            
            <div className="prevention-card">
              <h3>⚠️ Warning Signs</h3>
              <p>Seek immediate medical attention if you experience:</p>
              <ul>
                <li>Sudden vision loss</li>
                <li>Flashes of light or floaters</li>
                <li>Eye pain or redness</li>
                <li>Double vision</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="eye-health-page">
      <div className="header">
        <div className="icon-circle" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          ❤️
        </div>
        <h1 style={{ color: themeColor }}>Eye Health & Tips</h1>
        <p className="subtitle">Your complete guide to healthy vision</p>
      </div>
      
      <div className="category-selector">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            style={selectedCategory === category.id ? { backgroundColor: themeColor } : {}}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="content-area">
        {renderContent()}
      </div>
      
      {selectedCategory === 'tips' && (
        <div className="progress-card">
          <h3>Your Progress</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(completedTips.size / TIPS.length) * 100}%`,
                backgroundColor: themeColor 
              }}
            ></div>
          </div>
          <p>{completedTips.size} of {TIPS.length} tips completed</p>
        </div>
      )}
    </div>
  );
}

export default EyeHealthPage;

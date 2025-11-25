import React, { useState } from 'react';
import '../styles/EyeTestsPage.css';

const TESTS = [
  {
    id: 'visual-acuity',
    name: 'Visual Acuity',
    icon: '👁️',
    color: '#007AFF',
    description: 'Test sharpness of vision'
  },
  {
    id: 'color-blind',
    name: 'Color Blindness',
    icon: '🎨',
    color: '#FF9500',
    description: 'Detect color vision deficiencies'
  },
  {
    id: 'astigmatism',
    name: 'Astigmatism',
    icon: '⭕',
    color: '#34C759',
    description: 'Check for corneal irregularities'
  },
  {
    id: 'contrast',
    name: 'Contrast Sensitivity',
    icon: '🌓',
    color: '#5856D6',
    description: 'Assess low-light vision'
  },
  {
    id: 'peripheral',
    name: 'Peripheral Vision',
    icon: '👀',
    color: '#5AC8FA',
    description: 'Evaluate side vision'
  },
  {
    id: 'amsler',
    name: 'Amsler Grid',
    icon: '🔲',
    color: '#8B4513',
    description: 'Screen for macular issues'
  }
];

function EyeTestsPage({ themeColor }) {
  const [selectedTest, setSelectedTest] = useState(null);
  const [testStep, setTestStep] = useState(0);
  const [testResults, setTestResults] = useState({});
  
  const startTest = (test) => {
    setSelectedTest(test);
    setTestStep(0);
  };
  
  const endTest = () => {
    setSelectedTest(null);
    setTestStep(0);
  };
  
  const completeTest = (result) => {
    setTestResults({
      ...testResults,
      [selectedTest.id]: result
    });
    endTest();
  };
  
  const renderTest = () => {
    if (!selectedTest) return null;
    
    switch (selectedTest.id) {
      case 'visual-acuity':
        return <VisualAcuityTest onComplete={completeTest} color={selectedTest.color} />;
      case 'color-blind':
        return <ColorBlindTest onComplete={completeTest} color={selectedTest.color} />;
      case 'astigmatism':
        return <AstigmatismTest onComplete={completeTest} color={selectedTest.color} />;
      case 'contrast':
        return <ContrastTest onComplete={completeTest} color={selectedTest.color} />;
      case 'peripheral':
        return <PeripheralVisionTest onComplete={completeTest} color={selectedTest.color} />;
      case 'amsler':
        return <AmslerGridTest onComplete={completeTest} color={selectedTest.color} />;
      default:
        return null;
    }
  };
  
  if (selectedTest) {
    return (
      <div className="eye-tests-page">
        <div className="test-header">
          <button className="back-btn" onClick={endTest}>
            ← Back
          </button>
          <h2>{selectedTest.name}</h2>
        </div>
        <div className="test-container">
          {renderTest()}
        </div>
      </div>
    );
  }
  
  return (
    <div className="eye-tests-page">
      <div className="header">
        <div className="icon-circle" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          👁️
        </div>
        <h1 style={{ color: themeColor }}>Eye Vision Tests</h1>
        <p className="subtitle">Comprehensive vision screening suite</p>
      </div>
      
      <div className="tests-grid">
        {TESTS.map(test => (
          <div 
            key={test.id} 
            className="test-card"
            onClick={() => startTest(test)}
            style={{ borderColor: test.color }}
          >
            <div className="test-icon" style={{ backgroundColor: test.color }}>
              {test.icon}
            </div>
            <h3>{test.name}</h3>
            <p>{test.description}</p>
            {testResults[test.id] && (
              <div className="completed-badge">
                ✓ Completed
              </div>
            )}
          </div>
        ))}
      </div>
      
      {Object.keys(testResults).length > 0 && (
        <div className="results-summary">
          <h2 style={{ color: themeColor }}>Test Results Summary</h2>
          {Object.entries(testResults).map(([testId, result]) => {
            const test = TESTS.find(t => t.id === testId);
            return (
              <div key={testId} className="result-item">
                <div className="result-header">
                  <span>{test.name}</span>
                  <span className="checkmark">✓</span>
                </div>
                <p className="result-text">{result}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Individual Test Components
function VisualAcuityTest({ onComplete, color }) {
  const [currentSize, setCurrentSize] = useState(0);
  const sizes = ['48px', '36px', '24px', '18px', '12px'];
  
  return (
    <div className="test-content">
      <h3>Visual Acuity Test</h3>
      <p>Can you read this letter?</p>
      <div className="letter-display" style={{ fontSize: sizes[currentSize] }}>
        E
      </div>
      <div className="test-buttons">
        <button 
          onClick={() => currentSize < sizes.length - 1 ? setCurrentSize(currentSize + 1) : null}
          style={{ backgroundColor: color }}
        >
          Yes, Make Smaller
        </button>
        <button 
          onClick={() => onComplete(`Readable down to size ${currentSize + 1}/5`)}
          className="secondary"
        >
          No, Too Small
        </button>
      </div>
    </div>
  );
}

function ColorBlindTest({ onComplete, color }) {
  const [currentPlate, setCurrentPlate] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  // Ishihara plate data with correct answers (in order: 45, 42, 5, 57, 6, 5, 74, 15, 3, 5, 57, 29, 6, 8, 12)
  const plates = [
    { image: 'plate1.png', correct: '45', description: 'Red-green deficiency test' },
    { image: 'plate2.png', correct: '42', description: 'Red-green deficiency test' },
    { image: 'plate3.png', correct: '5', description: 'Red-green deficiency test' },
    { image: 'plate4.png', correct: '57', description: 'Red-green deficiency test' },
    { image: 'plate5.png', correct: '6', description: 'Red-green deficiency test' },
    { image: 'plate6.png', correct: '5', description: 'Red-green deficiency test' },
    { image: 'plate7.png', correct: '74', description: 'Red-green deficiency test' },
    { image: 'plate8.png', correct: '15', description: 'Red-green deficiency test' },
    { image: 'plate9.png', correct: '3', description: 'Red-green deficiency test' },
    { image: 'plate10.png', correct: '5', description: 'Red-green deficiency test' },
    { image: 'plate11.png', correct: '57', description: 'Red-green deficiency test' },
    { image: 'plate12.png', correct: '29', description: 'Red-green deficiency test' },
    { image: 'plate13.png', correct: '6', description: 'Red-green deficiency test' },
    { image: 'plate14.png', correct: '8', description: 'Red-green deficiency test' },
    { image: 'plate15.png', correct: '12', description: 'Control plate - everyone should see 12' }
  ];
  
  const [userAnswer, setUserAnswer] = useState('');
  
  const handleAnswer = () => {
    const newAnswers = [...answers, {
      plate: currentPlate + 1,
      userAnswer: userAnswer,
      correct: plates[currentPlate].correct,
      isCorrect: userAnswer.toLowerCase() === plates[currentPlate].correct.toLowerCase()
    }];
    setAnswers(newAnswers);
    
    if (currentPlate < plates.length - 1) {
      setCurrentPlate(currentPlate + 1);
      setUserAnswer('');
    } else {
      // Test complete - analyze results
      const correctAnswers = newAnswers.filter(a => a.isCorrect).length;
      const percentage = (correctAnswers / plates.length) * 100;
      
      let result;
      if (percentage >= 80) {
        result = `Normal color vision (${correctAnswers}/${plates.length} correct)`;
      } else if (percentage >= 60) {
        result = `Mild color vision deficiency (${correctAnswers}/${plates.length} correct)`;
      } else {
        result = `Significant color vision deficiency detected (${correctAnswers}/${plates.length} correct) - Consider consulting an eye care professional`;
      }
      
      onComplete(result);
    }
  };
  
  const handleSkip = () => {
    setUserAnswer('nothing');
    handleAnswer();
  };
  
  return (
    <div className="test-content">
      <h3>Ishihara Color Blindness Test</h3>
      <p>Plate {currentPlate + 1} of {plates.length}</p>
      <p>What number or shape do you see? (Enter "nothing" if you don't see anything)</p>
      
      <div className="color-plate">
        <img 
          src={`/images/${plates[currentPlate].image}`}
          alt={`Ishihara plate ${currentPlate + 1}`}
          style={{ 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </div>
      
      <div className="answer-input">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter what you see..."
          style={{
            padding: '10px',
            fontSize: '18px',
            borderRadius: '5px',
            border: '2px solid #ccc',
            marginRight: '10px',
            width: '200px'
          }}
        />
      </div>
      
      <div className="test-buttons">
        <button 
          onClick={handleAnswer}
          disabled={!userAnswer.trim()}
          style={{ 
            backgroundColor: userAnswer.trim() ? color : '#ccc',
            cursor: userAnswer.trim() ? 'pointer' : 'not-allowed'
          }}
        >
          {currentPlate < plates.length - 1 ? 'Next Plate' : 'Complete Test'}
        </button>
        <button onClick={handleSkip} className="secondary">
          I don't see anything
        </button>
      </div>
      
      <div className="progress-bar" style={{ marginTop: '20px' }}>
        <div 
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              width: `${((currentPlate + 1) / plates.length) * 100}%`,
              height: '100%',
              backgroundColor: color,
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: '5px', fontSize: '14px' }}>
          Progress: {currentPlate + 1}/{plates.length}
        </p>
      </div>
    </div>
  );
}

function AstigmatismTest({ onComplete, color }) {
  return (
    <div className="test-content">
      <h3>Astigmatism Test</h3>
      <p>Do all the lines appear equally dark and sharp?</p>
      <div className="astigmatism-chart">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x1 = 150 + 50 * Math.cos(angle);
            const y1 = 150 + 50 * Math.sin(angle);
            const x2 = 150 + 130 * Math.cos(angle);
            const y2 = 150 + 130 * Math.sin(angle);
            return (
              <line 
                key={i}
                x1={x1} 
                y1={y1} 
                x2={x2} 
                y2={y2} 
                stroke="black" 
                strokeWidth="3"
              />
            );
          })}
        </svg>
      </div>
      <div className="test-buttons">
        <button onClick={() => onComplete('No signs of astigmatism')} style={{ backgroundColor: color }}>
          All lines look the same
        </button>
        <button onClick={() => onComplete('Possible astigmatism detected')} className="secondary">
          Some lines are darker/blurrier
        </button>
      </div>
    </div>
  );
}

function ContrastTest({ onComplete, color }) {
  return (
    <div className="test-content">
      <h3>Contrast Sensitivity Test</h3>
      <p>Can you see the letter 'C' in this low-contrast image?</p>
      <div style={{ 
        background: '#e0e0e0', 
        padding: '40px', 
        borderRadius: '10px' 
      }}>
        <div style={{ 
          fontSize: '60px', 
          color: '#b0b0b0', 
          fontWeight: 'bold' 
        }}>
          C
        </div>
      </div>
      <div className="test-buttons">
        <button onClick={() => onComplete('Good contrast sensitivity')} style={{ backgroundColor: color }}>
          Yes, I can see it
        </button>
        <button onClick={() => onComplete('Reduced contrast sensitivity')} className="secondary">
          No, it\'s too faint
        </button>
      </div>
    </div>
  );
}

function PeripheralVisionTest({ onComplete, color }) {
  return (
    <div className="test-content">
      <h3>Peripheral Vision Test</h3>
      <p>Cover one eye, focus on the center dot, and check if you can see all four corner dots</p>
      <div className="peripheral-test">
        <div style={{ position: 'relative', width: '400px', height: '400px', border: '2px solid #ccc' }}>
          <div style={{ position: 'absolute', top: '10px', left: '10px', width: '20px', height: '20px', borderRadius: '50%', background: color }} />
          <div style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', borderRadius: '50%', background: color }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px', borderRadius: '50%', background: 'black' }} />
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '20px', height: '20px', borderRadius: '50%', background: color }} />
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '20px', height: '20px', borderRadius: '50%', background: color }} />
        </div>
      </div>
      <div className="test-buttons">
        <button onClick={() => onComplete('Normal peripheral vision')} style={{ backgroundColor: color }}>
          I see all 4 dots
        </button>
        <button onClick={() => onComplete('Reduced peripheral vision')} className="secondary">
          I can\'t see all dots
        </button>
      </div>
    </div>
  );
}

function AmslerGridTest({ onComplete, color }) {
  return (
    <div className="test-content">
      <h3>Amsler Grid Test</h3>
      <p>Cover one eye, focus on the center dot. Do all lines appear straight and uniform?</p>
      <div className="amsler-grid">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {[...Array(11)].map((_, i) => (
            <React.Fragment key={i}>
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" stroke="#333" strokeWidth="1" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} stroke="#333" strokeWidth="1" />
            </React.Fragment>
          ))}
          <circle cx="150" cy="150" r="5" fill="black" />
        </svg>
      </div>
      <div className="test-buttons">
        <button onClick={() => onComplete('No macular issues detected')} style={{ backgroundColor: color }}>
          All lines are straight
        </button>
        <button onClick={() => onComplete('Possible macular issue - consult doctor')} className="secondary">
          Some lines are wavy/missing
        </button>
      </div>
    </div>
  );
}

export default EyeTestsPage;

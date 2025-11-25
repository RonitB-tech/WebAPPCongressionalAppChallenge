# Eye Health Hub - Web Application

A comprehensive web application for eye health featuring AI-powered diabetic retinopathy detection, pink eye analysis, interactive vision tests, health tips, and eye care provider locator.

## 🌟 Features

### 🩺 AI Analysis
- **Diabetic Retinopathy Detection**: Upload retinal images for AI-powered analysis
- **Pink Eye (Conjunctivitis) Detection**: Analyze eye images for signs of infection
- Real-time predictions with confidence scores
- Educational recommendations based on results

### 🧠 SHAP Visualization
- Explainable AI showing which image areas influenced predictions
- Visual heatmaps overlaid on original images
- Transparent decision-making process

### 👁️ Interactive Eye Tests
- **Visual Acuity Test**: Test sharpness of vision
- **Color Blindness Test**: Ishihara plate simulation
- **Astigmatism Test**: Radial line chart
- **Contrast Sensitivity**: Low-contrast detection
- **Peripheral Vision**: Side vision assessment
- **Amsler Grid**: Macular health screening

### ❤️ Eye Health & Tips
- Daily eye care tips with progress tracking
- Eye exercises with instructions
- Nutrition guide for optimal eye health
- Healthy habits recommendations
- Prevention strategies

### 🗺️ Find Eye Care
- Interactive map showing nearby eye care providers
- Search functionality
- Doctor information with ratings and reviews
- One-click directions and calling
- Emergency contact information

### ⚙️ Settings
- Customizable theme colors based on eye color
- Comprehensive app information
- Privacy and disclaimer information

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Installation & Running

1. **Navigate to the webapp folder**:
   ```bash
   cd "/Volumes/External Storage/Congressional App Challenge (DR)/webapp"
   ```

2. **Run the startup script**:
   ```bash
   ./start.sh
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

The script will automatically:
- Create Python virtual environment
- Install all backend dependencies
- Install all frontend dependencies
- Start both servers

## 📁 Project Structure

```
webapp/
├── backend/
│   ├── app.py                 # Flask server with ML models
│   ├── requirements.txt       # Python dependencies
│   └── models/                # ML model weights (optional)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js            # Main app component
│   │   ├── index.js          # React entry point
│   │   ├── pages/            # All page components
│   │   │   ├── AnalysisPage.js
│   │   │   ├── SHAPPage.js
│   │   │   ├── EyeTestsPage.js
│   │   │   ├── EyeHealthPage.js
│   │   │   ├── MapPage.js
│   │   │   └── SettingsPage.js
│   │   └── styles/           # CSS stylesheets
│   └── package.json
├── start.sh                  # Startup script
└── README.md                 # This file
```

## 🛠️ Manual Setup

If you prefer to start servers manually:

**Backend:**
```bash
cd webapp/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

**Frontend (in a new terminal):**
```bash
cd webapp/frontend
npm install
npm start
```

## 📦 Dependencies

### Backend
- Flask 3.0.0
- Flask-CORS 4.0.0
- PyTorch 2.1.0
- torchvision 0.16.0
- Pillow 10.1.0
- NumPy 1.24.3
- OpenCV 4.8.1
- coremltools 7.1

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.2
- Leaflet 1.9.4
- React Leaflet 4.2.1
- Framer Motion 10.16.16

## 🤖 AI Models

The backend expects trained PyTorch models in the `backend/models/` directory:
- `retinopathy_model.pth` - Diabetic retinopathy detection model
- `pinkeye_model.pth` - Conjunctivitis detection model

If models are not present, the backend will still run but predictions will not be available.

## 🔧 API Endpoints

- `GET /api/health` - Health check
- `POST /api/predict/retinopathy` - Retinopathy prediction
- `POST /api/predict/pinkeye` - Pink eye prediction
- `POST /api/shap/generate` - Generate SHAP visualization

## ⚠️ Disclaimer

This application is for educational and informational purposes only. It is not intended to diagnose, treat, cure, or prevent any disease. Always consult with qualified healthcare professionals for medical advice.

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎨 Customization

Users can customize the app theme by selecting their eye color in the Settings page. The theme color will persist across sessions.

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure Python 3.8+ is installed: `python3 --version`
- Check if port 5000 is available
- Review error messages in terminal

**Frontend won't start:**
- Ensure Node.js 16+ is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is available

**Models not loading:**
- Place trained model files in `backend/models/`
- Ensure model files are named correctly
- Check backend terminal for specific error messages

## 📄 License

This project is created for the Congressional App Challenge.

## 👨‍💻 Development

Built with modern web technologies:
- **Backend**: Flask (Python) with PyTorch for ML
- **Frontend**: React with modern hooks and routing
- **Styling**: Custom CSS with responsive design
- **Maps**: Leaflet for interactive mapping

## 🌐 Deployment

For production deployment:
1. Build the React app: `cd frontend && npm run build`
2. Serve the build folder with Flask or a web server
3. Configure CORS for your production domain
4. Use a production WSGI server like Gunicorn
5. Set up HTTPS with SSL certificates

---

**Made with ❤️ for the Congressional App Challenge**

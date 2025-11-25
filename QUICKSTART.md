# 🚀 Quick Start Guide

Get your web app running in 3 simple steps!

## Step 1: Open Terminal

Open Terminal on your Mac (Applications > Utilities > Terminal)

## Step 2: Navigate to the webapp folder

```bash
cd "/Volumes/External Storage/Congressional App Challenge (DR)/webapp"
```

## Step 3: Start the app

```bash
./start.sh
```

That's it! The script will:
- ✅ Set up Python environment
- ✅ Install all dependencies
- ✅ Start backend server (port 5000)
- ✅ Start frontend server (port 3000)
- ✅ Open your browser automatically

## Access Your App

**Frontend (User Interface):**
```
http://localhost:3000
```

**Backend (API Server):**
```
http://localhost:5000
```

## What to Expect

1. **First run**: Takes 2-3 minutes to install all dependencies
2. **Subsequent runs**: Starts in seconds
3. **Browser**: Should open automatically to http://localhost:3000

## Features Available

### 🩺 Analysis Tab
- Upload retinal images
- Get AI predictions for diabetic retinopathy
- Analyze for pink eye (conjunctivitis)
- View confidence scores and recommendations

### 🧠 SHAP Tab
- Generate explainable AI visualizations
- See which areas of images influence predictions
- Understand AI decision-making

### 👁️ Eye Tests Tab
- Visual acuity test
- Color blindness test (Ishihara plates)
- Astigmatism test
- Contrast sensitivity
- Peripheral vision
- Amsler grid test

### ❤️ Eye Health Tab
- Daily eye care tips
- Eye exercises
- Nutrition guide
- Healthy habits
- Prevention strategies

### 🗺️ Find Care Tab
- Interactive map
- Nearby eye doctors
- Get directions
- Call providers

### ⚙️ Settings Tab
- Customize theme color
- View app information
- Privacy and disclaimers

## Stop the Servers

Press `Ctrl+C` in the terminal where the app is running.

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

**Kill processes using the ports:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

Then run `./start.sh` again.

### Python Not Found

Install Python 3.8+:
```bash
# Check Python version
python3 --version

# If not installed, download from python.org
```

### Node.js Not Found

Install Node.js 16+:
```bash
# Check Node version
node --version

# If not installed, download from nodejs.org
```

### Dependencies Installation Fails

**For backend:**
```bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

**For frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Upload a test image** in the Analysis tab
2. **Try the eye tests** in the Eye Tests tab
3. **Customize your theme** in Settings
4. **Explore health tips** in Eye Health tab
5. **Find nearby doctors** in Find Care tab

## Notes

- ⚠️ **Educational Tool**: This app is for educational purposes only
- 🔒 **Privacy**: Images are processed locally and not stored
- 🤖 **AI Models**: If models are not loaded, predictions won't work but other features will
- 📱 **Best Experience**: Use on desktop/laptop for full functionality

## Support

If you encounter issues:
1. Check the terminal for error messages
2. Ensure all prerequisites are installed
3. Try the manual setup in README.md
4. Restart your computer and try again

---

**Enjoy your Eye Health Hub web application! 👁️❤️**

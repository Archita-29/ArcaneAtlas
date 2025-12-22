# 🌍 ArcaneAtlas

ArcaneAtlas is a smart tourism and exploration web application that helps users
make safer and more informed travel decisions using real-time data.

## 🚀 Features
- Guest & authenticated user mode
- Real-time weather information
- Terrain elevation and land insights
- Nearby hazard detection
- Best time to visit
- Local traditions & cultural info
- Interactive maps
- Wishlist support

## 🛠 Tech Stack
Frontend: React, Tailwind CSS  
Backend: Flask (Python)  
Database & Auth: Supabase  
APIs: OpenWeather, OpenTopoData, USGS Earthquake API  

## 🧭 User Flow
Intro Page → Login / Guest Mode → Explore Places → View Details → Save Wishlist

## ⚙️ Run Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run

### Frontend
cd frontend
npm install
npm run dev

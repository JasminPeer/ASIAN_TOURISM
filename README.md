# ASIA EXPLORA — Smart Tourism Information & Heritage Management

> **“Explore Asia. Discover Heritage. Plan Your Journey.”**

ASIA EXPLORA is a production-quality, visually immersive full-stack web application designed for all Asian countries, natural wonders, cultural attractions, historical monuments, heritage sites, ancient architecture, cuisine, transit, weather forecasting, crowd predictions, 360° virtual tours, gamification, and AI-powered personalized travel engineering.

---

## 🌟 Key Differentiators & Highlights

1. **Continental Geographic Exploration**:
   - Seamless hierarchical drilldown: **Asia Map → Country → Region/State (e.g. Tamil Nadu, Kansai, Chiang Mai) → Destination (e.g. Madurai, Kyoto) → Heritage Site (Meenakshi Temple) → 360° Virtual Tour → Climate/Crowd Forecast → AI Trip Planner → Digital Travel Passport**.
2. **Cinematic Hero & Video Categories**:
   - Ambient video hero with travel documentary aesthetics and a 5-category video carousel (**Nature, Heritage, Adventure, Culture, Cities**).
3. **Interactive 360° Virtual Heritage Tours**:
   - Built with **Three.js** equirectangular panoramic sphere, audio-guide narration, and interactive informational hotspots (Meenakshi Temple, Taj Mahal, Fushimi Inari, Angkor Wat).
4. **Smart Weather & Crowd Intelligence**:
   - 12-month climate profiles, rain probabilities, humidity, crowd density indices (Low 🟢, Moderate 🟡, High 🟠, Very High 🔴), and composite **Asia Journey Scores** out of 100.
5. **Ask Luna Travel AI (Gemini Integration)**:
   - Floating AI travel assistant equipped with Asian heritage databases, itinerary advice, packing guides, and natural language recommendations.
6. **Multi-Step AI Travel Planner**:
   - 8-step interactive builder generating day-by-day itineraries, transit suggestions, accommodation types, and budgets.
7. **Gamified Digital Travel Passport**:
   - Collect authentic Asian visa stamps, earn XP, level up traveler ranks, unlock achievement badges (*Asia Explorer*, *Heritage Hunter*, *Virtual Voyager*), and celebrate milestones with animated confetti.
8. **Smart Destination Comparison**:
   - Side-by-side radar charts and metric comparison for Asian cultural hubs.
9. **Secret Asia (Hidden Gems)**:
   - Off-the-beaten-path destinations with traveler discovery percentage scores.
10. **Zero-Setup Resilient Database**:
    - Hybrid database engine that automatically connects to MongoDB if available or seamlessly operates via an embedded JSON data store pre-seeded with all Asian destinations.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18 & Vite
  - React Router v6
  - Tailwind CSS (Deep Ocean Blues `#030c1b`, Natural Greens `#059669`, Heritage Gold `#d97706`, Glassmorphism)
  - Framer Motion
  - Lucide React Icons
  - Three.js (360° equirectangular virtual tour panoramas)
  - Leaflet & React-Leaflet
  - Recharts (Comparative radar charts, regional distribution charts)
  - Canvas-Confetti
- **Backend**:
  - Node.js & Express.js
  - MongoDB & Mongoose + Resilient Embedded Store Fallback
  - JWT Authentication & BCrypt Password Hashing
  - Google Gemini API integration with intelligent fallback generator
  - OpenWeatherMap integration with seasonal climate model fallback

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 18+ installed

### 2. Start the Application

You can launch both the backend API and frontend client with:

```bash
# Terminal 1 - Start the Backend Server (Port 5000)
cd server
node index.js

# Terminal 2 - Start the Frontend Client (Port 5173)
cd client
npm run dev
```

Visit: **`http://localhost:5173`**

---

## 🔑 Demo Credentials & Environment Variables

### Admin Account
- **Email**: `admin@asiaexplora.com`
- **Password**: `admin123`
*(A quick one-click button is provided on the Login modal to auto-fill these credentials)*

### Optional Environment Variables (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/asia_explora
JWT_SECRET=asia_explora_super_secret_jwt_key_2026
GEMINI_API_KEY=your_gemini_api_key_here
WEATHER_API_KEY=your_openweathermap_api_key_here
```
*(If API keys are left blank, built-in intelligent fallback algorithms provide realistic travel advice and weather forecasts immediately!)*

---

## 🏛️ Continental Hierarchy Example

- **Asia Continent Map**
  - ➔ **Country**: India
    - ➔ **State / Region**: Tamil Nadu
      - ➔ **Destination**: Madurai
        - ➔ **Heritage Site**: Meenakshi Sundareswarar Temple
          - ➔ **Virtual Tour**: 360° Hall of Thousand Pillars
          - ➔ **Climate**: 12-Month Best Time (October–March)
          - ➔ **Action**: Add to Journey & Stamp Passport (+50 XP)

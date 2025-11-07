# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Login
Use one of these demo credentials:

**Admin Account:**
- Email: `admin@bandung.go.id`
- Password: `admin123`

**Operator Account:**
- Email: `operator@bandung.go.id`
- Password: `operator123`

## 📱 Features to Try

### Dashboard
1. View overall statistics (Total PJU, Konsumsi, Arus, Status)
2. Click on kawasan badges on the map to navigate
3. Click any row in the table to see area details
4. View the consumption chart by area

### Area Detail
1. See detailed stats for the selected area
2. Explore the interactive map with lamp markers
3. Click markers to see lamp info popup
4. Click "Lihat Detail" in popup to go to lamp detail
5. Click any row in the table to see lamp details

### Lamp Detail
1. Watch real-time data updates (green indicator)
2. See current status, arus, and daya
3. View hourly consumption chart
4. Check 7-day activity log

## 🏗️ Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

## 🔍 Preview Production Build
```bash
npm run preview
```

## 📊 Mock Data

The app uses mock data with:
- 5 kawasan (areas) around Bandung
- ~25-35 lamps per area (138 total)
- Real-time simulation (updates every 3 seconds)
- Randomized but realistic values

## 🗺️ Map Features

- **Dashboard**: Static map with area overlays
- **Area Detail**: Interactive Leaflet map with OpenStreetMap tiles
- **Markers**: Color-coded (green=ON, red=OFF)
- **Popups**: Quick info + link to detail page

## 🎨 Design

- Modern minimalist UI
- Inter font (Google Fonts)
- Emerald green brand color
- Responsive layout (mobile-friendly)
- Subtle shadows and borders

## 🔧 Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- React Router v7
- Leaflet + React Leaflet
- Recharts
- Lucide React (icons)

## 📝 Notes

- Data is stored in memory (resets on refresh)
- Auth uses localStorage (simple demo)
- No backend required (fully client-side)
- Real-time updates are simulated

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Map not showing?**
- Check internet connection (needs OSM tiles)
- Check browser console for errors

## 📞 Support

This is a prototype/demo application. For production use, you'll need:
- Backend API integration
- Real authentication system
- Database for persistent storage
- Real MQTT/WebSocket for live data


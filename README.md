# Smartlamp PJU Monitoring - Kota Bandung

Prototype aplikasi web untuk monitoring Penerangan Jalan Umum (PJU) di Kota Bandung. Dibangun dengan React, Vite, TypeScript, dan Tailwind CSS.

## 🚀 Fitur

### Menu Utama

#### 1. Dashboard
- Overview statistik seluruh kawasan PJU
- Peta statis Kota Bandung dengan marker kawasan
- KPI: Total PJU, Total Konsumsi (kWh), Arus Rata-rata, Status Aktif/Padam
- Tabel statistik per kawasan
- Grafik konsumsi energi per kawasan

#### 2. Data User
- Manajemen pengguna sistem
- Tabel user dengan role dan status
- Filter dan pencarian user
- CRUD operations

#### 3. Data Kawasan
- Manajemen data kawasan PJU
- Statistik per kawasan
- Filter dan pencarian kawasan
- Navigasi ke detail kawasan

#### 4. Data PJU
- Manajemen semua lampu PJU
- Filter berdasarkan status dan kawasan
- Pencarian PJU
- Navigasi ke detail lampu

### Detail Pages

#### Detail Kawasan
- Statistik detail satu kawasan
- Peta interaktif (Leaflet) dengan marker setiap PJU
- Popup marker dengan info singkat dan link ke detail lampu
- Tabel data semua lampu di kawasan
- Grafik konsumsi per jam (hari ini)

#### Detail Lampu
- Monitoring real-time 1 PJU
- Status ON/OFF dengan indikator real-time
- Data arus (A), daya (W), konsumsi bulanan (kWh)
- Grafik konsumsi per jam hari ini
- Log harian 7 hari terakhir

### Lainnya

#### Pengaturan
- Konfigurasi notifikasi (email, push, alerts)
- Pengaturan sistem (backup, retensi data)
- Pengaturan tampilan (bahasa, zona waktu, format tanggal)
- Konfigurasi email SMTP

#### Autentikasi
- Login dengan email dan password
- Session disimpan di localStorage
- Protected routes
- Logout functionality

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Leaflet + React Leaflet** - Interactive maps
- **Recharts** - Charts & data visualization
- **Lucide React** - Icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Demo Credentials

```
Email: admin@bandung.go.id
Password: admin123

Email: operator@bandung.go.id
Password: operator123
```

## 📁 Project Structure

```
smartlamp/
├── src/
│   ├── auth/              # Authentication context & guards
│   │   ├── AuthProvider.tsx
│   │   ├── useAuth.ts
│   │   └── RequireAuth.tsx
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── MapView.tsx
│   │   ├── BandungStaticMap.tsx
│   │   ├── StatsCard.tsx
│   │   ├── KpiGrid.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── DataTable.tsx
│   │   ├── TimeSeriesChart.tsx
│   │   └── RealtimeIndicator.tsx
│   ├── mock/              # Mock data generators
│   │   ├── areas.ts
│   │   ├── lamps.ts
│   │   ├── users.ts
│   │   └── timeseries.ts
│   ├── pages/             # Page components
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── AreaDetailPage.tsx
│   │   └── LampDetailPage.tsx
│   ├── services/          # Business logic & data access
│   │   ├── dataService.ts
│   │   └── realtime.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   ├── types.ts           # TypeScript type definitions
│   └── index.css          # Global styles
├── public/
│   └── maps/              # Static map assets
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🎨 Design System

### Colors
- **Primary (Emerald)**: `#10b981` - Brand color, active states
- **Success (Green)**: `#22c55e` - ON status
- **Error (Red)**: `#ef4444` - OFF status
- **Warning (Amber)**: `#f59e0b` - Alerts
- **Neutral (Zinc)**: Background, text, borders

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: 12px (xs), 14px (sm), 16px (base), 20px (xl), 24px (2xl), 30px (3xl)

### Components
- **Cards**: `rounded-xl`, `border border-zinc-200`, `shadow-sm`
- **Spacing**: 4px base unit (12px, 16px, 24px rhythm)
- **Buttons**: Emerald primary, hover states, disabled states

## 📊 Data Model

### Area
```typescript
{
  id: string;
  name: string;
  centroid: [lat, lng];
  lampIds: string[];
}
```

### Lamp
```typescript
{
  id: string;
  areaId: string;
  name: string;
  location: [lat, lng];
  status: "ON" | "OFF";
  currentA: number;
  powerW: number;
  monthlyKWh: number;
}
```

## 🔄 Real-time Simulation

Aplikasi ini menggunakan simulator real-time untuk mendemonstrasikan update data secara live:
- Update setiap 3 detik
- Variasi kecil pada arus dan daya
- Kemungkinan 5% untuk toggle status ON/OFF
- Indikator visual saat data streaming aktif

## 🗺️ Maps

### Dashboard
- Peta statis dengan overlay badge kawasan
- Klik badge untuk navigasi ke detail kawasan

### Detail Kawasan
- Peta interaktif Leaflet dengan OpenStreetMap tiles
- Marker berwarna (hijau=ON, merah=OFF)
- Popup dengan info singkat dan link detail
- Auto-fit bounds ke semua marker

## 📈 Charts

- **Line Chart**: Konsumsi per jam (trend)
- **Bar Chart**: Konsumsi per kawasan (comparison)
- Responsive, soft colors, clear tooltips

## 🚧 Prototype Limitations

Ini adalah prototype dengan data mock lokal:
- Tidak ada backend API
- Data disimpan di memori (hilang saat refresh)
- Auth sederhana (localStorage only)
- Peta statis di dashboard (placeholder)
- 5 kawasan dengan ~25-35 lampu per kawasan

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real MQTT/WebSocket for live data
- [ ] Role-based access control
- [ ] Historical data & analytics
- [ ] Export reports (PDF/Excel)
- [ ] Notification system for failures
- [ ] Mobile responsive improvements
- [ ] Dark mode
- [ ] Polygon area shapes on map
- [ ] Lamp clustering for large datasets

## 📝 License

Prototype untuk demonstrasi. Tidak untuk produksi.

## 👥 Credits

Developed for PJU Monitoring System - Kota Bandung

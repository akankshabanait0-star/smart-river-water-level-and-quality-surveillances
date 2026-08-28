# 🌊 Smart River Water Level and Quality Surveillance

![Live](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![SIH](https://img.shields.io/badge/SIH-2026-orange)

> **Smart India Hackathon 2026** | Problem Statement ID: **SIH26085**  
> Theme: **AI / IoT / Environment** | Category: **Software**  
> Team: **FUN LINES**

---

## 🌐 Live Demo

👉 **[smart-river-water-level-and-quality-surveillance.vercel.app](https://smart-river-water-level-and-quality-surveillance.vercel.app)**

---

## 📌 About The Project

A real-time GIS-based web platform for monitoring **river water levels and quality** across India. The system fetches live telemetry data from **CPCB RTWQMS** (Central Pollution Control Board - Real Time Water Quality Monitoring Stations) and displays it on an interactive map with dynamic alerts.

### ✅ Key Features

- 🗺️ **Interactive India Map** — 40+ river monitoring stations with live color-coded status pins
- 📊 **Real-Time Water Quality Index (WQI)** — Weighted Arithmetic calculation across 12 parameters
- 🚨 **Automated Flood & Toxic Alerts** — Instant threshold-based alerts for dangerous readings
- 🔍 **Smart Cascading Filters** — Filter by River & State with bidirectional auto-sync
- 📄 **1-Click PDF Reports** — A4 inspection reports generated directly in-browser
- 📷 **Live Station Webcams** — CPCB webcam snapshot integration
- 🌙 **Glassmorphism Dark/Light UI** — Modern, responsive design for all screen sizes
- ⚡ **Zero Downtime** — Fallback data system ensures 100% uptime even if CPCB servers are down

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3 (Glassmorphism), Vanilla JavaScript ES6+ |
| **GIS Mapping** | Leaflet.js |
| **Charts** | Chart.js |
| **Backend (Primary)** | Node.js Serverless Function (Vercel Edge) |
| **Backend (Alternative)** | Node.js + Express.js (Render.com) |
| **Backend (Backup)** | Core Java HTTP Server |
| **Data Source** | CPCB RTWQMS API (`rtwqmsdb1.cpcb.gov.in`) |
| **Deployment** | Vercel (Frontend + Serverless) / Render (Express API) |
| **WQI Algorithm** | Weighted Arithmetic Water Quality Index (WAWQI) |

---

## 📁 Project Structure

```
smart-river-surveillance/
│
├── frontend/               # Static Frontend (HTML, CSS, JS)
│   ├── index.html          # Main Dashboard
│   ├── admin.html          # Admin Panel
│   ├── script.js           # Core Logic, Map, Filters, WQI Engine
│   ├── admin.js            # Admin Panel Logic
│   ├── style.css           # Glassmorphism Styling
│   ├── fallback-data.json  # Offline Fallback Dataset
│   └── assets/
│       └── logo.png        # Brand Logo
│
├── api/
│   └── live-data.js        # Vercel Serverless CORS Proxy (CPCB Telemetry)
│
├── backend/                # Express.js REST API (for Render deployment)
│   ├── server.js           # Main Express Server
│   ├── fallback-data.json  # Backend Fallback Dataset
│   ├── config/env.js
│   ├── controllers/data.controller.js
│   ├── routes/api.routes.js
│   └── services/cpcb.service.js
│
├── java-server/            # Core Java HTTP Server (Backup)
│   └── com/surveillance/SmartRiverServer.java
│
├── vercel.json             # Vercel Deployment Config
├── render.yaml             # Render Deployment Config
├── package.json            # Node.js Dependencies
└── README.md               # This File
```

---

## 🚀 Deployment Guide

### Option A: Vercel (Recommended — Free & Fastest)

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) → **"Add New Project"**
3. Import your forked repository
4. Set Project Name: `smart-river-water-level-and-quality-surveillance`
5. Click **"Deploy"** — Done! 🎉

Your site will be live at:  
`https://smart-river-water-level-and-quality-surveillance.vercel.app`

### Option B: Render (Express Backend)

1. Go to [render.com](https://render.com) → **"New Web Service"**
2. Connect your GitHub repository
3. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node backend/server.js`
4. Click **"Create Web Service"**

---

## 📊 Water Quality Parameters Monitored

| Parameter | Standard (BIS IS 10500) |
|-----------|------------------------|
| pH | 6.5 – 8.5 |
| Dissolved Oxygen (DO) | ≥ 6 mg/L |
| BOD | ≤ 3 mg/L |
| COD | ≤ 10 mg/L |
| Turbidity | ≤ 4 NTU |
| Total Dissolved Solids (TDS) | ≤ 500 mg/L |
| Nitrate | ≤ 45 mg/L |
| Conductivity | ≤ 300 µS/cm |
| Temperature | Ambient |
| Ammonia | ≤ 0.5 mg/L |
| Fecal Coliform | ≤ 0 MPN/100mL |
| Total Coliform | ≤ 0 MPN/100mL |

---

## 📜 References & Standards

- [CPCB RTWQMS Live Telemetry](http://rtwqmsdb1.cpcb.gov.in/)
- [BIS IS 10500 Drinking Water Standards](https://www.bis.gov.in/)
- [BIS IS 2296 Water Quality for Outdoor Bathing](https://www.bis.gov.in/)

---

## 🏆 Hackathon Details

| Field | Details |
|-------|---------|
| Problem Statement ID | SIH26085 |
| Title | Smart River Water Level and Quality Surveillance |
| Theme | AI / IoT / Environment |
| Category | Software |
| Team Name | FUN LINES |

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  Made with ❤️ by <strong>Team FUN LINES</strong> for Smart India Hackathon 2026
</div>

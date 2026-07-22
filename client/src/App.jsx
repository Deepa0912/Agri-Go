import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardTab from './components/DashboardTab';
import DiseaseDetectorTab from './components/DiseaseDetectorTab';
import IrrigationFertilizerTab from './components/IrrigationFertilizerTab';
import WeatherAlertsTab from './components/WeatherAlertsTab';
import FarmManagerTab from './components/FarmManagerTab';
import AgriChatbot from './components/AgriChatbot';
import { Sprout, Heart, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [farmData, setFarmData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Fetch initial telemetry from Express backend
  useEffect(() => {
    const loadTelemetry = async () => {
      try {
        const [farmRes, weatherRes] = await Promise.all([
          fetch('/api/farm'),
          fetch('/api/weather')
        ]);
        const farmJson = await farmRes.json();
        const weatherJson = await weatherRes.json();

        if (farmJson.success) setFarmData(farmJson);
        if (weatherJson.success) setWeatherData(weatherJson);
      } catch (err) {
        console.error("Error loading server telemetry:", err);
      }
    };

    loadTelemetry();
  }, []);

  const handleLocationChange = async (lat, lon, locationName) => {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}&location=${encodeURIComponent(locationName)}`);
      const json = await res.json();
      if (json.success) setWeatherData(json);
    } catch (err) {
      console.error("Error updating location weather:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        weatherData={weatherData} 
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardTab setActiveTab={setActiveTab} farmData={farmData} weatherData={weatherData} />
        )}
        {activeTab === 'disease' && (
          <DiseaseDetectorTab />
        )}
        {activeTab === 'schedule' && (
          <IrrigationFertilizerTab />
        )}
        {activeTab === 'weather' && (
          <WeatherAlertsTab weatherData={weatherData} onLocationChange={handleLocationChange} />
        )}
        {activeTab === 'farm' && (
          <FarmManagerTab farmData={farmData} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800 py-8 px-4 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-200">Agri-Go Smart Agriculture Platform</span>
            <span>— Precision AI Crop Intelligence</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              FAO-56 Compliant
            </span>
            <span>API Status: <strong className="text-emerald-400">Connected</strong></span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>

      {/* Floating AI Chatbot Drawer */}
      <AgriChatbot />

    </div>
  );
}

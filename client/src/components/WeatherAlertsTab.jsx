import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  Sun, 
  ShieldAlert, 
  Search,
  MapPin,
  Calendar,
  CloudRain,
  Sparkles,
  Navigation,
  RefreshCw,
  Compass
} from 'lucide-react';

export default function WeatherAlertsTab({ weatherData, onLocationChange }) {
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Bangalore, Karnataka");

  const current = weatherData?.currentWeather || {
    location: "Green Valley Farm",
    temperatureC: 28.5,
    humidity: 78,
    soilTemperatureC: 22.4,
    windSpeedKmh: 12.4,
    windDirection: "ENE",
    rainProbabilityPct: 65,
    uvIndex: 7,
    et0MmDay: 4.8,
    condition: "Partly Cloudy"
  };

  const forecast = weatherData?.forecast || [];
  const alerts = weatherData?.activeAlerts || [];

  // Comprehensive Indian States & Agricultural Districts Database
  const indianLocationsGrouped = [
    {
      state: "Karnataka",
      cities: [
        { name: "Bangalore, Karnataka", lat: 12.9716, lon: 77.5946 },
        { name: "Mysuru, Karnataka", lat: 12.2958, lon: 76.6394 },
        { name: "Mandya, Karnataka", lat: 12.5218, lon: 76.8951 },
        { name: "Hubballi, Karnataka", lat: 15.3647, lon: 75.1240 },
        { name: "Belagavi, Karnataka", lat: 15.8497, lon: 74.4977 },
        { name: "Shivamogga, Karnataka", lat: 13.9299, lon: 75.5681 },
        { name: "Davanagere, Karnataka", lat: 14.4644, lon: 75.9218 }
      ]
    },
    {
      state: "Punjab",
      cities: [
        { name: "Ludhiana, Punjab", lat: 30.9010, lon: 75.8573 },
        { name: "Amritsar, Punjab", lat: 31.6340, lon: 74.8723 },
        { name: "Jalandhar, Punjab", lat: 31.3260, lon: 75.5762 },
        { name: "Patiala, Punjab", lat: 30.3398, lon: 76.3869 },
        { name: "Bathinda, Punjab", lat: 30.2110, lon: 74.9455 },
        { name: "Sangrur, Punjab", lat: 30.2458, lon: 75.8420 }
      ]
    },
    {
      state: "Haryana",
      cities: [
        { name: "Karnal, Haryana", lat: 29.6857, lon: 76.9905 },
        { name: "Hisar, Haryana", lat: 29.1492, lon: 75.7217 },
        { name: "Ambala, Haryana", lat: 30.3782, lon: 76.7767 },
        { name: "Rohtak, Haryana", lat: 28.8955, lon: 76.6066 },
        { name: "Sirsa, Haryana", lat: 29.5349, lon: 75.0297 }
      ]
    },
    {
      state: "Maharashtra",
      cities: [
        { name: "Nashik, Maharashtra", lat: 19.9973, lon: 73.7910 },
        { name: "Pune, Maharashtra", lat: 18.5204, lon: 73.8567 },
        { name: "Nagpur, Maharashtra", lat: 21.1458, lon: 79.0882 },
        { name: "Solapur, Maharashtra", lat: 17.6599, lon: 75.9064 },
        { name: "Chhatrapati Sambhajinagar, Maharashtra", lat: 19.8762, lon: 75.3433 },
        { name: "Kolhapur, Maharashtra", lat: 16.7050, lon: 74.2433 },
        { name: "Jalgaon, Maharashtra", lat: 21.0077, lon: 75.5626 }
      ]
    },
    {
      state: "Uttar Pradesh",
      cities: [
        { name: "Lucknow, Uttar Pradesh", lat: 26.8467, lon: 80.9462 },
        { name: "Varanasi, Uttar Pradesh", lat: 25.3176, lon: 82.9739 },
        { name: "Kanpur, Uttar Pradesh", lat: 26.4499, lon: 80.3319 },
        { name: "Agra, Uttar Pradesh", lat: 27.1767, lon: 78.0081 },
        { name: "Meerut, Uttar Pradesh", lat: 28.9845, lon: 77.7064 },
        { name: "Gorakhpur, Uttar Pradesh", lat: 26.7606, lon: 83.3732 },
        { name: "Prayagraj, Uttar Pradesh", lat: 25.4358, lon: 81.8463 }
      ]
    },
    {
      state: "Telangana & Andhra Pradesh",
      cities: [
        { name: "Hyderabad, Telangana", lat: 17.3850, lon: 78.4867 },
        { name: "Warangal, Telangana", lat: 17.9689, lon: 79.5941 },
        { name: "Nizamabad, Telangana", lat: 18.6725, lon: 78.0941 },
        { name: "Vijayawada, Andhra Pradesh", lat: 16.5062, lon: 80.6480 },
        { name: "Guntur, Andhra Pradesh", lat: 16.3067, lon: 80.4365 },
        { name: "Visakhapatnam, Andhra Pradesh", lat: 17.6868, lon: 83.2185 },
        { name: "Kurnool, Andhra Pradesh", lat: 15.8281, lon: 78.0373 }
      ]
    },
    {
      state: "Tamil Nadu",
      cities: [
        { name: "Chennai, Tamil Nadu", lat: 13.0827, lon: 80.2707 },
        { name: "Coimbatore, Tamil Nadu", lat: 11.0168, lon: 76.9558 },
        { name: "Madurai, Tamil Nadu", lat: 9.9252, lon: 78.1198 },
        { name: "Tiruchirappalli, Tamil Nadu", lat: 10.7905, lon: 78.7047 },
        { name: "Salem, Tamil Nadu", lat: 11.6643, lon: 78.1460 },
        { name: "Thanjavur, Tamil Nadu", lat: 10.7870, lon: 79.1378 }
      ]
    },
    {
      state: "Gujarat",
      cities: [
        { name: "Ahmedabad, Gujarat", lat: 23.0225, lon: 72.5714 },
        { name: "Surat, Gujarat", lat: 21.1702, lon: 72.8311 },
        { name: "Rajkot, Gujarat", lat: 22.3039, lon: 70.8022 },
        { name: "Vadodara, Gujarat", lat: 22.3072, lon: 73.1812 },
        { name: "Junagadh, Gujarat", lat: 21.5222, lon: 70.4579 },
        { name: "Anand, Gujarat", lat: 22.5645, lon: 72.9289 }
      ]
    },
    {
      state: "West Bengal",
      cities: [
        { name: "Kolkata, West Bengal", lat: 22.5726, lon: 88.3639 },
        { name: "Siliguri, West Bengal", lat: 26.7271, lon: 88.3953 },
        { name: "Bardhaman, West Bengal", lat: 23.2324, lon: 87.8615 },
        { name: "Malda, West Bengal", lat: 25.0108, lon: 88.1411 },
        { name: "Murshidabad, West Bengal", lat: 24.1750, lon: 88.2800 }
      ]
    },
    {
      state: "Madhya Pradesh",
      cities: [
        { name: "Bhopal, Madhya Pradesh", lat: 23.2599, lon: 77.4126 },
        { name: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577 },
        { name: "Jabalpur, Madhya Pradesh", lat: 23.1815, lon: 79.9864 },
        { name: "Gwalior, Madhya Pradesh", lat: 26.2183, lon: 78.1828 },
        { name: "Ujjain, Madhya Pradesh", lat: 23.1765, lon: 75.7885 }
      ]
    },
    {
      state: "Rajasthan",
      cities: [
        { name: "Jaipur, Rajasthan", lat: 26.9124, lon: 75.7873 },
        { name: "Jodhpur, Rajasthan", lat: 26.2389, lon: 73.0243 },
        { name: "Kota, Rajasthan", lat: 25.2138, lon: 75.8648 },
        { name: "Udaipur, Rajasthan", lat: 24.5854, lon: 73.7125 },
        { name: "Sri Ganganagar, Rajasthan", lat: 29.9038, lon: 73.8772 }
      ]
    },
    {
      state: "Bihar & Jharkhand",
      cities: [
        { name: "Patna, Bihar", lat: 25.5941, lon: 85.1376 },
        { name: "Muzaffarpur, Bihar", lat: 26.1209, lon: 85.3647 },
        { name: "Gaya, Bihar", lat: 24.7914, lon: 85.0002 },
        { name: "Ranchi, Jharkhand", lat: 23.3441, lon: 85.3096 },
        { name: "Jamshedpur, Jharkhand", lat: 22.8046, lon: 86.2029 }
      ]
    },
    {
      state: "Kerala",
      cities: [
        { name: "Thiruvananthapuram, Kerala", lat: 8.5241, lon: 76.9366 },
        { name: "Kochi, Kerala", lat: 9.9312, lon: 76.2673 },
        { name: "Kozhikode, Kerala", lat: 11.2588, lon: 75.7804 },
        { name: "Palakkad, Kerala", lat: 10.7867, lon: 76.6548 },
        { name: "Wayanad, Kerala", lat: 11.6854, lon: 76.1320 }
      ]
    },
    {
      state: "Odisha & Chhattisgarh",
      cities: [
        { name: "Bhubaneswar, Odisha", lat: 20.2961, lon: 85.8245 },
        { name: "Cuttack, Odisha", lat: 20.4625, lon: 85.8828 },
        { name: "Sambalpur, Odisha", lat: 21.4669, lon: 83.9812 },
        { name: "Raipur, Chhattisgarh", lat: 21.2514, lon: 81.6296 },
        { name: "Bilaspur, Chhattisgarh", lat: 22.0797, lon: 82.1391 }
      ]
    },
    {
      state: "North-East India",
      cities: [
        { name: "Guwahati, Assam", lat: 26.1445, lon: 91.7362 },
        { name: "Jorhat, Assam", lat: 26.7509, lon: 94.2037 },
        { name: "Shillong, Meghalaya", lat: 25.5788, lon: 91.8933 },
        { name: "Agartala, Tripura", lat: 23.8315, lon: 91.2868 },
        { name: "Imphal, Manipur", lat: 24.8170, lon: 93.9368 }
      ]
    },
    {
      state: "Himachal & J&K",
      cities: [
        { name: "Shimla, Himachal Pradesh", lat: 31.1048, lon: 77.1734 },
        { name: "Solan, Himachal Pradesh", lat: 30.9084, lon: 77.0999 },
        { name: "Jammu, J&K", lat: 32.7266, lon: 74.8570 },
        { name: "Srinagar, J&K", lat: 34.0837, lon: 74.7973 }
      ]
    }
  ];

  const handleSelectCity = (city) => {
    setSelectedRegion(city.name);
    setSearchQuery("");
    setSearchResults([]);
    if (onLocationChange) {
      onLocationChange(city.lat, city.lon, city.name);
    }
  };

  const handleGPSLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const name = `My Farm (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`;
        setSelectedRegion(name);
        setIsLocating(false);
        if (onLocationChange) {
          onLocationChange(lat, lon, name);
        }
      },
      (err) => {
        console.error(err);
        setIsLocating(false);
        alert("Unable to retrieve GPS coordinates. Please select an Indian district from the dropdown.");
      }
    );
  };

  // Instant Search Indian Cities/Villages via Open-Meteo Geocoding
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery.trim())}&count=6&language=en&format=json`;
      const res = await fetch(geoUrl);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setSearchResults(data.results.map(r => ({
          name: `${r.name}, ${r.admin1 || r.country}`,
          lat: r.latitude,
          lon: r.longitude
        })));
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Page Title & Location Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Real-Time India Agricultural Telemetry</span>
            {current.isRealtime && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Real-Time Weather & Spray Advisories
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Live microclimate telemetry and spray suitability for <strong className="text-emerald-400">{current.location}</strong>.
          </p>
        </div>

        {/* Location Selection & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* GPS Auto-Detect Button */}
          <button
            onClick={handleGPSLocation}
            disabled={isLocating}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            {isLocating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
            <span>GPS Location</span>
          </button>

          {/* Grouped Indian Districts Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => {
              for (const group of indianLocationsGrouped) {
                const found = group.cities.find(c => c.name === e.target.value);
                if (found) {
                  handleSelectCity(found);
                  break;
                }
              }
            }}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
          >
            {indianLocationsGrouped.map((group) => (
              <optgroup key={group.state} label={`🇮🇳 ${group.state}`}>
                {group.cities.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </optgroup>
            ))}
          </select>

        </div>
      </div>

      {/* Live Search Input Bar for Any Indian Town/Village */}
      <div className="relative glass-card rounded-2xl p-4 border border-slate-800">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Type any Indian district, city, or village name (e.g. Nashik, Ludhiana, Mandya, Warangal)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none font-medium"
          />
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center gap-1 transition-colors"
          >
            {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            <span>Search</span>
          </button>
        </form>

        {/* Live Search Autocomplete Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-slate-900 border border-emerald-500/40 rounded-2xl p-2 shadow-2xl space-y-1">
            <span className="text-[10px] font-bold text-slate-400 px-3 uppercase">Select Location Result:</span>
            {searchResults.map((res, i) => (
              <button
                key={i}
                onClick={() => handleSelectCity(res)}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-emerald-500/20 hover:text-emerald-300 font-semibold flex items-center justify-between transition-colors"
              >
                <span>🇮🇳 {res.name}</span>
                <span className="text-[10px] text-slate-500">{res.lat.toFixed(2)}°, {res.lon.toFixed(2)}°</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Microclimate Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center hover:border-amber-500/40 transition-all">
          <Thermometer className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Air Temp</span>
          <p className="text-2xl font-black text-white mt-1">{current.temperatureC}°C</p>
          <span className="text-[10px] text-slate-500 font-medium">Feels {current.feelsLikeC}°C</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center hover:border-cyan-500/40 transition-all">
          <Droplets className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Humidity</span>
          <p className="text-2xl font-black text-white mt-1">{current.humidity}%</p>
          <span className={`text-[10px] font-semibold ${current.humidity > 75 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {current.humidity > 75 ? 'High Fungal Risk' : 'Normal'}
          </span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center hover:border-blue-500/40 transition-all">
          <CloudRain className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Rain Chance</span>
          <p className="text-2xl font-black text-white mt-1">{current.rainProbabilityPct}%</p>
          <span className="text-[10px] text-slate-500">Max Today</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center hover:border-teal-500/40 transition-all">
          <Wind className="w-5 h-5 text-teal-400 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Wind Vector</span>
          <p className="text-2xl font-black text-white mt-1">{current.windSpeedKmh} <span className="text-xs font-normal text-slate-400">km/h</span></p>
          <span className="text-[10px] text-teal-300 font-bold">{current.windDirection}</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center hover:border-amber-300/40 transition-all">
          <Sun className="w-5 h-5 text-amber-300 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">UV Index</span>
          <p className="text-2xl font-black text-white mt-1">{current.uvIndex} <span className="text-xs font-normal text-slate-400">/ 12</span></p>
          <span className="text-[10px] text-amber-400 font-semibold">{current.uvIndex > 7 ? 'Extreme UV' : 'Moderate'}</span>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center hover:border-emerald-500/40 transition-all">
          <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">ET0 Loss</span>
          <p className="text-2xl font-black text-white mt-1">{current.et0MmDay} <span className="text-xs font-normal text-slate-400">mm</span></p>
          <span className="text-[10px] text-slate-500">Evapotranspiration</span>
        </div>

      </div>

      {/* Active Agricultural Risk Alerts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Live Agricultural Risk Advisories
          </h2>
          <span className="text-xs text-amber-400 font-semibold">{alerts.length} Active Telemetry Alerts</span>
        </div>

        {alerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`glass-card rounded-3xl p-6 border transition-all ${
                  alert.severity === 'HIGH' 
                    ? 'border-rose-500/40 bg-rose-950/10' 
                    : alert.severity === 'MEDIUM' 
                    ? 'border-amber-500/40 bg-amber-950/10' 
                    : 'border-cyan-500/40 bg-cyan-950/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    alert.severity === 'HIGH' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : alert.severity === 'MEDIUM' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {alert.severity} • {alert.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{alert.dateIssued}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{alert.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{alert.description}</p>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-medium">
                  <span className="font-bold text-emerald-400 block mb-0.5">Agronomic Recommendation:</span>
                  {alert.recommendation}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-4 text-center text-slate-400 text-xs">
            No severe agricultural alerts detected for {current.location}. Environmental conditions are stable.
          </div>
        )}
      </div>

      {/* 7-Day Forecast & Spray Window Grid */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              7-Day Real-Time Forecast & Spray Suitability Index
            </h3>
            <p className="text-xs text-slate-400">Spray suitability is computed from real-time wind speed, precipitation risk, and humidity.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {forecast.map((item, idx) => {
            const isFavorable = item.sprayWindow === 'Favorable';
            const isModerate = item.sprayWindow === 'Moderate Risk';

            return (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{item.day}</span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>

                  <div className="my-3 text-center">
                    <span className="text-2xl font-black text-white">{item.tempHigh}°</span>
                    <span className="text-xs text-slate-400 ml-1">/ {item.tempLow}°C</span>
                    <p className="text-[11px] text-slate-300 font-medium mt-1">{item.condition}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Rain:</span>
                    <span className="font-bold text-cyan-400">{item.rainProbability}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Wind:</span>
                    <span className="font-bold text-teal-400">{item.windKmh} km/h</span>
                  </div>

                  <div className={`mt-2 p-2 rounded-xl text-center text-[10px] font-extrabold ${
                    isFavorable 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : isModerate 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {item.sprayWindow}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

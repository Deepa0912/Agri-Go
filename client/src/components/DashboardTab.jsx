import React from 'react';
import { 
  Sprout, 
  Scan, 
  Droplets, 
  CloudSun, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Activity, 
  Wind, 
  Thermometer, 
  Zap, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function DashboardTab({ setActiveTab, farmData, weatherData }) {
  const farm = farmData?.farm || {
    farmName: "Agri-Go Smart Field Alpha",
    totalAcreage: 18.5,
    activeCropsCount: 4,
    overallHealthScore: 92,
    waterSavedLitersThisMonth: 142500,
    activeAlertsCount: 3,
    fields: [],
    recentActivities: []
  };

  const weather = weatherData?.currentWeather || {
    temperatureC: 28.5,
    humidity: 78,
    soilMoisturePct: 52,
    rainProbabilityPct: 65,
    condition: "Partly Cloudy with Humid Intervals"
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Agronomic Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back to <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{farm.farmName}</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your fields are operating at <strong className="text-emerald-400">92% optimal health</strong>. 
              High atmospheric humidity today elevates fungal risk in Roma Tomatoes. Review disease alerts below.
            </p>
          </div>

          {/* Action Hub Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('disease')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Scan className="w-5 h-5" />
              <span>Scan Leaf Image</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
            >
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>Plan Irrigation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Health Index */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-emerald-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Crop Health Score</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{farm.overallHealthScore}%</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +3.2%
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: `${farm.overallHealthScore}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Optimal photosynthesis & foliage vigor</p>
        </div>

        {/* Metric 2: Active Acreage */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-teal-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Acreage</span>
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{farm.totalAcreage}</span>
            <span className="text-sm font-semibold text-slate-400">Acres</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Cultivated Fields:</span>
            <span className="font-bold text-teal-300">{farm.activeCropsCount} Zones</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Tomatoes, Corn, Rice & Potato</p>
        </div>

        {/* Metric 3: Water Saved */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Water Conserved</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{(farm.waterSavedLitersThisMonth / 1000).toFixed(1)}k</span>
            <span className="text-sm font-semibold text-slate-400">Liters</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Efficiency Boost:</span>
            <span className="font-bold text-cyan-400">+24% vs Flood</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Smart drip ET0 schedule optimized</p>
        </div>

        {/* Metric 4: Active Alerts */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-amber-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Advisories</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400">{farm.activeAlertsCount}</span>
            <span className="text-sm font-semibold text-slate-400">Alerts</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">High Severity:</span>
            <span className="font-bold text-rose-400">1 Fungal Risk</span>
          </div>
          <p className="mt-2 text-[11px] text-amber-300/80">Requires preventive copper spray</p>
        </div>

      </div>

      {/* Main Content Layout: Fields + Microclimate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Active Crop Fields (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">Active Crop Fields</h2>
              <p className="text-xs text-slate-400">Real-time status across your farm parcels</p>
            </div>
            <button 
              onClick={() => setActiveTab('farm')}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Manage Fields</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {farm.fields.map((field) => (
              <div 
                key={field.id}
                className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">{field.crop}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      field.healthStatus.includes('Warning') 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {field.healthStatus}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{field.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Stage: <strong className="text-slate-300">{field.stage}</strong> ({field.acreage} Acres)</p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Soil Moisture:</span>
                    <span className="font-semibold text-cyan-400">{field.soilMoisturePct}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Next Fertigation:</span>
                    <span className="font-semibold text-emerald-400">{field.nextFertilizerDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Banner for Disease Detector */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-900/40 via-slate-900 to-teal-900/40 border border-emerald-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Scan className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Noticed discolored leaves or spots?</h4>
                <p className="text-xs text-slate-300">Upload a leaf photo to get instant AI disease diagnosis & organic remedy steps.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('disease')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors whitespace-nowrap"
            >
              Launch AI Scanner
            </button>
          </div>

        </div>

        {/* Right Column: Microclimate Widget + Activity Feed (1 col) */}
        <div className="space-y-6">
          
          {/* Microclimate Card */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Live Microclimate</h3>
              </div>
              <button 
                onClick={() => setActiveTab('weather')}
                className="text-[11px] text-emerald-400 hover:underline font-semibold"
              >
                Full Forecast
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-white">{weather.temperatureC}°C</span>
                <p className="text-xs text-slate-400 mt-0.5">{weather.condition}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400">Rain Risk</span>
                <p className="text-base font-extrabold text-cyan-400">{weather.rainProbabilityPct}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Humidity</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{weather.humidity}%</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Soil Temp</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">22.4°C</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Recent Activity Log</h3>
              </div>
            </div>

            <div className="space-y-3.5">
              {farm.recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-200">{act.title}</p>
                    <p className="text-slate-400 text-[11px]">{act.result}</p>
                    <span className="text-[10px] text-slate-500">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

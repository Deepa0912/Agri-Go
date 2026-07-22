import React from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  Scan, 
  Droplets, 
  CloudSun, 
  Tractor, 
  Sun, 
  Moon, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isDarkMode, setIsDarkMode, weatherData }) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'disease', label: 'AI Disease Scan', icon: Scan, badge: 'AI' },
    { id: 'schedule', label: 'Irrigation & Fertilizer', icon: Droplets },
    { id: 'weather', label: 'Weather & Advisories', icon: CloudSun, alertCount: weatherData?.activeAlerts?.length || 0 },
    { id: 'farm', label: 'Field Manager', icon: Tractor }
  ];

  const currentTemp = weatherData?.currentWeather?.temperatureC ? `${weatherData.currentWeather.temperatureC}°C` : '28.5°C';

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-2 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  Agri-Go
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Smart Agriculture Platform
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-black uppercase px-1 py-0.2 rounded bg-teal-400 text-slate-950 flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}
                  {item.alertCount > 0 && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-1 right-1" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            {/* Live Weather Ticker Pill */}
            <div 
              onClick={() => setActiveTab('weather')}
              className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 hover:border-emerald-500/40 cursor-pointer transition-colors"
            >
              <CloudSun className="w-4 h-4 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium leading-none">Sector 4</span>
                <span className="font-bold text-emerald-400 leading-tight">{currentTemp}</span>
              </div>
            </div>

            {/* AI Scan Direct Action */}
            <button
              onClick={() => setActiveTab('disease')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Scan className="w-4 h-4" />
              <span className="hidden sm:inline">Scan Leaf</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Row */}
      <div className="md:hidden flex items-center justify-around bg-slate-950/90 py-2 border-t border-slate-800 px-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-emerald-400 bg-slate-800/80 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

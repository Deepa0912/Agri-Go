import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Zap, 
  Info, 
  RefreshCw, 
  Clock, 
  ArrowRight,
  TrendingDown,
  Printer
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function IrrigationFertilizerTab() {
  const [crop, setCrop] = useState("Tomato");
  const [soilType, setSoilType] = useState("Loam");
  const [growthStage, setGrowthStage] = useState("Flowering");
  const [acreage, setAcreage] = useState(2.5);
  const [currentSoilMoisture, setCurrentSoilMoisture] = useState(45);
  const [soilN, setSoilN] = useState(30);
  const [soilP, setSoilP] = useState(20);
  const [soilK, setSoilK] = useState(25);

  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const fetchCalculation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/schedule/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop,
          soilType,
          growthStage,
          acreage: Number(acreage),
          currentSoilMoisture: Number(currentSoilMoisture),
          soilNPK: { N: Number(soilN), P: Number(soilP), K: Number(soilK) }
        })
      });
      const data = await response.json();
      if (data.success) {
        setRecommendation(data);
      }
    } catch (err) {
      console.error("Calculation fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalculation();
  }, [crop, soilType, growthStage]);

  const chartData = recommendation ? [
    { name: 'Nitrogen (N)', Current: soilN, Target: recommendation.nutrientAnalysis.targetsKgPerAcre.N },
    { name: 'Phosphorus (P)', Current: soilP, Target: recommendation.nutrientAnalysis.targetsKgPerAcre.P },
    { name: 'Potassium (K)', Current: soilK, Target: recommendation.nutrientAnalysis.targetsKgPerAcre.K },
  ] : [];

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
          <Droplets className="w-3.5 h-3.5" />
          <span>FAO-56 Evapotranspiration & N-P-K Nutrient Algorithm</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Smart Irrigation & Fertilizer Calculator
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Input your field parameters to generate precise daily water volumes and customized N-P-K fertigation schedules tailored to your soil texture and crop stage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Field Agronomic Profile
            </h3>

            {/* Crop Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Crop Selection</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
              >
                <option value="Tomato">Tomato</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Maize / Corn">Maize / Corn</option>
                <option value="Potato">Potato</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>

            {/* Soil Type & Growth Stage Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
                >
                  <option value="Loam">Loam (Ideal)</option>
                  <option value="Clay">Clay (High Water Retention)</option>
                  <option value="Sandy">Sandy (Rapid Drainage)</option>
                  <option value="Silt">Silt (Rich Moisture)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Growth Stage</label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
                >
                  <option value="Germination">Germination</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering & Fruit Set</option>
                  <option value="Fruiting/Maturity">Maturity / Harvest</option>
                </select>
              </div>
            </div>

            {/* Field Acreage Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>Field Size (Acres):</span>
                <span className="text-cyan-400 font-extrabold">{acreage} Acres</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={acreage}
                onChange={(e) => setAcreage(e.target.value)}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Current Soil Moisture Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>Current Soil Moisture:</span>
                <span className="text-cyan-400 font-extrabold">{currentSoilMoisture}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={currentSoilMoisture}
                onChange={(e) => setCurrentSoilMoisture(e.target.value)}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Soil NPK Baseline Sliders */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Current Soil Nutrient Baseline (kg/acre):
              </span>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 font-bold block">N (Nitrogen)</span>
                  <input 
                    type="number" 
                    value={soilN} 
                    onChange={(e) => setSoilN(e.target.value)} 
                    className="w-full bg-transparent text-center font-black text-white text-sm focus:outline-none"
                  />
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-cyan-400 font-bold block">P (Phosporus)</span>
                  <input 
                    type="number" 
                    value={soilP} 
                    onChange={(e) => setSoilP(e.target.value)} 
                    className="w-full bg-transparent text-center font-black text-white text-sm focus:outline-none"
                  />
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-amber-400 font-bold block">K (Potassium)</span>
                  <input 
                    type="number" 
                    value={soilK} 
                    onChange={(e) => setSoilK(e.target.value)} 
                    className="w-full bg-transparent text-center font-black text-white text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={fetchCalculation}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              <span>Calculate Water & NPK Requirements</span>
            </button>

          </div>
        </div>

        {/* Right Output Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {recommendation ? (
            <div className="space-y-6">
              
              {/* Summary Metric Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card rounded-2xl p-4 border border-cyan-500/30 bg-cyan-950/20">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Daily Water Needed</span>
                  <p className="text-2xl font-black text-white mt-1">
                    {(recommendation.waterRequirement.totalFarmDailyLiters).toLocaleString()} <span className="text-xs text-slate-400 font-medium">L/day</span>
                  </p>
                  <p className="text-[11px] text-cyan-300/80 mt-1">~{recommendation.waterRequirement.weeklyTotalCubicMeters} m³ per week</p>
                </div>

                <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/20">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Nitrogen Deficit (N)</span>
                  <p className="text-2xl font-black text-white mt-1">
                    {recommendation.nutrientAnalysis.deficitsKgPerAcre.N} <span className="text-xs text-slate-400 font-medium">kg/acre</span>
                  </p>
                  <p className="text-[11px] text-emerald-300/80 mt-1">Urea: {recommendation.nutrientAnalysis.commercialFertilizerNeeds.urea}</p>
                </div>

                <div className="glass-card rounded-2xl p-4 border border-amber-500/30 bg-amber-950/20">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Soil Moisture Status</span>
                  <p className="text-sm font-bold text-amber-300 mt-1">
                    {recommendation.summary.moistureStatus}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Optimal Target: 60-80%</p>
                </div>
              </div>

              {/* NPK Target Bar Chart */}
              <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Nutrient Deficit & Target Comparison (kg / Acre)
                </h4>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="Current" fill="#38bdf8" radius={[6, 6, 0, 0]} name="Current Soil Level" />
                      <Bar dataKey="Target" fill="#22c55e" radius={[6, 6, 0, 0]} name="Target Crop Need" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Soil Advice Banner */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Soil Specific Agronomic Advice:</span>
                  <p>{recommendation.waterRequirement.soilAdvice}</p>
                </div>
              </div>

              {/* Actionable 7-Day Application Calendar */}
              <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    7-Day Water & Fertigation Calendar
                  </h4>
                  <button 
                    onClick={() => window.print()}
                    className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 no-print"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Schedule
                  </button>
                </div>

                <div className="space-y-3">
                  {recommendation.schedule.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-center p-2 rounded-xl bg-slate-800 border border-slate-700">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">{item.day}</span>
                          <span className="font-extrabold text-cyan-400 text-xs">{item.dateString.split(',')[1]}</span>
                        </div>
                        <div>
                          <span className="font-bold text-white text-sm">{item.actionType}</span>
                          <p className="text-slate-400 text-[11px] mt-0.5">{item.notes}</p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="font-extrabold text-cyan-300 block">{item.waterVolumeLiters.toLocaleString()} Liters</span>
                        <span className="text-[10px] text-slate-500">Duration: ~{item.durationMinutes} mins</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 border border-slate-800 text-center text-slate-500">
              <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-cyan-400" />
              <p className="text-xs">Computing optimal irrigation schedule...</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

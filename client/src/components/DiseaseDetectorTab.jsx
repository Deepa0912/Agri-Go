import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Leaf, 
  RefreshCw, 
  Bug, 
  Printer, 
  Info,
  ChevronRight,
  Target
} from 'lucide-react';

export default function DiseaseDetectorTab() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileObject, setFileObject] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  // Preset Leaf samples for instant demonstration
  const samplePresets = [
    { id: 'tomato_early_blight', label: 'Tomato Early Blight', crop: 'Tomato', color: 'from-amber-500 to-red-500' },
    { id: 'tomato_late_blight', label: 'Tomato Late Blight', crop: 'Tomato', color: 'from-red-600 to-rose-700' },
    { id: 'corn_common_rust', label: 'Corn Common Rust', crop: 'Maize / Corn', color: 'from-yellow-600 to-amber-700' },
    { id: 'apple_black_rot', label: 'Apple Black Rot', crop: 'Apple', color: 'from-purple-600 to-indigo-700' },
    { id: 'rice_brown_spot', label: 'Rice Brown Spot', crop: 'Rice', color: 'from-yellow-500 to-amber-600' },
    { id: 'healthy_leaf', label: 'Healthy Leaf Sample', crop: 'General', color: 'from-emerald-500 to-teal-500' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileObject(file);
      setSelectedPreset(null);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setErrorMsg("");
    }
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id);
    setSelectedCrop(preset.crop);
    setFileObject(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setErrorMsg("");
  };

  const handleRunScan = async () => {
    if (!fileObject && !selectedPreset) {
      setErrorMsg("Please upload a leaf photo or select a sample preset.");
      return;
    }

    setIsScanning(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      if (fileObject) {
        formData.append('leafImage', fileObject);
      }
      formData.append('cropType', selectedCrop);
      if (selectedPreset) {
        formData.append('presetId', selectedPreset);
      }

      const response = await fetch('/api/predict-disease', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      // Simulate a realistic vision scan delay for user feedback
      setTimeout(() => {
        setIsScanning(false);
        if (data.success) {
          setAnalysisResult(data.analysis);
        } else {
          setErrorMsg(data.message || "Failed to analyze leaf image.");
        }
      }, 1500);

    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setIsScanning(false);
        setErrorMsg("Error connecting to AI prediction server.");
      }, 1000);
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setFileObject(null);
    setSelectedPreset(null);
    setAnalysisResult(null);
    setErrorMsg("");
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AgriVision Computer Vision Engine v3.2</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI Crop Disease Predictor
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Upload a high-resolution leaf photograph or choose a sample preset to detect fungal, bacterial, or viral plant pathologies with actionable treatment protocols.
        </p>
      </div>

      {/* Main Upload / Preset Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5">
            
            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Crop Type
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="Tomato">Tomato (Solanum lycopersicum)</option>
                <option value="Maize / Corn">Maize / Corn (Zea mays)</option>
                <option value="Apple">Apple (Malus domestica)</option>
                <option value="Rice">Rice (Oryza sativa)</option>
                <option value="Potato">Potato (Solanum tuberosum)</option>
                <option value="Grape">Grape (Vitis vinifera)</option>
                <option value="Cotton">Cotton (Gossypium)</option>
                <option value="General">General / Other Crop</option>
              </select>
            </div>

            {/* Dropzone Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Upload Leaf Photo
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  previewUrl
                    ? 'border-emerald-500 bg-emerald-950/20'
                    : 'border-slate-700 hover:border-emerald-500/60 bg-slate-900/40 hover:bg-slate-900/80'
                }`}
              >
                {previewUrl ? (
                  <div className="space-y-3">
                    <img
                      src={previewUrl}
                      alt="Leaf Preview"
                      className="max-h-48 mx-auto rounded-xl object-contain border border-emerald-500/30 shadow-lg"
                    />
                    <p className="text-xs text-emerald-400 font-semibold">Image selected. Click to change.</p>
                  </div>
                ) : (
                  <div className="space-y-3 py-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Click to browse or drag leaf photo here</p>
                      <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP (Max 10MB)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preset Samples Picker */}
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Or Select a Preset Leaf Sample:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {samplePresets.map((preset) => {
                  const isSelected = selectedPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${preset.color}`} />
                      <span className="truncate">{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Analyze Action Button */}
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Scanning Leaf & Neural Pathogen Analysis...</span>
                </>
              ) : (
                <>
                  <Scan className="w-5 h-5" />
                  <span>Run AI Disease Diagnosis</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Right Output Column (7 cols) */}
        <div className="lg:col-span-7">
          
          {isScanning ? (
            /* Scanning Animation State */
            <div className="glass-card rounded-3xl p-12 border border-slate-800 text-center space-y-6 flex flex-col items-center justify-center min-h-[480px]">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-900 flex items-center justify-center shadow-2xl">
                {previewUrl ? (
                  <img src={previewUrl} alt="Scanning" className="w-full h-full object-cover opacity-60" />
                ) : (
                  <Leaf className="w-20 h-20 text-emerald-400 opacity-40 animate-pulse" />
                )}
                {/* Laser scan line overlay */}
                <div className="absolute inset-x-0 scan-line animate-scan" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Analyzing Leaf Micro-texture</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Detecting chlorotic ring halos, necrotic spot patterns, and fungal spore distribution...
                </p>
              </div>
            </div>
          ) : analysisResult ? (
            /* Diagnosis Results View */
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn">
              
              {/* Top Banner: Diagnosis & Confidence Score */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Diagnosis Result</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {analysisResult.crop}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{analysisResult.diseaseName}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">AI Confidence</span>
                    <span className="text-2xl font-black text-emerald-400">{analysisResult.confidence}%</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Leaf Visual Overlay Canvas Simulation */}
              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-emerald-400" />
                    Visual Lesion Bounding Heatmap
                  </span>
                  <span className="text-slate-500 text-[10px]">Affected Surface: {analysisResult.affectedArea}</span>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-slate-900 max-h-64 flex items-center justify-center border border-slate-800">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Analyzed Leaf" className="max-h-64 object-contain" />
                  ) : (
                    <div className="py-12 text-center text-slate-500">
                      <Leaf className="w-16 h-16 mx-auto mb-2 opacity-30 text-emerald-400" />
                      <p className="text-xs">Preset Simulation Active</p>
                    </div>
                  )}

                  {/* Highlight boxes simulation */}
                  {analysisResult.boxHighlights?.map((box, idx) => (
                    <div
                      key={idx}
                      className="absolute border-2 border-amber-400 bg-amber-400/20 rounded shadow-lg text-[10px] font-bold text-amber-200 px-1 py-0.5 flex items-start justify-start"
                      style={{
                        left: `${box.x}%`,
                        top: `${box.y}%`,
                        width: `${box.width}%`,
                        height: `${box.height}%`
                      }}
                    >
                      <span className="bg-slate-950/80 px-1 rounded text-[9px] truncate">{box.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disease Cause & Symptoms */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Bug className="w-4 h-4 text-amber-400" />
                  Pathogen Cause & Observed Symptoms
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  {analysisResult.cause}
                </p>

                <ul className="space-y-2">
                  {analysisResult.symptoms?.map((symptom, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatment Protocols: Organic vs Chemical */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Organic Treatments */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    Organic & Biological Remedies
                  </h5>
                  <ul className="space-y-2">
                    {analysisResult.organicTreatment?.map((item, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chemical Controls */}
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
                  <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    Chemical Fungicide Controls
                  </h5>
                  <ul className="space-y-2">
                    {analysisResult.chemicalTreatment?.map((item, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 no-print">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Scan Another Leaf</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Diagnosis Report</span>
                </button>
              </div>

            </div>
          ) : (
            /* Empty State Placeholder */
            <div className="glass-card rounded-3xl p-12 border border-slate-800 text-center space-y-4 flex flex-col items-center justify-center min-h-[480px]">
              <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 text-slate-600 flex items-center justify-center">
                <Scan className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-lg font-bold text-white">Ready for Leaf Diagnosis</h3>
                <p className="text-xs text-slate-400">
                  Select a crop, upload a leaf photograph on the left, or click a preset sample to view instant neural diagnosis results.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

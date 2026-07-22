import React, { useState, useEffect } from 'react';
import { 
  Tractor, 
  CheckSquare, 
  Square, 
  Plus, 
  MapPin, 
  Sprout, 
  Droplets, 
  Calendar, 
  Layers, 
  Sparkles, 
  Activity,
  RefreshCw
} from 'lucide-react';

export default function FarmManagerTab({ farmData }) {
  const [tasks, setTasks] = useState(farmData?.farm?.tasks || [
    { id: 1, text: "Apply copper octanoate spray on Roma Tomatoes (Field A)", field: "Field A", completed: false, priority: "HIGH" },
    { id: 2, text: "Check drip line pressure emitters in Sweet Corn (Field B)", field: "Field B", completed: true, priority: "MEDIUM" },
    { id: 3, text: "Soil N-P-K nutrient lab sample collection for Basmati Paddy", field: "Field C", completed: false, priority: "LOW" },
    { id: 4, text: "Second Urea fertigation split application for Russet Potatoes", field: "Field D", completed: false, priority: "HIGH" }
  ]);

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskField, setNewTaskField] = useState("Field A");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (farmData?.farm?.tasks) {
      setTasks(farmData.farm.tasks);
    }
  }, [farmData]);

  const toggleTask = async (id) => {
    // Optimistic UI update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

    try {
      const res = await fetch(`/api/farm/tasks/${id}`, { method: 'PUT' });
      const data = await res.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error("Task toggle error:", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || isSaving) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/farm/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newTaskText.trim(),
          field: newTaskField,
          priority: "MEDIUM"
        })
      });
      const data = await res.json();
      if (data.success) {
        setTasks(data.tasks);
        setNewTaskText("");
      }
    } catch (err) {
      console.error("Task add error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const fields = farmData?.farm?.fields || [];

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Tractor className="w-3.5 h-3.5" />
          <span>Real-Time Field Operations & Task Manager</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Farm Field Manager
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Scout individual field parcels, monitor crop growth stage progression, and manage field labor task checklists with persistent real-time storage.
        </p>
      </div>

      {/* Field Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          Cultivated Field Parcels ({fields.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field) => (
            <div 
              key={field.id}
              className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{field.crop}</span>
                  <h3 className="text-lg font-black text-white mt-0.5">{field.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-300 block">{field.acreage} Acres</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                    field.healthStatus.includes('Warning') 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {field.healthStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Current Stage:</span>
                  <span className="font-bold text-white mt-0.5 block">{field.stage}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Soil Moisture:</span>
                  <span className="font-bold text-cyan-400 mt-0.5 block">{field.soilMoisturePct}%</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                <span>Last Irrigation: <strong className="text-slate-200">{field.lastIrrigation}</strong></span>
                <span>Next Fertigation: <strong className="text-emerald-400">{field.nextFertilizerDate}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Checklist Manager */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              Agronomic Field Task Manager
            </h3>
            <p className="text-xs text-slate-400">Tasks are synchronized live with persistent backend storage.</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold">
            {tasks.filter(t => t.completed).length} / {tasks.length} Completed
          </span>
        </div>

        {/* Task Entry Form */}
        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Add a new farm task or spray reminder..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
          />
          <select
            value={newTaskField}
            onChange={(e) => setNewTaskField(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
          >
            <option value="Field A">Field A</option>
            <option value="Field B">Field B</option>
            <option value="Field C">Field C</option>
            <option value="Field D">Field D</option>
          </select>
          <button
            type="submit"
            disabled={isSaving || !newTaskText.trim()}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>Add Task</span>
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 text-xs ${
                task.completed 
                  ? 'bg-slate-900/40 border-slate-800 text-slate-500 line-through' 
                  : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className="font-semibold">{task.text}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {task.field}
                </span>
                {task.priority === 'HIGH' && (
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    High Priority
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

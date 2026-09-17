import React, { useState } from 'react';
import { 
  Sun, 
  CloudRain, 
  Users, 
  Sparkles, 
  Compass, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';

export const WeatherCrowdIntelligence = ({ 
  destinationName = "Madurai & Tamil Nadu Heritage Trail", 
  weatherData = null 
}) => {
  // 12-Month Sample Intelligence Dataset
  const months = [
    { name: "Jan", temp: 28, rainProb: 10, humidity: 60, crowd: "Moderate", crowdColor: "bg-amber-400", score: 94, recommended: true, event: "Pongal Harvest Festival" },
    { name: "Feb", temp: 30, rainProb: 8, humidity: 55, crowd: "Moderate", crowdColor: "bg-amber-400", score: 96, recommended: true, event: "Pleasant cultural season" },
    { name: "Mar", temp: 34, rainProb: 15, humidity: 50, crowd: "Low", crowdColor: "bg-emerald-400", score: 88, recommended: true, event: "Pre-summer quiet window" },
    { name: "Apr", temp: 37, rainProb: 25, humidity: 52, crowd: "Very High", crowdColor: "bg-red-500", score: 82, recommended: false, event: "Chithirai Grand Temple Festival" },
    { name: "May", temp: 39, rainProb: 30, humidity: 58, crowd: "Moderate", crowdColor: "bg-amber-400", score: 75, recommended: false, event: "Summer heat peaks" },
    { name: "Jun", temp: 36, rainProb: 25, humidity: 62, crowd: "Low", crowdColor: "bg-emerald-400", score: 78, recommended: false, event: "Low tourist inflow" },
    { name: "Jul", temp: 35, rainProb: 30, humidity: 65, crowd: "Low", crowdColor: "bg-emerald-400", score: 80, recommended: false, event: "Mild southwest breeze" },
    { name: "Aug", temp: 34, rainProb: 35, humidity: 68, crowd: "Low", crowdColor: "bg-emerald-400", score: 82, recommended: false, event: "Temple processions" },
    { name: "Sep", temp: 33, rainProb: 40, humidity: 70, crowd: "Moderate", crowdColor: "bg-amber-400", score: 85, recommended: true, event: "Navaratri celebrations begin" },
    { name: "Oct", temp: 31, rainProb: 65, humidity: 78, crowd: "Moderate", crowdColor: "bg-amber-400", score: 89, recommended: true, event: "Northeast Monsoon showers" },
    { name: "Nov", temp: 29, rainProb: 55, humidity: 80, crowd: "High", crowdColor: "bg-orange-500", score: 92, recommended: true, event: "Deepavali festive atmosphere" },
    { name: "Dec", temp: 28, rainProb: 20, humidity: 72, crowd: "High", crowdColor: "bg-orange-500", score: 95, recommended: true, event: "Peak winter holiday travel" }
  ];

  const currentMonthIdx = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIdx] || months[10]);

  return (
    <section className="py-20 bg-[#030c1b] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-ocean-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Travel Forecast</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              WHEN SHOULD I VISIT?
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-400 max-w-md">
            12-month climate intelligence and real-time crowd prediction to help you choose the ideal travel window.
          </p>
        </div>

        {/* 12-Month Selector Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 mb-8">
          {months.map((m) => {
            const isSelected = selectedMonth.name === m.name;
            return (
              <button
                key={m.name}
                onClick={() => setSelectedMonth(m)}
                className={`p-3 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between ${
                  isSelected
                    ? 'bg-ocean-600/40 border-ocean-400 shadow-glow-blue scale-105'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-bold text-white mb-1">{m.name}</span>
                <span className="text-[11px] font-semibold text-amber-300 mb-1">{m.temp}°C</span>
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${m.crowdColor}`} />
                  <span className="text-[9px] text-slate-400">{m.score}/100</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Card for Selected Month */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Climate Matrix */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-ocean-300 uppercase tracking-wider">Climate Profile</span>
              <span className="text-xs font-semibold text-white px-2.5 py-1 rounded-full bg-white/10">
                Month: {selectedMonth.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Avg Temp</span>
                  <span className="text-base font-bold text-white">{selectedMonth.temp}°C</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <CloudRain className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Rain Probability</span>
                  <span className="text-base font-bold text-white">{selectedMonth.rainProb}%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Humidity</span>
                  <span className="text-base font-bold text-white">{selectedMonth.humidity}%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Wind className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Breeze Factor</span>
                  <span className="text-base font-bold text-white">Gentle</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedMonth.recommended 
                ? "Optimal weather window with clear daylight visibility, comfortable evening strolls, and mild humidity."
                : "Higher temperatures or seasonal rains expected. Carry light hydration gear and plan tours early in the morning."}
            </p>
          </div>

          {/* Card 2: Crowd Prediction & Seasonal Factors */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-heritage-400 uppercase tracking-wider">Crowd Intelligence</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs text-white">
                <span className={`w-2 h-2 rounded-full ${selectedMonth.crowdColor}`} />
                <span>{selectedMonth.crowd}</span>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Crowd Density Index</span>
                  <span className="font-bold text-white">{selectedMonth.crowd}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${selectedMonth.crowdColor} rounded-full transition-all duration-500`}
                    style={{ 
                      width: selectedMonth.crowd === 'Low' ? '25%' : selectedMonth.crowd === 'Moderate' ? '55%' : '85%' 
                    }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs">
                <span className="font-semibold text-heritage-300 block mb-1">Festival & Cultural Impact:</span>
                <p className="text-slate-300">{selectedMonth.event}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <AlertCircle className="w-4 h-4 text-ocean-400 shrink-0" />
              <span>Smart Tip: Book monument entry tickets in advance for mornings between 06:30 - 08:30.</span>
            </div>
          </div>

          {/* Card 3: Asia Journey Score Gauge */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-4">
                Asia Journey Score
              </span>

              <div className="flex items-center justify-center my-4">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * selectedMonth.score) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-display font-extrabold text-3xl text-white">{selectedMonth.score}</span>
                    <span className="text-[10px] text-slate-400 uppercase">out of 100</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-semibold mb-2">
                {selectedMonth.recommended ? (
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Highly Recommended Travel Window</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Alternative Season / Festive Rush</span>
                  </span>
                )}
              </div>
            </div>

            <div className="text-center pt-3 border-t border-white/10 text-xs text-slate-400">
              Composite algorithm weighing climate, crowds, visibility, and cultural events.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

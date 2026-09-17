import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { Sparkles, ArrowRightLeft, Check, Calendar, Wallet, Landmark, Car, Utensils } from 'lucide-react';
import { api } from '../services/api';

export const DestinationComparison = () => {
  const [destinations, setDestinations] = useState([]);
  const [destAId, setDestAId] = useState("madurai");
  const [destBId, setDestBId] = useState("kyoto-temples");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getDestinations();
        setDestinations(data || []);
      } catch (err) {
        console.error("Error loading destinations for comparison:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const destA = destinations.find(d => d.id === destAId) || destinations[0];
  const destB = destinations.find(d => d.id === destBId) || destinations[1] || destinations[0];

  // Radar chart metrics comparison data
  const radarData = [
    { subject: 'Heritage', A: destA?.journeyScore?.heritage || 95, B: destB?.journeyScore?.heritage || 92 },
    { subject: 'Culture', A: destA?.journeyScore?.culture || 98, B: destB?.journeyScore?.culture || 96 },
    { subject: 'Weather', A: destA?.journeyScore?.weather || 88, B: destB?.journeyScore?.weather || 90 },
    { subject: 'Transit', A: destA?.journeyScore?.accessibility || 90, B: destB?.journeyScore?.accessibility || 95 },
    { subject: 'Affordability', A: destA?.journeyScore?.budget || 95, B: destB?.journeyScore?.budget || 75 },
  ];

  return (
    <section className="py-24 bg-[#030c1b] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ocean-950 border border-ocean-400/30 text-ocean-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-glow-blue">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Smart Decision Matrix</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            COMPARE DESTINATIONS
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Pitting iconic Asian cultural hubs head-to-head across heritage, climate, budgets, and cuisine.
          </p>
        </div>

        {/* Destination Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl glass-panel border border-ocean-400/30">
            <label className="text-[10px] font-bold text-ocean-300 uppercase block mb-1.5">
              Select Destination A
            </label>
            <select
              value={destAId}
              onChange={(e) => setDestAId(e.target.value)}
              className="w-full bg-[#07162c] text-white text-xs font-semibold p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-ocean-400"
            >
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.country})</option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-amber-400/30">
            <label className="text-[10px] font-bold text-amber-300 uppercase block mb-1.5">
              Select Destination B
            </label>
            <select
              value={destBId}
              onChange={(e) => setDestBId(e.target.value)}
              className="w-full bg-[#07162c] text-white text-xs font-semibold p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-400"
            >
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.country})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards & Radar Chart */}
        {destA && destB && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Destination A Card */}
            <div className="glass-panel p-6 rounded-3xl border border-ocean-400/30 shadow-glow-blue flex flex-col justify-between">
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={destA.heroMedia?.url || destA.gallery?.[0]}
                    alt={destA.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-ocean-950/80 text-ocean-300 border border-ocean-400/30">
                    {destA.country}
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2">{destA.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-3 mb-6">{destA.description}</p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-ocean-400" /> Best Time</span>
                    <span className="font-semibold text-white">{destA.bestTime?.split('&')[0]}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-emerald-400" /> Daily Budget</span>
                    <span className="font-semibold text-emerald-300">{destA.estimatedBudget?.budget?.split('/')[0]}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5"><Landmark className="w-3.5 h-3.5 text-amber-400" /> Era</span>
                    <span className="font-semibold text-white truncate max-w-[150px]">{destA.heritageInfo?.era?.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Journey Score:</span>
                <span className="text-lg font-bold text-ocean-300">{destA.journeyScore?.total || 94}/100</span>
              </div>
            </div>

            {/* Middle: Interactive Radar Chart */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Comparative Radar Index
              </span>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" />
                    <Radar name={destA.name} dataKey="A" stroke="#0284c7" fill="#0284c7" fillOpacity={0.4} />
                    <Radar name={destB.name} dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-slate-400 text-center mt-3">
                Hover over vertices to inspect quantitative score differentials.
              </p>
            </div>

            {/* Destination B Card */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-400/30 shadow-glow-gold flex flex-col justify-between">
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={destB.heroMedia?.url || destB.gallery?.[0]}
                    alt={destB.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-400/30">
                    {destB.country}
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2">{destB.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-3 mb-6">{destB.description}</p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-400" /> Best Time</span>
                    <span className="font-semibold text-white">{destB.bestTime?.split('&')[0]}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-emerald-400" /> Daily Budget</span>
                    <span className="font-semibold text-emerald-300">{destB.estimatedBudget?.budget?.split('/')[0]}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5"><Landmark className="w-3.5 h-3.5 text-amber-400" /> Era</span>
                    <span className="font-semibold text-white truncate max-w-[150px]">{destB.heritageInfo?.era?.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Journey Score:</span>
                <span className="text-lg font-bold text-amber-300">{destB.journeyScore?.total || 94}/100</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

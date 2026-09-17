import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Sparkles, Calendar, Clock, ArrowRight, Eye, ShieldCheck, Filter } from 'lucide-react';
import { api } from '../services/api';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const HeritagePage = () => {
  const [heritageList, setHeritageList] = useState([]);
  const [selectedEra, setSelectedEra] = useState('All');
  const [loading, setLoading] = useState(true);

  const eras = [
    { id: 'All', name: 'All Eras' },
    { id: 'Ancient', name: 'Ancient Era (pre-500 CE)' },
    { id: 'Classical', name: 'Classical Era (500–1200 CE)' },
    { id: 'Medieval', name: 'Medieval Era (1200–1600 CE)' },
    { id: 'Colonial', name: 'Colonial Era (1600–1940 CE)' },
    { id: 'Modern', name: 'Modern Living Heritage' }
  ];

  useEffect(() => {
    const fetchHeritage = async () => {
      setLoading(true);
      try {
        const data = await api.getHeritage();
        setHeritageList(data || []);
      } catch (err) {
        console.error("Failed to load heritage data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeritage();
  }, []);

  const filteredHeritage = heritageList.filter(item => {
    if (selectedEra === 'All') return true;
    return item.period?.toLowerCase().includes(selectedEra.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#030c1b] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Heritage Archives" }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-heritage-950/60 border border-heritage-500/30 text-heritage-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-glow-gold">
            <Landmark className="w-3.5 h-3.5" />
            <span>Living Civilizational Memory</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            ASIA HERITAGE ARCHIVES
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            A comprehensive heritage management ecosystem cataloging ancient monuments, temples, rock citadels, and UNESCO treasures across Asia.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              to="/eras"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-heritage-600 to-amber-500 hover:from-heritage-500 text-slate-950 font-bold text-xs shadow-glow-gold flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Clock className="w-4 h-4" />
              <span>Explore Chronological Eras Timeline (Ancient → Modern)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Interactive Era Timeline Filter */}
        <div className="mb-12">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3 text-center">
            Explore by Historical Era
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {eras.map((era) => (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  selectedEra === era.id
                    ? 'bg-heritage-500 text-white shadow-glow-gold scale-105'
                    : 'glass-panel text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {era.name}
              </button>
            ))}
          </div>
        </div>

        {/* Heritage Monument Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 rounded-3xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredHeritage.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl overflow-hidden glass-panel border border-heritage-500/20 hover:border-heritage-400/50 hover:shadow-glow-gold transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.media}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-[#07162c]/30 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                      {item.period}
                    </span>
                    {item.unesco && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-heritage-500 text-white shadow-sm">
                        UNESCO World Heritage
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 text-xs font-semibold text-white">
                    📍 {item.location}
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-amber-200 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {item.significance}
                    </p>

                    {/* Historical Timeline Milestone highlights */}
                    {item.historyTimeline?.length > 0 && (
                      <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                        <span className="text-[10px] font-bold text-heritage-400 uppercase tracking-wider block mb-1">
                          Historical Milestones
                        </span>
                        {item.historyTimeline.slice(0, 2).map((milestone, idx) => (
                          <div key={idx} className="flex items-baseline gap-2 text-xs">
                            <span className="font-bold text-amber-300 shrink-0 font-mono">{milestone.year}:</span>
                            <span className="text-slate-300 text-[11px]">{milestone.event}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <Link
                      to={`/destination/${item.destinationId}`}
                      className="flex-1 py-2.5 rounded-xl bg-ocean-600/40 hover:bg-ocean-600 border border-ocean-400/30 text-white text-xs font-bold transition-all text-center"
                    >
                      Destination Details
                    </Link>

                    {item.virtualTourAvailable && (
                      <Link
                        to="/virtual-tours"
                        className="p-2.5 rounded-xl bg-heritage-900/60 hover:bg-heritage-800 text-heritage-300 border border-heritage-500/40"
                        title="360° Virtual Tour Available"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

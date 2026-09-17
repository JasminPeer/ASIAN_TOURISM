import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Landmark, 
  Clock, 
  MapPin, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  Compass
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const HistoricalErasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [eras, setEras] = useState([]);
  const [selectedEra, setSelectedEra] = useState(searchParams.get('era') || 'classical');
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEras();
  }, []);

  useEffect(() => {
    if (selectedEra) {
      fetchMonumentsForEra(selectedEra);
      setSearchParams({ era: selectedEra });
    }
  }, [selectedEra]);

  const fetchEras = async () => {
    try {
      const res = await fetch('/api/heritage/eras');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setEras(data);
        if (!selectedEra) setSelectedEra(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load historical eras:", err);
    }
  };

  const fetchMonumentsForEra = async (eraId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/heritage?era=${encodeURIComponent(eraId)}`);
      const data = await res.json();
      setMonuments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load monuments for era:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentEra = eras.find(e => e.id === selectedEra) || eras[1] || {
    id: "classical",
    name: "Classical Era",
    subtitle: "500–1200 CE",
    timeline: "500 CE – 1200 CE",
    description: "The golden age of stone temple architecture, philosophy, and classical arts across Chola, Pallava, Khmer, Tang, and Sailendra empires.",
    historicalFacts: [
      "Brihadeeswarar Temple in Thanjavur was crowned with an 80-tonne monolithic granite cupola in 1010 CE.",
      "Angkor Wat was assembled from 5 million tonnes of sandstone transported along Cambodian waterways.",
      "Borobudur in Java was sculpted from 2 million volcanic stone blocks."
    ]
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#030c1b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: "Heritage Sanctuaries", path: "/heritage" },
          { label: "Chronological Historical Eras" }
        ]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-heritage-500/20 text-heritage-300 border border-heritage-400/30 mb-3">
            <Clock className="w-3.5 h-3.5" />
            Millennia of Civilizations
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Chronological Eras of Asia
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Journey through five distinct epochs that sculpted Asia’s temples, imperial fortresses, rock-cut caverns, and monumental wonders.
          </p>
        </div>

        {/* Interactive Chronological Era Timeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {eras.map((era, index) => {
            const isSelected = selectedEra === era.id;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                className={`relative text-left p-4 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-gradient-to-b from-heritage-900/60 to-black/80 border-heritage-400/80 shadow-glow-gold scale-102' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase block mb-1 ${
                    isSelected ? 'text-heritage-400' : 'text-slate-500'
                  }`}>
                    Epoch {index + 1}
                  </span>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white mb-0.5">
                    {era.name}
                  </h3>
                  <span className="text-xs text-slate-400 block font-mono">
                    {era.timeline || era.subtitle}
                  </span>
                </div>

                <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {era.count || 0} Monuments
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-heritage-400 animate-ping" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Era Spotlight Card */}
        <div className="rounded-3xl p-8 sm:p-10 glass-panel border border-heritage-500/30 bg-gradient-to-br from-heritage-950/40 via-[#07162c]/80 to-ocean-950/50 shadow-glass mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-xs font-bold text-heritage-400 uppercase tracking-widest block mb-1">
                Active Epoch Inspection
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                {currentEra.name} ({currentEra.timeline || currentEra.subtitle})
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
                Civilizations: <strong className="text-white">{currentEra.associatedCountries?.join(', ') || 'Pan-Asian'}</strong>
              </span>
            </div>
          </div>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 max-w-4xl">
            {currentEra.description}
          </p>

          {/* Key Facts of Era */}
          {currentEra.historicalFacts?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {currentEra.historicalFacts.map((fact, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300">
                  <span className="text-heritage-400 font-bold block mb-1">Architectural Milestone #{idx + 1}</span>
                  {fact}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Era Monuments Grid Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              Preserved Monuments & Living Sanctuaries
            </h3>
            <p className="text-xs text-slate-400">
              Verified sites carrying the authentic structural hallmarks of the {currentEra.name}.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ocean-500/20 text-ocean-300 border border-ocean-400/30">
            {monuments.length} Verified Sites
          </span>
        </div>

        {/* Monuments Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-96 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : monuments.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 p-8">
            <Landmark className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h4 className="font-bold text-lg text-white">Cataloging Active</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our historians are indexing additional monuments belonging to this epoch.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monuments.map(site => (
              <div
                key={site.id}
                className="group rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-heritage-400/50 transition-all duration-500 flex flex-col hover:shadow-glow-gold hover:-translate-y-1.5"
              >
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={site.media?.url || site.image}
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b] via-[#030c1b]/30 to-transparent" />

                  {/* UNESCO Badge */}
                  {site.unesco && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-heritage-300 border border-heritage-400/50 flex items-center gap-1 shadow-glow-gold">
                      <ShieldCheck className="w-3 h-3 text-heritage-400" />
                      UNESCO World Heritage
                    </span>
                  )}

                  {/* Virtual Tour Pill */}
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-ocean-950/90 text-ocean-300 border border-ocean-400/40 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-ocean-300" />
                    360° Virtual Tour
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[11px]">
                      {site.period}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-xs text-ocean-400 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{site.location}, {site.country}</span>
                  </div>

                  <h4 className="font-display font-bold text-xl text-white group-hover:text-heritage-300 transition-colors mb-2">
                    {site.name}
                  </h4>

                  <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {site.significance || site.description}
                  </p>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 mb-6 space-y-1">
                    <div>
                      <strong className="text-white">Architecture:</strong> {site.architecture}
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <Link
                      to={`/virtual-tour/${site.destinationId || 'tour-meenakshi'}`}
                      className="py-2.5 rounded-xl bg-ocean-950/80 hover:bg-ocean-900 border border-ocean-400/30 text-ocean-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>360° Tour</span>
                    </Link>

                    <Link
                      to={`/destination/${site.destinationId || 'madurai'}`}
                      className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Destination</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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

export default HistoricalErasPage;

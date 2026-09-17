import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Eye, 
  ArrowUpRight, 
  ShieldAlert, 
  CheckCircle,
  Footprints,
  Navigation
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const SecretAsiaPage = () => {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    fetchHiddenGems();
  }, []);

  const fetchHiddenGems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/destinations?isHiddenGem=true');
      const data = await res.json();
      setGems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load secret gems:", err);
    } finally {
      setLoading(false);
    }
  };

  const countries = ['All', ...new Set(gems.map(g => g.country))];

  const filteredGems = selectedFilter === 'All' 
    ? gems 
    : gems.filter(g => g.country === selectedFilter);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#030c1b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Secret Asia (Hidden Gems)" }]} />

        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden mb-12 p-8 sm:p-12 border border-nature-500/30 bg-gradient-to-r from-emerald-950/80 via-[#071d24]/90 to-ocean-950/60 shadow-glass">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Off-the-Beaten-Path Chronicles
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              Secret Asia: Uncharted Wonders
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              Escape the mass-tourism throngs. Discover untouched tribal music valleys, mist-shrouded mountain villages, ghost towns at the edge of the sea, and ancient stepwells known only to pilgrims and local wanderers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <Footprints className="w-4 h-4" />
              <span>Low Footprint & Eco-Conscious Exploration</span>
            </div>
          </div>
        </div>

        {/* Country Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5" />
            Region Filter:
          </span>
          {countries.map(country => (
            <button
              key={country}
              onClick={() => setSelectedFilter(country)}
              className={`px-4 py-2 rounded-2xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedFilter === country 
                  ? 'bg-emerald-600 text-white shadow-glow-green' 
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        {/* Gems Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-96 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : filteredGems.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8">
            <Compass className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-white">No Secret Gems Match Selected Filter</h3>
            <button
              onClick={() => setSelectedFilter('All')}
              className="mt-4 px-5 py-2 rounded-full bg-ocean-600 text-xs font-semibold"
            >
              View All Hidden Gems
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGems.map(gem => (
              <div
                key={gem.id}
                className="group rounded-3xl overflow-hidden glass-panel border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-500 flex flex-col hover:shadow-glow-green hover:-translate-y-1.5"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={gem.heroMedia?.url}
                    alt={gem.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b] via-[#030c1b]/30 to-transparent" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-400/40 flex items-center gap-1 shadow-glow-green">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Hidden Gem
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-slate-200">
                      Crowd: <strong className="text-emerald-400">{gem.crowdPrediction?.level || 'Untouched & Serene'}</strong>
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-xs text-ocean-400 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{gem.regionName ? `${gem.regionName}, ${gem.country}` : gem.country}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {gem.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {gem.description}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-300 mb-6 space-y-1.5">
                    <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Insider Secret:
                    </div>
                    <p className="text-[11px] text-slate-300">
                      {gem.whyVisit || "Known to traditional wanderers for pristine silence, stargazing skies, and warm hospitality."}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <Link
                      to={`/destination/${gem.id}`}
                      className="w-full py-3 rounded-2xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-glow-green"
                    >
                      <span>Explore Secret Trail</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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

export default SecretAsiaPage;

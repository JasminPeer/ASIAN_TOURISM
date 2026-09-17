import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Landmark, Globe, Compass, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [heritage, setHeritage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const fetchSearchables = async () => {
      try {
        const [c, d, h] = await Promise.all([
          api.getCountries(),
          api.getDestinations(),
          api.getHeritage()
        ]);
        setCountries(c || []);
        setDestinations(d || []);
        setHeritage(h || []);
      } catch (err) {
        console.error("Search data load error:", err);
      }
    };
    fetchSearchables();
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingCountries = q ? countries.filter(c => 
    c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q) || c.code.toLowerCase() === q
  ).slice(0, 3) : [];

  const matchingDestinations = q ? destinations.filter(d =>
    d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.category?.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  const matchingHeritage = q ? heritage.filter(h =>
    h.name.toLowerCase().includes(q) || h.architecture?.toLowerCase().includes(q) || h.period?.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const handleSelect = (url) => {
    navigate(url);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-white/20 p-6 shadow-glass">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-6">
          <Search className="absolute left-4 w-5 h-5 text-ocean-400" />
          <input
            type="text"
            placeholder="Search nations, heritage sites, ancient temples, cities, or food (e.g. 'Japan', 'Taj Mahal', 'Temples')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-ocean-400 transition-colors"
          />
          <button
            onClick={onClose}
            className="absolute right-4 p-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Sections */}
        {q ? (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
            
            {/* Countries Matches */}
            {matchingCountries.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-ocean-300 uppercase tracking-wider block mb-2">
                  Countries
                </span>
                <div className="space-y-2">
                  {matchingCountries.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleSelect(`/country/${c.id}`)}
                      className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{c.flag}</span>
                        <div>
                          <span className="font-bold text-xs text-white group-hover:text-ocean-300 transition-colors">
                            {c.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block">Capital: {c.capital} • {c.continentRegion}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Destinations Matches */}
            {matchingDestinations.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mb-2">
                  Destinations
                </span>
                <div className="space-y-2">
                  {matchingDestinations.map(d => (
                    <button
                      key={d.id}
                      onClick={() => handleSelect(`/destination/${d.id}`)}
                      className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">
                            {d.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block">{d.regionName}, {d.country} • {d.category}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Heritage Sites Matches */}
            {matchingHeritage.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-heritage-300 uppercase tracking-wider block mb-2">
                  Heritage Monuments
                </span>
                <div className="space-y-2">
                  {matchingHeritage.map(h => (
                    <button
                      key={h.id}
                      onClick={() => handleSelect(`/heritage`)}
                      className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                          <Landmark className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
                            {h.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block">{h.location} • {h.period}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchingCountries.length === 0 && matchingDestinations.length === 0 && matchingHeritage.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-xs">
                No exact matches found for "{query}". Try searching "India", "Japan", "Temple", or "Angkor".
              </div>
            )}

          </div>
        ) : (
          <div className="pt-2 text-xs text-slate-400">
            <span className="block font-semibold text-slate-300 mb-2">Popular Searches:</span>
            <div className="flex flex-wrap gap-2">
              {['India', 'Japan', 'Madurai', 'Taj Mahal', 'Kyoto', 'Angkor Wat', 'Borobudur', 'Secret Asia'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] border border-white/10"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

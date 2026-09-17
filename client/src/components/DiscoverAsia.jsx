import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ArrowRight, 
  Calendar, 
  Wallet, 
  Landmark, 
  Award, 
  Sparkles, 
  Check,
  Search
} from 'lucide-react';
import { api } from '../services/api';
import { usePassport } from '../context/PassportContext';

export const DiscoverAsia = () => {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { stamps, stampCountry } = usePassport();

  const regions = ['All', 'South Asia', 'East Asia', 'Southeast Asia', 'West Asia', 'Central Asia'];

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      try {
        const data = await api.getCountries();
        setCountries(data || []);
      } catch (err) {
        console.error("Failed to load countries:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  const filteredCountries = countries.filter(c => {
    const matchesRegion = selectedRegion === 'All' || c.continentRegion?.toLowerCase() === selectedRegion.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.capital.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="discover-asia" className="py-24 bg-[#030c1b] relative overflow-hidden">
      
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-ocean-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ocean-950 border border-ocean-400/30 text-ocean-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-glow-blue">
            <Compass className="w-3.5 h-3.5" />
            <span>Continental Heritage</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            DISCOVER ASIA
          </h2>
          <p className="mt-3 text-base text-slate-300">
            From ancient civilizations to breathtaking natural wonders — explore all nations and cultures across the continent.
          </p>
        </div>

        {/* Filters & Search Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Region Tabs */}
          <div className="flex items-center flex-wrap gap-2 justify-center">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedRegion === region
                    ? 'bg-ocean-600 text-white shadow-glow-blue scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search nation or capital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-ocean-400 transition-colors"
            />
          </div>
        </div>

        {/* Countries Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 rounded-3xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredCountries.map((country) => {
              const isStamped = stamps.includes(country.code);
              return (
                <motion.div
                  key={country.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-ocean-400/50 hover:shadow-glow-blue transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Media Thumbnail */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={country.heroMedia?.poster || country.heroMedia?.url}
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.85]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-[#07162c]/30 to-transparent" />

                    {/* Flag and Region Pill */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-2xl drop-shadow">{country.flag}</span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-ocean-950/80 backdrop-blur-md text-ocean-300 border border-ocean-400/30">
                        {country.continentRegion}
                      </span>
                    </div>

                    {/* Stamp in Passport button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        stampCountry(country.code, country.name);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
                        isStamped 
                          ? 'bg-heritage-500 text-white border-heritage-300 shadow-glow-gold' 
                          : 'bg-black/50 text-slate-300 border-white/20 hover:text-white hover:bg-black/70'
                      }`}
                      title={isStamped ? "Stamped in your Travel Passport!" : "Stamp this country into your Passport (+50 XP)"}
                    >
                      {isStamped ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                    </button>

                    {/* Journey Score Badge */}
                    <div className="absolute bottom-3 right-4 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white">
                      <Sparkles className="w-3 h-3 text-heritage-400" />
                      <span className="font-bold">{country.journeyScore || 92}</span>
                      <span className="text-[10px] text-slate-300">/100</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="font-display font-bold text-2xl text-white group-hover:text-ocean-300 transition-colors">
                          {country.name}
                        </h3>
                        <span className="text-xs text-slate-400">Cap: {country.capital}</span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-5">
                        {country.description}
                      </p>

                      {/* Travel Specs Grid */}
                      <div className="grid grid-cols-2 gap-3 py-3 px-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-5 text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-ocean-400 shrink-0" />
                          <div className="truncate">
                            <span className="block text-[10px] text-slate-300 font-medium">Best Season</span>
                            <span className="truncate font-semibold text-white">{country.bestSeason?.split('&')[0]}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                          <Wallet className="w-3.5 h-3.5 text-nature-400 shrink-0" />
                          <div className="truncate">
                            <span className="block text-[10px] text-slate-300 font-medium">Est. Budget</span>
                            <span className="truncate font-semibold text-white">{country.estimatedDailyBudget?.split('/')[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Famous Attraction Highlight */}
                      <div className="flex items-center gap-2 text-xs text-heritage-300 mb-6 bg-heritage-950/30 px-3 py-2 rounded-xl border border-heritage-500/20">
                        <Landmark className="w-3.5 h-3.5 text-heritage-400 shrink-0" />
                        <span className="truncate">
                          {country.popularActivities?.[0] || "Ancient Heritage & Culture"}
                        </span>
                      </div>
                    </div>

                    {/* Explore More Button */}
                    <Link
                      to={`/country/${country.id}`}
                      className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl bg-ocean-600/30 hover:bg-ocean-600 border border-ocean-500/40 text-white text-xs font-bold transition-all duration-300 group-hover:shadow-glow-blue"
                    >
                      <span>Explore More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

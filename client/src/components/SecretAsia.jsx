import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, EyeOff, ArrowRight, ShieldCheck, Wallet, Calendar, Users } from 'lucide-react';
import { api } from '../services/api';

export const SecretAsia = () => {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const data = await api.getDestinations({ isHiddenGem: true });
        setGems(data || []);
      } catch (err) {
        console.error("Failed to load secret gems:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGems();
  }, []);

  return (
    <section className="py-24 bg-[#020817] relative overflow-hidden">
      
      {/* Ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-glow-green">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Off The Beaten Path</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              SECRET ASIA
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-400 max-w-md">
            Pristine valleys, secluded mountain hamlets, and untamed ancient landscapes beyond the standard tourist trails.
          </p>
        </div>

        {/* Secret Gems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gems.map((gem) => (
            <motion.div
              key={gem.id}
              whileHover={{ y: -6 }}
              className="group rounded-3xl overflow-hidden glass-panel border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-glow-green transition-all duration-500 relative flex flex-col justify-between"
            >
              {/* Media with Discovery % Pill */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={gem.heroMedia?.url || gem.gallery?.[0]}
                  alt={gem.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.85]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-[#07162c]/40 to-transparent" />

                {/* Discovery badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-400/40 shadow-glow-green flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Only ~{gem.hiddenGemDiscoveryPct || 12}% of travelers know this sanctuary</span>
                  </span>
                </div>

                <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-xs font-semibold text-white">
                  {gem.country}
                </div>
              </div>

              {/* Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    {gem.regionName} • {gem.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {gem.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-5">
                    {gem.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 py-3 px-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 block">Best Season</span>
                      <span className="font-semibold text-white truncate block">{gem.bestTime?.split('&')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">Est. Budget</span>
                      <span className="font-semibold text-emerald-400 truncate block">{gem.estimatedBudget?.budget?.split('/')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">Crowd Level</span>
                      <span className="font-semibold text-emerald-300 truncate block">Low Crowd 🟢</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/destination/${gem.id}`}
                  className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl bg-emerald-900/30 hover:bg-emerald-600 border border-emerald-500/40 text-white text-xs font-bold transition-all duration-300 group-hover:shadow-glow-green"
                >
                  <span>Uncover Secret Sanctuary</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { 
  Compass, 
  Award, 
  Stamp, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Route 
} from 'lucide-react';
import { usePassport } from '../context/PassportContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const PassportPage = () => {
  const { stamps, xp, badges, stampCountry } = usePassport();
  const { user } = useAuth();

  const level = Math.floor(xp / 300) + 1;
  const currentLevelBase = (level - 1) * 300;
  const progressPercent = Math.min(100, Math.round(((xp - currentLevelBase) / 300) * 100));

  const journeyTrail = [
    { country: "India", code: "IN", highlight: "Madurai Meenakshi & Agra Taj Mahal", flag: "🇮🇳" },
    { country: "Cambodia", code: "KH", highlight: "Angkor Wat Sacred Moat", flag: "🇰🇭" },
    { country: "Thailand", code: "TH", highlight: "Chiang Mai Lanna Temples", flag: "🇹🇭" },
    { country: "Indonesia", code: "ID", highlight: "Borobudur Volcanic Stupas", flag: "🇮🇩" },
    { country: "Japan", code: "JP", highlight: "Kyoto Vermilion Torii Corridor", flag: "🇯🇵" }
  ];

  return (
    <div className="min-h-screen bg-[#030c1b] pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Passport Booklet Shell */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0c203b] via-[#07162c] to-[#020914] border-2 border-heritage-400/40 p-8 sm:p-12 shadow-glow-gold relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center pb-8 border-b border-heritage-500/30">
            <div className="w-16 h-16 mx-auto rounded-full bg-heritage-950 border border-heritage-400/50 flex items-center justify-center text-heritage-400 mb-3 shadow-glow-gold">
              <Compass className="w-8 h-8 animate-spin-slow" />
            </div>
            <span className="text-xs font-bold text-heritage-400 tracking-[0.3em] uppercase block">
              Digital Travel Credential
            </span>
            <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-widest uppercase mt-1">
              MY TRAVEL PASSPORT
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Explorer: <strong className="text-slate-200">{user?.name || "Continental Voyager"}</strong> • Rank: Level {level} Nomadic Master
            </p>
          </div>

          {/* Level Progress */}
          <div className="my-8 p-5 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-heritage-500/20 text-heritage-300 font-bold border border-heritage-500/40">
                  Level {level} Explorer Rank
                </span>
                <span className="text-slate-200 font-semibold">{xp} Total XP Accumulated</span>
              </div>
              <span className="text-slate-400">{300 - (xp % 300)} XP to next rank</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-heritage-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stamped Asian Countries */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Stamp className="w-5 h-5 text-heritage-400" />
                <span>Collected Visa Stamps ({stamps.length})</span>
              </h2>
              <Link to="/map" className="text-xs text-ocean-300 hover:underline">
                Explore map to stamp more nations →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stamps.map((code) => (
                <div
                  key={code}
                  className="p-5 rounded-2xl border-2 border-heritage-400/50 bg-black/40 text-center transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                >
                  <span className="text-3xl mb-1 block">📍</span>
                  <span className="font-display font-black text-sm text-heritage-300 tracking-wider">
                    {code}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                    AUTHENTICATED
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* My Asia Journey Timeline: India -> Cambodia -> Thailand -> Indonesia -> Japan */}
          <div className="pt-8 border-t border-heritage-500/30">
            <h2 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Route className="w-5 h-5 text-emerald-400" />
              <span>My Asia Journey Trail</span>
            </h2>

            <div className="relative pl-6 border-l-2 border-ocean-500/40 space-y-6">
              {journeyTrail.map((stop, idx) => (
                <div key={stop.code} className="relative group">
                  {/* Pin Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-ocean-500 border-2 border-[#030c1b] group-hover:scale-125 transition-transform" />
                  
                  <div className="p-4 rounded-2xl glass-card border border-white/10 hover:border-ocean-400/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{stop.flag}</span>
                      <span className="font-bold text-sm text-white">{stop.country}</span>
                      <span className="text-[10px] text-slate-400">• Stop {idx + 1}</span>
                    </div>
                    <p className="text-xs text-slate-300">{stop.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

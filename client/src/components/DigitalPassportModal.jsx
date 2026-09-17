import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Award, 
  Globe, 
  Sparkles, 
  Compass, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  Stamp
} from 'lucide-react';
import { usePassport } from '../context/PassportContext';
import { useAuth } from '../context/AuthContext';

export const DigitalPassportModal = () => {
  const { stamps, xp, badges, isPassportOpen, setIsPassportOpen } = usePassport();
  const { user } = useAuth();

  if (!isPassportOpen) return null;

  // Level Progression Math
  const level = Math.floor(xp / 300) + 1;
  const currentLevelBase = (level - 1) * 300;
  const progressPercent = Math.min(100, Math.round(((xp - currentLevelBase) / 300) * 100));

  const allBadgesList = [
    { id: "badge-asia-explorer", name: "Asia Explorer", icon: "🌏", desc: "Stamp 3 Asian countries in your Passport", required: 3 },
    { id: "badge-heritage-hunter", name: "Heritage Hunter", icon: "🏛", desc: "Explore 3 ancient heritage sites", required: 3 },
    { id: "badge-virtual-voyager", name: "Virtual Voyager", icon: "🕶", desc: "Complete 2 immersive 360° virtual tours", required: 2 },
    { id: "badge-nature-seeker", name: "Nature Seeker", icon: "🌿", desc: "Discover off-the-beaten-path hidden gems", required: 2 },
    { id: "badge-master-planner", name: "Master Trip Architect", icon: "✨", desc: "Generate and save a personalized AI journey", required: 1 },
  ];

  const sampleStampsMeta = {
    IN: { name: "INDIA", flag: "🇮🇳", date: "2026", color: "border-amber-400 text-amber-300" },
    JP: { name: "JAPAN", flag: "🇯🇵", date: "2026", color: "border-rose-400 text-rose-300" },
    KH: { name: "CAMBODIA", flag: "🇰🇭", date: "2026", color: "border-sky-400 text-sky-300" },
    TH: { name: "THAILAND", flag: "🇹🇭", date: "2026", color: "border-emerald-400 text-emerald-300" },
    ID: { name: "INDONESIA", flag: "🇮🇩", date: "2026", color: "border-purple-400 text-purple-300" },
    VN: { name: "VIETNAM", flag: "🇻🇳", date: "2026", color: "border-teal-400 text-teal-300" }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#07162c] to-[#030c1b] border-2 border-heritage-500/40 p-6 sm:p-10 shadow-glow-gold">
        
        {/* Close button */}
        <button
          onClick={() => setIsPassportOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Passport Header Emblem */}
        <div className="text-center pb-6 border-b border-heritage-500/30">
          <div className="w-14 h-14 mx-auto rounded-full bg-heritage-950 border border-heritage-400/50 flex items-center justify-center text-heritage-400 mb-2 shadow-glow-gold">
            <Compass className="w-7 h-7 animate-spin-slow" />
          </div>
          <span className="text-[10px] font-bold text-heritage-400 tracking-[0.3em] uppercase block">
            Digital Travel Credential
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-white tracking-widest uppercase mt-1">
            Asia Explora Passport
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Bearer: <span className="text-slate-200 font-semibold">{user?.name || "Global Explorer"}</span> • Passport ID: #EXP-{user?.id?.slice(0, 8) || "8842-ASIA"}
          </p>
        </div>

        {/* XP & Level Status Bar */}
        <div className="my-6 p-4 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-heritage-500/20 text-heritage-300 font-bold border border-heritage-500/40">
                Level {level}: Explorer
              </span>
              <span className="text-slate-300 font-semibold">{xp} Total XP</span>
            </div>
            <span className="text-slate-400">{300 - (xp % 300)} XP to Level {level + 1}</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-heritage-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Visa Stamps Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Stamp className="w-4 h-4 text-heritage-400" />
              <span>Collected Asian Visa Stamps ({stamps.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Click countries on map or page to collect!</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stamps.map((code) => {
              const meta = sampleStampsMeta[code] || { name: code, flag: "🌏", date: "2026", color: "border-ocean-400 text-ocean-300" };
              return (
                <div
                  key={code}
                  className={`p-4 rounded-2xl border-2 ${meta.color} bg-black/40 flex flex-col items-center justify-center text-center transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative group`}
                >
                  <span className="text-2xl mb-1">{meta.flag}</span>
                  <span className="font-display font-extrabold text-xs tracking-wider uppercase">
                    {meta.name}
                  </span>
                  <span className="text-[9px] opacity-75 font-mono tracking-widest mt-0.5">
                    STAMPED • {meta.date}
                  </span>
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                </div>
              );
            })}

            {/* Empty stamp slots to encourage exploration */}
            {stamps.length < 6 && (
              <div className="p-4 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
                <span>+ Unexplored Stamp</span>
                <span className="text-[10px] text-slate-600 mt-1">Explore to Unlock</span>
              </div>
            )}
          </div>
        </div>

        {/* Badges & Achievements Grid */}
        <div>
          <h3 className="font-display font-bold text-base text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Achievement Badges</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allBadgesList.map((badge) => {
              const isUnlocked = badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                    isUnlocked
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-white'
                      : 'bg-white/[0.02] border-white/5 opacity-50'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-2 rounded-xl bg-black/40 border border-white/10">
                    {badge.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white truncate">{badge.name}</span>
                      {isUnlocked && <span className="text-[10px] text-emerald-400 font-semibold">Unlocked ✓</span>}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

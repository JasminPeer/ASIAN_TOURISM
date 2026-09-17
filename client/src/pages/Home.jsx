import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { HeroVideoCarousel } from '../components/HeroVideoCarousel';
import { DiscoverAsia } from '../components/DiscoverAsia';
import { AsiaMapViewer } from '../components/AsiaMapViewer';
import { WondersShowcase } from '../components/WondersShowcase';
import { TravelByInterest } from '../components/TravelByInterest';
import { InteractiveTripPlanner } from '../components/InteractiveTripPlanner';
import { VirtualTourViewer } from '../components/VirtualTourViewer';
import { WeatherCrowdIntelligence } from '../components/WeatherCrowdIntelligence';
import { SecretAsia } from '../components/SecretAsia';
import { DestinationComparison } from '../components/DestinationComparison';
import { Compass, Sparkles, Award, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { usePassport } from '../context/PassportContext';

export const Home = ({ onOpenLuna, onOpenAuth }) => {
  const { setIsPassportOpen, xp, stamps } = usePassport();

  return (
    <div className="w-full">
      {/* 1. CINEMATIC VIDEO HERO */}
      <HeroSection />

      {/* 2. VIDEO CATEGORY CAROUSEL */}
      <HeroVideoCarousel />

      {/* 3. DISCOVER ASIA (Country Cards with filters) */}
      <DiscoverAsia />

      {/* 4. ASIA INTERACTIVE CONTINENT MAP */}
      <section className="py-20 bg-[#030c1b] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ocean-950 border border-ocean-400/30 text-ocean-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-glow-blue">
                <Compass className="w-3.5 h-3.5" />
                <span>Geographic Intelligence</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
                EXPLORE ASIA ON THE MAP
              </h2>
            </div>
            <Link
              to="/map"
              className="mt-3 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-ocean-300 hover:text-white transition-colors"
            >
              <span>Open Fullscreen Map Experience</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <AsiaMapViewer isFullPage={false} />
        </div>
      </section>

      {/* 5. WONDERS YOU SHOULDN'T MISS */}
      <WondersShowcase />

      {/* 6. TRAVEL BY INTEREST */}
      <TravelByInterest />

      {/* 7. PLAN YOUR PERFECT ASIAN JOURNEY (Multi-Step AI Planner) */}
      <InteractiveTripPlanner initialCountry="India" />

      {/* 8. VIRTUAL ASIA 360° IMMERSIVE EXPERIENCE */}
      <VirtualTourViewer />

      {/* 9. WEATHER & BEST TIME PREDICTION + CROWD FORECAST */}
      <WeatherCrowdIntelligence />

      {/* 10. SECRET ASIA — HIDDEN GEMS */}
      <SecretAsia />

      {/* 11. SMART DESTINATION COMPARISON */}
      <DestinationComparison />

      {/* 12. DIGITAL TRAVEL PASSPORT & GAMIFICATION TEASER */}
      <section className="py-20 bg-[#020712] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl glass-panel border border-heritage-500/30 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-glow-gold">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-heritage-400 uppercase tracking-widest block mb-2">
                Gamified Travel Passport
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white mb-3">
                Stamp Your Journey Across 48 Asian Nations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Collect visa stamps, unlock badges like <span className="text-amber-300 font-semibold">Asia Explorer</span> and <span className="text-emerald-300 font-semibold">Heritage Hunter</span>, level up your traveler rank, and build your digital travel credentials.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsPassportOpen(true)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-heritage-600 to-amber-500 hover:from-heritage-500 text-white text-xs font-bold shadow-glow-gold transition-all flex items-center gap-2 hover:scale-105"
                >
                  <Award className="w-4 h-4" />
                  <span>Open My Travel Passport ({xp} XP)</span>
                </button>
                <Link
                  to="/passport"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors"
                >
                  View Passport Credentials
                </Link>
              </div>
            </div>

            {/* Visual Passport Mockup */}
            <div className="w-64 sm:w-72 h-80 rounded-2xl bg-gradient-to-br from-[#0c2340] to-[#04101e] border-2 border-heritage-400/50 p-6 flex flex-col justify-between shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 shrink-0">
              <div className="text-center">
                <Compass className="w-8 h-8 text-heritage-400 mx-auto mb-2 animate-spin-slow" />
                <span className="text-[9px] text-heritage-300 tracking-widest uppercase block font-semibold">
                  OFFICIAL DIGITAL PASSPORT
                </span>
                <span className="text-sm font-serif font-bold text-white tracking-widest uppercase">
                  ASIA EXPLORA
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 block">Stamped Countries</span>
                <span className="text-xl font-bold text-amber-300">{stamps.length} / 48</span>
              </div>
              <div className="text-center text-[9px] text-slate-500 font-mono">
                PASSPORT NO: #EXP-2026-ASIA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FINAL CINEMATIC CTA */}
      <section className="py-24 bg-gradient-to-b from-[#020712] via-[#04132b] to-[#030c1b] relative text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ocean-950 border border-ocean-400/30 text-ocean-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-glow-blue">
            <Sparkles className="w-3.5 h-3.5 text-heritage-400" />
            <span>The Horizon Calls</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-6xl text-white tracking-tight leading-tight mb-6">
            YOUR NEXT ADVENTURE IS WAITING.
          </h2>
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            From the thousand-year stone gopurams of Madurai to the snowy gassho villages of Shirakawa-go and Angkor's jungle towers — start crafting your journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/plan"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-ocean-500 via-sky-500 to-emerald-500 hover:from-ocean-400 hover:to-emerald-400 text-white font-bold text-sm uppercase tracking-wider shadow-glow-blue transition-all duration-300 hover:scale-105"
            >
              Plan My Journey ✨
            </Link>
            <button
              onClick={onOpenLuna}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-heritage-400" />
              <span>Ask Luna Travel AI</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

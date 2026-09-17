import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ChevronDown, ShieldCheck, MapPin, Eye } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Cinematic Video with Fallback Poster */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80"
          className="w-full h-full object-cover scale-105 filter brightness-[0.65] contrast-[1.1]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-river-surrounded-by-forest-42867-large.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>

        {/* Multi-layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b] via-[#030c1b]/40 to-[#030c1b]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-ocean-400/30 text-ocean-200 text-xs font-semibold mb-6 shadow-glow-blue"
        >
          <Sparkles className="w-4 h-4 text-heritage-400 animate-spin-slow" />
          <span className="tracking-wide uppercase text-[11px]">Intelligent Travel & Heritage Portal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.08] drop-shadow-2xl"
        >
          ONE CONTINENT. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-ocean-300 via-sky-200 to-emerald-300">
            A THOUSAND STORIES.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-xl text-slate-200/90 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow"
        >
          Discover Asia’s hidden gems, ancient heritage, breathtaking landscapes, and unforgettable journeys — all in one intelligent, AI-powered travel ecosystem.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#discover-asia"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-ocean-500 via-ocean-600 to-nature-600 hover:from-ocean-400 hover:to-nature-500 text-white font-bold text-sm tracking-wider uppercase shadow-glow-blue transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            <span>Explore Asia</span>
          </a>

          <Link
            to="/plan"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-white/20 hover:border-heritage-400/60 hover:bg-white/10 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group hover:shadow-glow-gold"
          >
            <Sparkles className="w-4 h-4 text-heritage-400 group-hover:scale-110 transition-transform" />
            <span>Plan My Journey</span>
          </Link>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          <div className="glass-card p-3 rounded-2xl border border-white/10 text-center">
            <span className="block font-bold text-lg text-white">48+</span>
            <span className="text-[11px] text-slate-300">Asian Nations</span>
          </div>
          <div className="glass-card p-3 rounded-2xl border border-white/10 text-center">
            <span className="block font-bold text-lg text-heritage-400">100+</span>
            <span className="text-[11px] text-slate-300">UNESCO Monuments</span>
          </div>
          <div className="glass-card p-3 rounded-2xl border border-white/10 text-center">
            <span className="block font-bold text-lg text-ocean-300">360°</span>
            <span className="text-[11px] text-slate-300">Virtual Heritage</span>
          </div>
          <div className="glass-card p-3 rounded-2xl border border-white/10 text-center">
            <span className="block font-bold text-lg text-emerald-400">Gemini AI</span>
            <span className="text-[11px] text-slate-300">Smart Itineraries</span>
          </div>
        </motion.div>

      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-slate-400 text-xs">
        <span className="text-[11px] tracking-widest uppercase font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-ocean-400" />
        </motion.div>
      </div>

    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Globe, Award, Shield, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-[#020712] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-ocean-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nature-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ocean-500 to-nature-500 p-0.5 shadow-glow-blue">
                <div className="w-full h-full bg-[#07162c] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-ocean-300" />
                </div>
              </div>
              <span className="font-display font-black text-2xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-ocean-200 to-emerald-300">
                ASIA EXPLORA
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Smart Tourism Information & Heritage Management Portal. Preserving ancient civilizational monuments while engineering the future of intelligent Asian travel exploration.
            </p>
            <div className="flex items-center gap-3 text-xs text-heritage-300 bg-heritage-950/40 border border-heritage-500/20 px-3.5 py-2 rounded-xl w-fit">
              <Sparkles className="w-4 h-4 text-heritage-400" />
              <span>Explore Asia. Discover Heritage. Plan Your Journey.</span>
            </div>
          </div>

          {/* Column 1: Exploration */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-ocean-300">
              Explore Asia
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/map" className="hover:text-white transition-colors">Asia Interactive Map</Link></li>
              <li><Link to="/country/india" className="hover:text-white transition-colors">India (Tamil Nadu, Kerala, Agra)</Link></li>
              <li><Link to="/country/japan" className="hover:text-white transition-colors">Japan (Kyoto, Tokyo, Shirakawa)</Link></li>
              <li><Link to="/country/thailand" className="hover:text-white transition-colors">Thailand & Southeast Asia</Link></li>
              <li><Link to="/country/cambodia" className="hover:text-white transition-colors">Cambodia & Angkor Wat</Link></li>
              <li><Link to="/secret-asia" className="hover:text-emerald-400 transition-colors font-medium">Secret Asia (Hidden Gems)</Link></li>
            </ul>
          </div>

          {/* Column 2: Heritage & Tech */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-heritage-400">
              Heritage & AI
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/heritage" className="hover:text-white transition-colors">UNESCO Sites & Eras</Link></li>
              <li><Link to="/virtual-tours" className="hover:text-white transition-colors">360° Virtual Tours</Link></li>
              <li><Link to="/plan" className="hover:text-white transition-colors">AI Travel Planner</Link></li>
              <li><Link to="/passport" className="hover:text-white transition-colors">Digital Travel Passport</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Destination Comparison</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Tourism Data Admin</Link></li>
            </ul>
          </div>

          {/* Column 3: Civilizational Eras */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-emerald-400">
              Historical Eras
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/heritage?era=ancient" className="hover:text-white transition-colors">Ancient Era (pre-500 CE)</Link></li>
              <li><Link to="/heritage?era=classical" className="hover:text-white transition-colors">Classical Era (500–1200 CE)</Link></li>
              <li><Link to="/heritage?era=medieval" className="hover:text-white transition-colors">Medieval Era (1200–1600 CE)</Link></li>
              <li><Link to="/heritage?era=colonial" className="hover:text-white transition-colors">Colonial Era (1600–1940 CE)</Link></li>
              <li><Link to="/heritage?era=modern" className="hover:text-white transition-colors">Modern Living Heritage</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ASIA EXPLORA. All rights reserved. Powered by Google Gemini AI & Leaflet GeoData.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-ocean-400" />
              <span>Covering All Asian Countries</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-nature-400" />
              <span>Smart Tourism Architecture</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

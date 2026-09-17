import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Trees, 
  Sun, 
  Mountain, 
  Utensils, 
  Smile, 
  Flame, 
  ShoppingBag, 
  Camera, 
  ArrowRight 
} from 'lucide-react';

const interests = [
  { name: "Heritage", icon: Landmark, color: "text-amber-400 bg-amber-500/10 border-amber-500/30", count: "100+ Sites", query: "Heritage" },
  { name: "Nature", icon: Trees, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", count: "85+ Parks", query: "Nature" },
  { name: "Beaches", icon: Sun, color: "text-sky-400 bg-sky-500/10 border-sky-500/30", count: "60+ Atolls", query: "Beach" },
  { name: "Mountains", icon: Mountain, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30", count: "40+ Peaks", query: "Mountain" },
  { name: "Food", icon: Utensils, color: "text-rose-400 bg-rose-500/10 border-rose-500/30", count: "200+ Dishes", query: "Food" },
  { name: "Culture", icon: Smile, color: "text-purple-400 bg-purple-500/10 border-purple-500/30", count: "50+ Festivals", query: "Culture" },
  { name: "Adventure", icon: Flame, color: "text-orange-400 bg-orange-500/10 border-orange-500/30", count: "70+ Trails", query: "Adventure" },
  { name: "Shopping", icon: ShoppingBag, color: "text-pink-400 bg-pink-500/10 border-pink-500/30", count: "30+ Bazaars", query: "City" },
  { name: "Photography", icon: Camera, color: "text-teal-400 bg-teal-500/10 border-teal-500/30", count: "95+ Vistas", query: "Heritage" }
];

export const TravelByInterest = () => {
  return (
    <section className="py-20 bg-[#030c1b] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
            Tailored Experiences
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Travel By Interest
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Choose what inspires you most and uncover Asian destinations tailored to your passion.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3.5">
          {interests.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={`/destinations?category=${item.query}`}
                className="group p-4 rounded-2xl glass-card border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center text-center justify-between shadow-glass"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-3 transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-ocean-300 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {item.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

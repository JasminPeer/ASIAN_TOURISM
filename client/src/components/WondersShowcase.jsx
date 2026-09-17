import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const wondersData = [
  {
    id: "w-1",
    title: "Meenakshi Sundareswarar Temple",
    location: "Madurai, Tamil Nadu, India",
    category: "Ancient Wonders",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    desc: "14 towering polychrome gopurams reaching into the southern Indian sky, adorned with 33,000 sculpted deities and celestial dancers.",
    destinationLink: "/destination/madurai"
  },
  {
    id: "w-2",
    title: "The Taj Mahal at Dawn",
    location: "Agra, Uttar Pradesh, India",
    category: "Ancient Wonders",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    desc: "A symmetrical jewel of white Makrana marble shimmering with iridescent pietra dura gemstone inlay overlooking the Yamuna.",
    destinationLink: "/destination/taj-mahal-agra"
  },
  {
    id: "w-3",
    title: "Angkor Wat Sacred Moat",
    location: "Siem Reap, Cambodia",
    category: "Ancient Wonders",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    desc: "The celestial mountain home of Vishnu transformed into a Buddhist sanctuary spanning four hundred square kilometers of jungle.",
    destinationLink: "/destination/angkor-wat"
  },
  {
    id: "w-4",
    title: "Fushimi Inari Torii Shrine",
    location: "Kyoto, Kansai, Japan",
    category: "Cultural Experiences",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    desc: "Over ten thousand crimson gates arching through ancient cedar forests, consecrated by generations of pilgrims.",
    destinationLink: "/destination/kyoto-temples"
  },
  {
    id: "w-5",
    title: "Borobudur Volcanic Pyramid",
    location: "Central Java, Indonesia",
    category: "Natural & Ancient",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    desc: "Nine stacked terraces crowned with 72 perforated stupas framing dramatic sunrise views over Mount Merapi volcano.",
    destinationLink: "/destination/borobudur"
  },
  {
    id: "w-6",
    title: "Shirakawa-go Snow Hamlet",
    location: "Gifu Prefecture, Japan",
    category: "Hidden Gems",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    desc: "Deep mountain sanctuary with steep prayer-hand thatched timber farmhouses designed to endure three meters of winter snow.",
    destinationLink: "/destination/shirakawa-go"
  }
];

export const WondersShowcase = () => {
  const [scrollIndex, setScrollIndex] = useState(0);

  return (
    <section className="py-24 bg-[#051021] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-heritage-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unrivaled Splendor</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              Wonders You Shouldn't Miss
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-400 max-w-md">
            Hand-curated monuments and landscapes that redefine human architectural and natural wonder.
          </p>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-thin scrollbar-thumb-ocean-600/50 scrollbar-track-transparent snap-x">
          {wondersData.map((wonder) => (
            <motion.div
              key={wonder.id}
              whileHover={{ y: -6 }}
              className="min-w-[320px] sm:min-w-[400px] lg:min-w-[440px] h-[520px] rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-heritage-400/40 transition-all duration-500 relative flex flex-col justify-end p-8 group snap-start"
            >
              {/* Image Background */}
              <img
                src={wonder.image}
                alt={wonder.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.8]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020712] via-[#020712]/50 to-transparent" />

              {/* Category Pill */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                  {wonder.category}
                </span>
              </div>

              {/* Text info */}
              <div className="relative z-10">
                <span className="text-xs text-ocean-300 font-semibold mb-1 block">
                  {wonder.location}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {wonder.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-6">
                  {wonder.desc}
                </p>

                <Link
                  to={wonder.destinationLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold transition-all duration-300 group-hover:shadow-glow-gold"
                >
                  <span>Explore Wonder</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

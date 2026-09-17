import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Wallet, 
  Car, 
  Plane, 
  Train, 
  Bus,
  Utensils, 
  Landmark, 
  Eye, 
  Bookmark, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Thermometer, 
  CloudRain,
  Clock,
  Compass,
  Award,
  AlertTriangle,
  Hotel,
  Star,
  Check,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { usePassport } from '../context/PassportContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const DestinationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addXp, triggerCelebration } = usePassport();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToTrip, setAddedToTrip] = useState(false);
  const [activeWeatherMonth, setActiveWeatherMonth] = useState(0);

  useEffect(() => {
    const fetchDest = async () => {
      setLoading(true);
      try {
        const data = await api.getDestination(id);
        setDestination(data);
      } catch (err) {
        console.error("Failed to load destination:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDest();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-[#030c1b]">
        <div className="flex items-center gap-3 text-ocean-400">
          <Sparkles className="w-6 h-6 animate-spin-slow text-heritage-400" />
          <span className="text-sm font-semibold">Loading Destination Dossier & Live Climate...</span>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen pt-32 text-center bg-[#030c1b]">
        <h2 className="text-2xl font-bold text-white mb-2">Destination Not Found</h2>
        <Link to="/destinations" className="px-6 py-2.5 rounded-full bg-ocean-600 text-white text-xs font-bold">
          Back to Destinations
        </Link>
      </div>
    );
  }

  const handleAddToJourney = async () => {
    try {
      await api.saveTrip({
        title: `Journey to ${destination.name}`,
        destination: `${destination.name}, ${destination.country}`,
        duration: "4–7 days",
        itinerary: [
          { day: 1, title: `Arrival in ${destination.name}`, morning: "Check-in & Heritage orientation", afternoon: "Guided landmark tour", evening: "Local culinary dinner" }
        ],
        estimatedBudget: destination.estimatedBudget?.moderate || "$60 - $120 / day",
        season: destination.bestTime
      });
      setAddedToTrip(true);
      triggerCelebration(`Added to Journey!`, `${destination.name} saved to your travel plans`, "🎒");
      addXp(50, `Saved ${destination.name} to travel dashboard`);
    } catch (err) {
      console.error("Error saving trip:", err);
    }
  };

  const breadcrumbItems = [
    { label: "Destinations", path: "/destinations" },
    { label: destination.country, path: `/country/${destination.countryCode?.toLowerCase() || 'india'}` },
    { label: destination.name }
  ];

  return (
    <div className="min-h-screen bg-[#030c1b] pb-24 text-slate-100">
      
      {/* Hero Cinematic Media Banner */}
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden flex items-end">
        {destination.heroMedia?.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={destination.heroMedia?.url}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
          >
            <source src={destination.heroMedia.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={destination.heroMedia?.url || destination.gallery?.[0]}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b] via-[#030c1b]/40 to-[#030c1b]/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-ocean-950/90 text-ocean-300 border border-ocean-400/40">
                {destination.category} • {destination.regionName ? `${destination.regionName}, ` : ''}{destination.country}
              </span>
              {destination.journeyScore && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-400/30 flex items-center gap-1 shadow-glow-green">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Journey Score: {destination.journeyScore.total}/100</span>
                </span>
              )}
              {destination.heritageInfo?.unesco && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-heritage-950/80 text-heritage-300 border border-heritage-400/40 flex items-center gap-1 shadow-glow-gold">
                  <ShieldCheck className="w-3.5 h-3.5 text-heritage-400" />
                  <span>UNESCO Heritage</span>
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
              {destination.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
              {destination.tagline || destination.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {destination.virtualTourId && (
              <button
                onClick={() => navigate(`/virtual-tour/${destination.virtualTourId}`)}
                className="px-6 py-3 rounded-2xl bg-heritage-500 hover:bg-heritage-400 text-slate-950 text-xs font-bold shadow-glow-gold transition-all flex items-center gap-2 hover:scale-105"
              >
                <Eye className="w-4 h-4" />
                <span>Launch 360° Virtual Tour</span>
              </button>
            )}

            <button
              onClick={handleAddToJourney}
              disabled={addedToTrip}
              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                addedToTrip 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-ocean-600 hover:bg-ocean-500 text-white shadow-glow-blue'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{addedToTrip ? "Saved in Itinerary ✓" : "Add to My Journey"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Clickable Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Weather Alert Banner (if active) */}
        {destination.weatherAlerts?.hasAlert && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/80 via-rose-950/60 to-[#1e0e0a] border-2 border-amber-500/50 shadow-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 flex-shrink-0">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Active Weather Advisory • {destination.weatherAlerts.condition}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                  {destination.weatherAlerts.advisory}
                </p>
                {destination.weatherAlerts.indoorAlternatives?.length > 0 && (
                  <div className="mt-2 flex items-center gap-2 flex-wrap text-xs text-amber-300">
                    <span className="font-bold">Recommended Indoor Substitutes:</span>
                    {destination.weatherAlerts.indoorAlternatives.map((alt, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/40 border border-amber-400/30 text-white">
                        {alt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/plan"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold whitespace-nowrap shadow-glow-gold transition-all"
            >
              Replan Trip for Weather ⚡
            </Link>
          </div>
        )}

        {/* Overview & Live Climate Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Detailed Narrative */}
          <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <div>
              <span className="text-xs font-bold text-ocean-400 uppercase tracking-widest block mb-2">
                Destination Dossier
              </span>
              <h2 className="font-display font-bold text-2xl text-white mb-4">
                Why Travelers Journey to {destination.name}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {destination.whyVisit || destination.description}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <h4 className="font-bold text-sm text-white">Curated Cultural Context</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Estimated Daily Budgets */}
            {destination.estimatedBudget && (
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Estimated Daily Travel Expenses
                </span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block">Backpacker</span>
                    <span className="font-bold text-emerald-400 text-sm">{destination.estimatedBudget.budget}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block">Moderate</span>
                    <span className="font-bold text-ocean-300 text-sm">{destination.estimatedBudget.moderate}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block">Luxury Resort</span>
                    <span className="font-bold text-amber-300 text-sm">{destination.estimatedBudget.luxury}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Climate & Crowd Intelligence */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-ocean-300 uppercase tracking-wider block mb-4">
                Live Climate & Crowd Status
              </span>

              {destination.liveWeather && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl font-extrabold text-white">
                        {destination.liveWeather.temperature}°C
                      </span>
                      <span className="text-xs text-slate-400 block mt-1">
                        {destination.liveWeather.condition}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-amber-400">
                      <Thermometer className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-3 border-t border-white/10">
                    <div className="p-2.5 rounded-xl bg-white/5">
                      <span className="text-slate-400 block text-[10px]">Relative Humidity</span>
                      <span className="font-bold text-white text-sm">{destination.liveWeather.humidity}%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5">
                      <span className="text-slate-400 block text-[10px]">Surface Wind</span>
                      <span className="font-bold text-white text-sm">{destination.liveWeather.windSpeed}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Crowd Prediction Meter */}
              <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Crowd Density:</span>
                  <span className={`font-bold ${destination.crowdPrediction?.statusColor || 'text-emerald-400'}`}>
                    {destination.crowdPrediction?.level || 'Moderate'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 rounded-full"
                    style={{ width: `${destination.crowdPrediction?.score || 60}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {destination.crowdPrediction?.factors || "Normal seasonal flow"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
              Optimal Traveling Months: <strong className="text-heritage-300">{destination.bestTime || "October to March"}</strong>
            </div>
          </div>
        </div>

        {/* 12-Month Detailed Climate & Crowd Profile */}
        {destination.weatherByMonth?.length > 0 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-ocean-400 uppercase tracking-widest block mb-1">
                  Year-Round Travel Calendar
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  12-Month Climate & Crowd Analysis
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Click any month to inspect detailed conditions
              </span>
            </div>

            {/* 12 Month Pills Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
              {destination.weatherByMonth.map((m, idx) => {
                const isSelected = activeWeatherMonth === idx;
                return (
                  <button
                    key={m.month}
                    onClick={() => setActiveWeatherMonth(idx)}
                    className={`p-3 rounded-2xl text-center transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-b from-ocean-600 to-nature-700 border-ocean-400 text-white shadow-glow-blue scale-105'
                        : m.recommended
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                        : 'bg-black/30 border-white/5 text-slate-500'
                    }`}
                  >
                    <span className="font-bold text-xs block mb-1">{m.month}</span>
                    <span className="text-sm font-black block">{m.temp}°C</span>
                    <span className="text-[9px] block text-slate-400 mt-1">{m.rainProb}% Rain</span>
                    <span className="text-[9px] block mt-1 truncate">
                      {m.recommended ? "🟢 Prime" : "🟡 Rain"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Month Spotlight */}
            {destination.weatherByMonth[activeWeatherMonth] && (
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-heritage-400" />
                  <div>
                    <strong className="text-white text-sm">
                      {destination.weatherByMonth[activeWeatherMonth].month} Travel Profile:
                    </strong>
                    <span className="text-slate-300 ml-2">
                      Average Temp {destination.weatherByMonth[activeWeatherMonth].temp}°C • Humidity {destination.weatherByMonth[activeWeatherMonth].humidity}% • Rain Probability {destination.weatherByMonth[activeWeatherMonth].rainProb}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-slate-200">
                    Crowd: {destination.weatherByMonth[activeWeatherMonth].crowd}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-ocean-950/80 text-ocean-300 border border-ocean-400/30">
                    Weather Score: {destination.weatherByMonth[activeWeatherMonth].weatherScore}/100
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transportation Comparison Matrix */}
        {destination.transportComparison?.length > 0 && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <div className="mb-6">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Multi-Modal Transit Intelligence
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Transport Comparison & Route Times
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparative analysis of flight, train, bus, and taxi options to reach {destination.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destination.transportComparison.map((tc, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      {tc.mode.toLowerCase().includes('train') ? <Train className="w-4 h-4 text-amber-400" /> :
                       tc.mode.toLowerCase().includes('flight') ? <Plane className="w-4 h-4 text-ocean-400" /> :
                       tc.mode.toLowerCase().includes('bus') ? <Bus className="w-4 h-4 text-emerald-400" /> :
                       <Car className="w-4 h-4 text-purple-400" />}
                      {tc.mode}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-ocean-950/80 text-ocean-300 border border-ocean-400/30">
                      {tc.comfort} Comfort
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10 text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Estimated Fare</span>
                      <span className="font-bold text-emerald-400">{tc.costRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Transit Time</span>
                      <span className="font-bold text-white">{tc.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {destination.transportation?.tips && (
              <div className="mt-6 p-4 rounded-2xl bg-ocean-950/40 border border-ocean-400/20 text-xs text-slate-300 flex items-center gap-3">
                <Compass className="w-5 h-5 text-ocean-400 flex-shrink-0" />
                <span><strong>Local Transit Tip: </strong>{destination.transportation.tips}</span>
              </div>
            )}
          </div>
        )}

        {/* Local Guide: Nearby Hotels & Accommodations */}
        {destination.localGuide?.nearbyHotels?.length > 0 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-heritage-400 uppercase tracking-widest block mb-1">
                Curated Stay Recommendations
              </span>
              <h3 className="font-display font-bold text-2xl text-white flex items-center gap-2">
                <Hotel className="w-6 h-6 text-heritage-400" />
                <span>Recommended Hotels & Heritage Stays in {destination.name}</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destination.localGuide.nearbyHotels.map((hotel, idx) => (
                <div key={idx} className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between space-y-4 hover:border-heritage-400/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-heritage-950 text-heritage-300 border border-heritage-400/30">
                        {hotel.priceCategory}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{hotel.rating}</span>
                      </div>
                    </div>

                    <h4 className="font-display font-bold text-lg text-white mb-1">
                      {hotel.name}
                    </h4>
                    <span className="text-xs text-slate-400 block mb-3">
                      {hotel.distance}
                    </span>

                    <div className="space-y-1 mb-4">
                      {hotel.facilities?.map((fac, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Sample Rate</span>
                      <span className="font-bold text-sm text-emerald-400">{hotel.samplePrice}</span>
                    </div>
                    <button
                      onClick={() => alert(`Direct booking concierge for ${hotel.name} simulated.`)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                    >
                      View Rooms
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Guide: Authentic Restaurants & Must-Try Food */}
        {destination.localGuide?.nearbyRestaurants?.length > 0 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-1">
                Culinary Highlights
              </span>
              <h3 className="font-display font-bold text-2xl text-white flex items-center gap-2">
                <Utensils className="w-6 h-6 text-rose-400" />
                <span>Authentic Local Eateries & Legendary Dishes</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destination.localGuide.nearbyRestaurants.map((rest, idx) => (
                <div key={idx} className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-lg text-white">
                      {rest.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-400/30">
                      {rest.priceLevel}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block">
                    Cuisine: <strong className="text-slate-200">{rest.cuisine}</strong>
                  </span>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                      Must-Order Specialties:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {rest.popularDishes?.map((dish, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-200">
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historical Heritage Context & Era Timeline */}
        {destination.heritageInfo && (
          <div className="glass-panel p-8 rounded-3xl border border-heritage-500/30 bg-gradient-to-br from-heritage-950/30 to-black/60">
            <span className="text-xs font-bold text-heritage-400 uppercase tracking-widest block mb-1">
              Civilizational Preservation
            </span>
            <h2 className="font-display font-bold text-2xl text-white mb-3">
              Heritage Significance & Architectural Heritage
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {destination.heritageInfo.significance}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block text-[10px]">Historical Era</span>
                <span className="font-bold text-white text-sm">{destination.heritageInfo.era}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block text-[10px]">Architectural Style</span>
                <span className="font-bold text-amber-300 text-sm">{destination.heritageInfo.architecture}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block text-[10px]">UNESCO Status</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {destination.heritageInfo.unesco ? "Verified World Heritage" : "National Historic Monument"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Nearby Regional Attractions */}
        {destination.nearby?.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-6">
              Nearby Regional Attractions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {destination.nearby.map(near => (
                <Link
                  key={near.id}
                  to={`/destination/${near.id}`}
                  className="p-5 rounded-2xl glass-card border border-white/10 hover:border-ocean-400/40 transition-all block group"
                >
                  <h4 className="font-bold text-base text-white group-hover:text-ocean-300 mb-1">
                    {near.name}
                  </h4>
                  <span className="text-xs text-slate-400 block">{near.regionName} • {near.category}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DestinationDetailPage;

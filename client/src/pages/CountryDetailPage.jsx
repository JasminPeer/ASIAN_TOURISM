import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Wallet, 
  Landmark, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Check, 
  Eye, 
  Layers, 
  Utensils, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { usePassport } from '../context/PassportContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CountryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stamps, stampCountry } = usePassport();

  const [country, setCountry] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true);
      try {
        const data = await api.getCountry(id);
        setCountry(data);
        if (data?.regions?.length > 0) {
          setSelectedRegionId(data.regions[0].id);
        }
      } catch (err) {
        console.error("Failed to load country:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#030c1b]">
        <div className="flex items-center gap-3 text-ocean-400">
          <Sparkles className="w-6 h-6 animate-spin-slow text-heritage-400" />
          <span className="text-sm font-semibold">Loading Country Information & Heritage Archives...</span>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center bg-[#030c1b]">
        <h2 className="text-2xl font-bold text-white mb-2">Country Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">The requested country could not be located in the database.</p>
        <Link to="/map" className="px-6 py-2.5 rounded-full bg-ocean-600 text-white text-xs font-bold">
          Return to Asia Map
        </Link>
      </div>
    );
  }

  const isStamped = stamps.includes(country.code);
  const activeRegion = country.regions?.find(r => r.id === selectedRegionId);
  const filteredDestinations = selectedRegionId 
    ? country.destinations?.filter(d => d.regionId === selectedRegionId) 
    : country.destinations;

  return (
    <div className="min-h-screen bg-[#030c1b] pb-24">
      
      {/* Country Cinematic Hero Section */}
      <div className="relative h-[65vh] min-h-[480px] w-full overflow-hidden flex items-end">
        {country.heroMedia?.type === 'video' && country.heroMedia?.url ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={country.heroMedia?.poster}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
          >
            <source src={country.heroMedia.url} type="video/mp4" />
          </video>
        ) : (
          <img
            src={country.heroMedia?.poster || country.heroMedia?.url || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80'}
            alt={country.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b] via-[#030c1b]/40 to-[#030c1b]/60" />

        {/* Hero Bottom Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{country.flag}</span>
              <span className="text-xs font-bold text-ocean-300 uppercase tracking-widest bg-ocean-950/80 px-3 py-1 rounded-full border border-ocean-400/30">
                {country.continentRegion}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
              Discover {country.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
              {country.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Stamp into Passport */}
            <button
              onClick={() => stampCountry(country.code, country.name)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                isStamped
                  ? 'bg-heritage-500 text-white shadow-glow-gold'
                  : 'glass-panel text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {isStamped ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
              <span>{isStamped ? "Stamped in Passport ✓" : "Stamp Passport (+50 XP)"}</span>
            </button>

            <Link
              to={`/plan`}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-ocean-500 to-nature-600 hover:from-ocean-400 text-white text-xs font-bold shadow-glow-blue transition-all"
            >
              Plan Trip to {country.name} ✨
            </Link>
          </div>
        </div>
      </div>

      {/* Practical Travel Specs Strip */}
      <div className="border-y border-white/10 bg-[#07162c]/70 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-medium uppercase">Capital City</span>
            <span className="font-bold text-white text-sm">{country.capital}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-medium uppercase">Best Travel Season</span>
            <span className="font-bold text-amber-300 text-sm">{country.bestSeason}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-medium uppercase">Currency</span>
            <span className="font-bold text-emerald-400 text-sm">{country.currency}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-medium uppercase">UNESCO Sites</span>
            <span className="font-bold text-ocean-300 text-sm">{country.heritageCount} World Heritage Sites</span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        
        <Breadcrumbs items={[
          { label: "Explore Asia", path: "/map" },
          { label: country.name }
        ]} />
        
        {/* State / Regional Exploration Hierarchy (Especially for India, Japan, etc.) */}
        {country.regions?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-ocean-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Hierarchical Regional Breakdown</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6">
              Explore {country.name} by State & Region
            </h2>

            {/* Region Selector Pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              <button
                onClick={() => setSelectedRegionId(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedRegionId === null
                    ? 'bg-ocean-600 text-white shadow-glow-blue'
                    : 'glass-card text-slate-300 hover:text-white'
                }`}
              >
                All Regions ({country.destinations?.length || 0})
              </button>

              {country.regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegionId(reg.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedRegionId === reg.id
                      ? 'bg-amber-500 text-white shadow-glow-gold'
                      : 'glass-card text-slate-300 hover:text-white'
                  }`}
                >
                  {reg.name}
                </button>
              ))}
            </div>

            {/* Active Region Highlights Card */}
            {activeRegion && (
              <div className="glass-panel p-6 rounded-3xl border border-white/10 mb-8 flex flex-col md:flex-row items-center gap-6">
                <img
                  src={activeRegion.media}
                  alt={activeRegion.name}
                  className="w-full md:w-64 h-40 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    State / Province Highlight
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    {activeRegion.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {activeRegion.description}
                  </p>
                  <span className="text-xs text-slate-400">
                    Regional Center: <strong className="text-slate-200">{activeRegion.capital}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Top Destinations Grid */}
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span>Destinations in {selectedRegionId ? activeRegion?.name : country.name}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations?.map((dest) => (
              <div
                key={dest.id}
                className="group rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-ocean-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.heroMedia?.url || dest.gallery?.[0]}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30">
                    {dest.category}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-xl bg-black/70 backdrop-blur-md text-xs font-bold text-white">
                    Score: {dest.journeyScore?.total || 94}/100
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-1.5 group-hover:text-ocean-300 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                      {dest.description}
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-300 space-y-1 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Best Season:</span>
                        <span className="font-semibold text-amber-300">{dest.bestTime?.split('&')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Budget:</span>
                        <span className="font-semibold text-emerald-300">{dest.estimatedBudget?.budget}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/destination/${dest.id}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-ocean-600/30 hover:bg-ocean-600 border border-ocean-400/30 text-white text-xs font-bold transition-all"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heritage Sites Section */}
        {country.heritage?.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-heritage-400" />
              <span>Ancient Heritage & UNESCO Monuments</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {country.heritage.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl glass-panel border border-heritage-500/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold text-heritage-400 uppercase tracking-wider">
                        {item.period} • {item.exactEra}
                      </span>
                      {item.unesco && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-heritage-500/20 text-heritage-300 border border-heritage-500/30">
                          UNESCO
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {item.significance}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Arch: {item.architecture}</span>
                    <Link
                      to="/heritage"
                      className="inline-flex items-center gap-1 text-xs font-bold text-heritage-400 hover:text-heritage-300"
                    >
                      <span>Timeline Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

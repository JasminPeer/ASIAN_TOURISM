import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Sparkles, 
  Filter, 
  ArrowUpRight, 
  Search,
  Eye,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const DestinationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [selectedMonth, setSelectedMonth] = useState(searchParams.get('month') || 'November');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedCrowd, setSelectedCrowd] = useState(searchParams.get('crowd') || 'All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const categories = ["All", "Heritage", "Mountains", "Islands & Beaches", "Culture", "Wildlife & Nature"];

  useEffect(() => {
    fetchDestinations();
  }, [selectedCategory, selectedMonth, selectedCrowd]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const m = searchParams.get('month');
    if (m) setSelectedMonth(m);
  }, [searchParams]);

  useEffect(() => {
    fetchMonthlyRecommendations(selectedMonth);
  }, [selectedMonth]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      let url = '/api/destinations?';
      if (selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;
      if (selectedCrowd !== 'All') url += `crowd=${encodeURIComponent(selectedCrowd)}&`;
      if (activeTab === 'month') url += `month=${encodeURIComponent(selectedMonth)}&`;
      
      const res = await fetch(url);
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyRecommendations = async (m) => {
    try {
      const res = await fetch(`/api/destinations/recommendations?month=${encodeURIComponent(m)}`);
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Failed to load monthly recommendations:", err);
    }
  };

  // Filter destinations locally for instant search and budget tier
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = !searchQuery || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dest.regionName && dest.regionName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (dest.tagline && dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBudget = selectedBudget === 'All' || 
      (selectedBudget === 'Budget' && (dest.estimatedBudget?.budget || '').includes('$2')) ||
      (selectedBudget === 'Luxury' && (dest.estimatedBudget?.luxury || '').includes('$1') || (dest.estimatedBudget?.luxury || '').includes('$2'));

    return matchesSearch && matchesBudget;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#030c1b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Destinations Across Asia" }]} />

        {/* Header Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 p-8 sm:p-12 border border-white/10 bg-gradient-to-r from-ocean-950/80 via-[#0a2342]/90 to-nature-950/60 shadow-glass">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-ocean-500/20 text-ocean-300 border border-ocean-400/30 mb-4">
              <Compass className="w-3.5 h-3.5" />
              Pan-Asian Destination Catalog
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              Explore Asia’s Premier Destinations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              From the 2,500-year-old Dravidian temple towers of Madurai to the snowy thatched gables of Shirakawa-go and Angkor's sacred sandstone corridors. Complete with 12-month climate profiles, crowd intelligence, and transit comparisons.
            </p>

            {/* Global Search Filter */}
            <div className="relative max-w-lg">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by city, temple, region, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-ocean-400 focus:bg-white/15 transition-all shadow-inner"
              />
            </div>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ocean-400 via-emerald-400 to-transparent" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'all' 
                ? 'bg-gradient-to-r from-ocean-600 to-nature-600 text-white shadow-glow-blue' 
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass className="w-4 h-4" />
            All Destinations ({destinations.length})
          </button>

          <button
            onClick={() => setActiveTab('month')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'month' 
                ? 'bg-gradient-to-r from-ocean-600 to-nature-600 text-white shadow-glow-blue' 
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calendar className="w-4 h-4 text-heritage-400" />
            By Best Month
          </button>

          <button
            onClick={() => setActiveTab('crowd')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'crowd' 
                ? 'bg-gradient-to-r from-ocean-600 to-nature-600 text-white shadow-glow-blue' 
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            Low-Crowd Havens
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'budget' 
                ? 'bg-gradient-to-r from-ocean-600 to-nature-600 text-white shadow-glow-blue' 
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-400" />
            By Budget Tier
          </button>
        </div>

        {/* Tab Specific Control Bars */}
        {activeTab === 'month' && (
          <div className="mb-10 p-6 rounded-3xl glass-panel border border-ocean-500/20 bg-ocean-950/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-heritage-400" />
                  Select Month for Seasonal Recommendations
                </h3>
                <p className="text-xs text-slate-400">Discover prime weather windows and synchronized cultural festivals.</p>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                {months.map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selectedMonth === m 
                        ? 'bg-heritage-500 text-slate-950 font-bold shadow-glow-gold' 
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {m.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Month-Based Recommendations Spotlight (Category A & Category B) */}
            {recommendations && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                {/* Category A: Best Weather & Low Crowd */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Category A: Best Weather & Optimal Crowds ({selectedMonth})
                  </span>
                  <div className="space-y-2 mt-2">
                    {recommendations.categoryA?.map((item, idx) => (
                      <div key={idx} className="text-xs bg-black/30 p-2.5 rounded-xl border border-emerald-500/10">
                        <span className="font-bold text-white block">{item.destination} ({item.country})</span>
                        <p className="text-slate-300 mt-0.5">{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category B: Festivals & Cultural Experiences */}
                <div className="p-4 rounded-2xl bg-heritage-950/40 border border-heritage-500/30">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-heritage-300 uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-heritage-400" />
                    Category B: Major Festivals & Living Traditions ({selectedMonth})
                  </span>
                  <div className="space-y-2 mt-2">
                    {recommendations.categoryB?.map((item, idx) => (
                      <div key={idx} className="text-xs bg-black/30 p-2.5 rounded-xl border border-heritage-500/10">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-heritage-200">{item.name}</span>
                          <span className="text-[10px] text-heritage-400 px-2 py-0.5 rounded bg-heritage-950 border border-heritage-500/20">{item.timing}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{item.destination}, {item.country}</span>
                        <p className="text-slate-300 mt-1">{item.whyVisit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Secondary Category Filters */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === c 
                  ? 'bg-ocean-500 text-white shadow-glow-blue' 
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="h-96 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8">
            <Compass className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-spin-slow" />
            <h3 className="font-display font-bold text-xl text-white mb-2">No Destinations Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Try adjusting your category, month, or search query to explore more Asian wonders.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedCrowd('All'); }}
              className="px-6 py-2.5 rounded-full bg-ocean-600 hover:bg-ocean-500 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Destinations Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(dest => (
              <div 
                key={dest.id}
                className="group rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-ocean-400/40 transition-all duration-500 flex flex-col hover:shadow-glow-blue hover:-translate-y-1.5"
              >
                {/* Hero Media Container */}
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={dest.heroMedia?.url}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b] via-[#030c1b]/30 to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {dest.category}
                  </span>

                  {/* Virtual Tour Available Pill */}
                  {dest.virtualTourId && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-ocean-950/80 backdrop-blur-md text-ocean-300 border border-ocean-400/40 flex items-center gap-1 shadow-glow-blue">
                      <Eye className="w-3 h-3 text-ocean-300" />
                      360° Tour
                    </span>
                  )}

                  {/* Weather Alert Pill if any */}
                  {dest.weatherAlerts?.hasAlert && (
                    <span className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950/90 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      Alert Active
                    </span>
                  )}

                  {/* Journey Score */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-heritage-400">
                    <Sparkles className="w-3 h-3 text-heritage-400" />
                    <span>{dest.journeyScore?.total || 94}</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-ocean-400 mb-1 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.regionName ? `${dest.regionName}, ${dest.country}` : dest.country}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-ocean-300 transition-colors mb-2">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-[11px] mb-4 text-slate-400">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Best Time</span>
                      <span className="font-medium text-slate-200">{dest.bestTime || 'Oct to Mar'}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Crowd Level</span>
                      <span className={`font-medium ${dest.crowdPrediction?.statusColor || 'text-emerald-400'}`}>
                        {dest.crowdPrediction?.level || 'Moderate'}
                      </span>
                    </div>
                  </div>

                  {/* Must-Try Cuisine Preview */}
                  {dest.localGuide?.mustTryFood?.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">
                        Iconic Local Tastes:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {dest.localGuide.mustTryFood.slice(0, 2).map((dish, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Link Button */}
                  <div className="mt-auto pt-2">
                    <Link
                      to={`/destination/${dest.id}`}
                      className="w-full py-3 rounded-2xl bg-white/10 hover:bg-ocean-600 text-white text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Explore Destination</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;

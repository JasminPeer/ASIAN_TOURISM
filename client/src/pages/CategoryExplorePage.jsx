import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Filter, 
  ArrowUpRight, 
  Eye, 
  Calendar,
  DollarSign,
  Users,
  Search,
  CheckCircle2,
  TreePine,
  Landmark,
  Utensils,
  Mountain,
  Sun
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CategoryExplorePage = () => {
  const { category = 'nature' } = useParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCrowd, setSelectedCrowd] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Map category param to title and category filter
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  const categoryMeta = {
    nature: {
      title: "Nature & Pristine Landscapes",
      tagline: "Volcanic calderas, mist-veiled mountain ranges, tropical atolls & ancient cedar forests",
      icon: TreePine,
      color: "from-emerald-600 to-teal-700"
    },
    heritage: {
      title: "Ancient Sanctuaries & Heritage Wonders",
      tagline: "Centuries-old Dravidian temple gopurams, Khmer lotus spires, and Silk Road citadels",
      icon: Landmark,
      color: "from-heritage-600 to-amber-700"
    },
    culture: {
      title: "Living Traditions & Cultural Epicenters",
      tagline: "Sacred river rituals, tea ceremonies, classical Carnatic music, and Lanna festivals",
      icon: Sparkles,
      color: "from-purple-600 to-indigo-700"
    },
    adventure: {
      title: "High-Altitude Peaks & Adventure Trails",
      tagline: "Himalayan pass treks, quartz-sandstone avatar pinnacles, and marine reef diving",
      icon: Mountain,
      color: "from-orange-600 to-rose-700"
    },
    food: {
      title: "Legendary Asian Food Capitals",
      tagline: "Michelin street stalls, royal Chettinad banquets, steaming ramen alleys & night markets",
      icon: Utensils,
      color: "from-rose-600 to-amber-700"
    }
  };

  const currentMeta = categoryMeta[category.toLowerCase()] || categoryMeta.nature;
  const CategoryIcon = currentMeta.icon;

  useEffect(() => {
    fetchDestinations();
  }, [category]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/destinations');
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter matching category
  const filteredDestinations = destinations.filter(dest => {
    const catMatch = dest.category?.toLowerCase() === category.toLowerCase() ||
      (category.toLowerCase() === 'nature' && ['nature', 'mountains', 'beach', 'islands'].includes(dest.category?.toLowerCase())) ||
      (category.toLowerCase() === 'heritage' && ['heritage', 'spiritual'].includes(dest.category?.toLowerCase())) ||
      (category.toLowerCase() === 'adventure' && ['mountains', 'nature', 'adventure'].includes(dest.category?.toLowerCase())) ||
      (category.toLowerCase() === 'food' && ['food', 'culture', 'city'].includes(dest.category?.toLowerCase()));

    const countryMatch = selectedCountry === 'All' || dest.country?.toLowerCase() === selectedCountry.toLowerCase();
    const crowdMatch = selectedCrowd === 'All' || (dest.crowdPrediction?.level || '').toLowerCase().includes(selectedCrowd.toLowerCase());
    const budgetMatch = selectedBudget === 'All' || 
      (selectedBudget === 'Budget' && (dest.estimatedBudget?.budget || '').includes('$2')) ||
      (selectedBudget === 'Luxury' && (dest.estimatedBudget?.luxury || '').includes('$2') || (dest.estimatedBudget?.luxury || '').includes('$3'));

    const searchMatch = !searchQuery || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dest.description && dest.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return catMatch && countryMatch && crowdMatch && budgetMatch && searchMatch;
  });

  const availableCountries = ['All', ...new Set(destinations.map(d => d.country))];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#030c1b] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[
          { label: "Explore Asia", path: "/map" },
          { label: currentMeta.title }
        ]} />

        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden mb-10 p-8 sm:p-12 border border-white/10 bg-gradient-to-r from-ocean-950/90 via-[#06192f] to-[#041122] shadow-glass">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 mb-3">
              <CategoryIcon className="w-3.5 h-3.5 text-ocean-300" />
              Categorical Exploration • {formattedCategory}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
              {currentMeta.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {currentMeta.tagline}
            </p>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${formattedCategory.toLowerCase()} destinations...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-ocean-400 focus:bg-white/15 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Filters:
            </span>

            {/* Country Selector */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-ocean-400"
            >
              {availableCountries.map(c => (
                <option key={c} value={c} className="bg-slate-900">{c === 'All' ? 'All Countries' : c}</option>
              ))}
            </select>

            {/* Crowd Level */}
            <select
              value={selectedCrowd}
              onChange={(e) => setSelectedCrowd(e.target.value)}
              className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-ocean-400"
            >
              <option value="All" className="bg-slate-900">All Crowd Levels</option>
              <option value="Low" className="bg-slate-900">Low Crowd 🟢</option>
              <option value="Moderate" className="bg-slate-900">Moderate Crowd 🟡</option>
              <option value="High" className="bg-slate-900">High / Peak 🔴</option>
            </select>

            {/* Budget */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-ocean-400"
            >
              <option value="All" className="bg-slate-900">All Budgets</option>
              <option value="Budget" className="bg-slate-900">Backpacker Friendly</option>
              <option value="Luxury" className="bg-slate-900">Luxury Resorts</option>
            </select>
          </div>

          <span className="text-xs text-slate-400">
            Showing <strong className="text-white">{filteredDestinations.length}</strong> matching places
          </span>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="h-96 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8">
            <Compass className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-white">No destinations found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
              Try adjusting your country or crowd filters to discover more places.
            </p>
            <button
              onClick={() => { setSelectedCountry('All'); setSelectedCrowd('All'); setSelectedBudget('All'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-full bg-ocean-600 text-xs font-semibold text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(dest => (
              <div
                key={dest.id}
                className="group rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-ocean-400/50 transition-all duration-500 flex flex-col hover:shadow-glow-blue hover:-translate-y-1.5"
              >
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={dest.heroMedia?.url}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b] via-[#030c1b]/30 to-transparent" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {dest.category}
                  </span>

                  {dest.virtualTourId && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-ocean-950/90 text-ocean-300 border border-ocean-400/40 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      360° Tour
                    </span>
                  )}

                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-heritage-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-heritage-400" />
                    <span>{dest.journeyScore?.total || 95}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 text-xs text-ocean-400 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.regionName ? `${dest.regionName}, ${dest.country}` : dest.country}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-ocean-300 transition-colors mb-2">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {dest.description}
                  </p>

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

                  <div className="mt-auto">
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

export default CategoryExplorePage;

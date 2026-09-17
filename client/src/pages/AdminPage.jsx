import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Users, 
  MapPin, 
  Landmark, 
  Globe, 
  Bookmark, 
  Eye, 
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AdminPage = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State for Adding Destination
  const [newDestName, setNewDestName] = useState('');
  const [newDestCountry, setNewDestCountry] = useState('India');
  const [newDestCode, setNewDestCode] = useState('IN');
  const [newDestCategory, setNewDestCategory] = useState('Heritage');
  const [newDestDesc, setNewDestDesc] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const [statsData, destsData] = await Promise.all([
          api.getAdminStats(),
          api.getDestinations()
        ]);
        setStats(statsData);
        setDestinations(destsData || []);
      } catch (err) {
        console.error("Admin data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleAddDestination = (e) => {
    e.preventDefault();
    if (!newDestName || !newDestCountry) return;

    const newDest = {
      id: newDestName.toLowerCase().replace(/\s+/g, '-'),
      name: newDestName,
      country: newDestCountry,
      countryCode: newDestCode,
      category: newDestCategory,
      description: newDestDesc || "Rich cultural and scenic heritage destination in Asia.",
      regionName: "Central Region",
      coordinates: [20.5937, 78.9629],
      bestTime: "October to March",
      estimatedBudget: { budget: "$35 - $60 / day" },
      journeyScore: { total: 93, weather: 90, heritage: 94, culture: 95 }
    };

    setDestinations([newDest, ...destinations]);
    setNewDestName('');
    setNewDestDesc('');
    setActionMessage(`Successfully added ${newDest.name}!`);
    setTimeout(() => setActionMessage(''), 4000);
  };

  const handleDeleteDestination = (id) => {
    setDestinations(destinations.filter(d => d.id !== id));
    setActionMessage("Destination record removed from catalog.");
    setTimeout(() => setActionMessage(''), 4000);
  };

  const COLORS = ['#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen bg-[#030c1b] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Administration Control Center</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Tourism & Heritage Management
            </h1>
          </div>

          <div className="px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
            Status: <strong>System Operational</strong> • Hybrid MongoDB/JSON Store
          </div>
        </div>

        {actionMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Analytics Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <div className="p-4 rounded-2xl glass-card border border-white/5">
            <Globe className="w-5 h-5 text-ocean-400 mb-2" />
            <span className="text-[10px] text-slate-400 block font-medium uppercase">Countries</span>
            <span className="text-2xl font-bold text-white">{stats?.totals?.countries || 19}</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/5">
            <MapPin className="w-5 h-5 text-emerald-400 mb-2" />
            <span className="text-[10px] text-slate-400 block font-medium uppercase">Destinations</span>
            <span className="text-2xl font-bold text-white">{destinations.length}</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/5">
            <Landmark className="w-5 h-5 text-heritage-400 mb-2" />
            <span className="text-[10px] text-slate-400 block font-medium uppercase">Heritage Sites</span>
            <span className="text-2xl font-bold text-white">{stats?.totals?.heritageSites || 5}</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/5">
            <Eye className="w-5 h-5 text-sky-400 mb-2" />
            <span className="text-[10px] text-slate-400 block font-medium uppercase">360° Tours</span>
            <span className="text-2xl font-bold text-white">{stats?.totals?.virtualTours || 4}</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/5">
            <Users className="w-5 h-5 text-purple-400 mb-2" />
            <span className="text-[10px] text-slate-400 block font-medium uppercase">Users</span>
            <span className="text-2xl font-bold text-white">{stats?.totals?.registeredUsers || 1}</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/5">
            <Bookmark className="w-5 h-5 text-rose-400 mb-2" />
            <span className="text-[10px] text-slate-400 block font-medium uppercase">Saved Trips</span>
            <span className="text-2xl font-bold text-white">{stats?.totals?.savedTrips || 0}</span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Regional Distribution Bar Chart */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h3 className="font-display font-bold text-base text-white mb-4">
              Continental Regions Coverage
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.charts?.regionChartData || [
                  { name: 'South Asia', count: 6 },
                  { name: 'East Asia', count: 4 },
                  { name: 'Southeast Asia', count: 6 },
                  { name: 'West Asia', count: 3 }
                ]}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#07162c', borderColor: '#38bdf8', borderRadius: '12px' }} />
                  <Bar dataKey="count" fill="#0284c7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Destination Categories Breakdown */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h3 className="font-display font-bold text-base text-white mb-4">
              Historical Era Distribution
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.charts?.eraChartData || [
                  { era: 'Classical', count: 4 },
                  { era: 'Medieval', count: 2 },
                  { era: 'Living/Modern', count: 1 }
                ]}>
                  <XAxis dataKey="era" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#07162c', borderColor: '#f59e0b', borderRadius: '12px' }} />
                  <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Management & CRUD Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add New Destination Form */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add New Asian Destination</span>
            </h3>

            <form onSubmit={handleAddDestination} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Destination Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hampi UNESCO Ruins"
                  value={newDestName}
                  onChange={(e) => setNewDestName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-ocean-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Country</label>
                <select
                  value={newDestCountry}
                  onChange={(e) => {
                    setNewDestCountry(e.target.value);
                    setNewDestCode(e.target.value === 'India' ? 'IN' : e.target.value === 'Japan' ? 'JP' : 'TH');
                  }}
                  className="w-full bg-[#07162c] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-ocean-400"
                >
                  <option value="India">India</option>
                  <option value="Japan">Japan</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Vietnam">Vietnam</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={newDestCategory}
                  onChange={(e) => setNewDestCategory(e.target.value)}
                  className="w-full bg-[#07162c] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-ocean-400"
                >
                  <option value="Heritage">Heritage</option>
                  <option value="Nature">Nature</option>
                  <option value="Culture">Culture</option>
                  <option value="Beach">Beach</option>
                  <option value="Mountain">Mountain</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief heritage significance or attraction overview..."
                  value={newDestDesc}
                  onChange={(e) => setNewDestDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-ocean-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-ocean-500 to-nature-600 hover:from-ocean-400 text-white font-bold transition-all shadow-glow-blue"
              >
                Create Destination Record
              </button>
            </form>
          </div>

          {/* Destination Catalog List */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10">
            <h3 className="font-display font-bold text-lg text-white mb-4">
              Catalog Management ({destinations.length} Destinations)
            </h3>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {destinations.map(d => (
                <div
                  key={d.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-ocean-300 uppercase tracking-wider block">
                      {d.country} • {d.category}
                    </span>
                    <h4 className="font-bold text-sm text-white truncate">{d.name}</h4>
                    <span className="text-xs text-slate-400 truncate block">{d.regionName || d.country}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteDestination(d.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                      title="Delete Destination"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

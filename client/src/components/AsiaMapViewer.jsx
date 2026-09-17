import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Maximize2, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Landmark, 
  Calendar, 
  Eye, 
  ExternalLink,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import L from 'leaflet';
import { api } from '../services/api';

// Custom Map Marker Icons
const createCustomIcon = (color = '#38bdf8', isSelected = false) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <div style="
          width: ${isSelected ? '28px' : '22px'}; 
          height: ${isSelected ? '28px' : '22px'}; 
          background: ${color}; 
          border-radius: 50%; 
          border: 2px solid #ffffff; 
          box-shadow: 0 0 16px ${color}; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          transition: all 0.3s ease;
        ">
          <div style="width: 6px; height: 6px; background: #030c1b; border-radius: 50%;"></div>
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

export const AsiaMapViewer = ({ isFullPage = false }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [regions, setRegions] = useState([]);
  
  // Drill-down State Hierarchy: Asia -> Country -> Region -> Destination
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [hoveredEntity, setHoveredEntity] = useState(null);

  // Load countries, regions, and destinations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cData, dData, rData] = await Promise.all([
          api.getCountries(),
          api.getDestinations(),
          api.getRegions()
        ]);
        setCountries(cData || []);
        setDestinations(dData || []);
        setRegions(rData || []);
      } catch (err) {
        console.error("Map data fetch error:", err);
      }
    };
    fetchData();
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Asia continent
    const map = L.map(mapContainerRef.current, {
      center: [28, 85],
      zoom: 4,
      minZoom: 3,
      maxZoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    // Dark high-contrast basemap with deep ocean blue and land distinction
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    markersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers based on current zoom / drilldown level
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    if (!selectedCountry) {
      // Continental Level: Render Country Capital & Major Hub Markers
      countries.forEach(country => {
        if (!country.coordinates) return;
        const marker = L.marker(country.coordinates, {
          icon: createCustomIcon('#38bdf8')
        });

        marker.on('click', () => {
          handleSelectCountry(country);
        });

        marker.on('mouseover', () => {
          setHoveredEntity({ type: 'country', data: country });
        });

        markersGroup.addLayer(marker);
      });
    } else {
      // Country Level: Render Country Regions & Destinations
      const countryDests = destinations.filter(d => d.countryCode === selectedCountry.code);
      const countryRegions = regions.filter(r => r.countryCode === selectedCountry.code);

      // Add Regional centers
      countryRegions.forEach(reg => {
        if (!reg.coordinates) return;
        const regMarker = L.marker(reg.coordinates, {
          icon: createCustomIcon('#f59e0b', selectedRegion?.id === reg.id)
        });

        regMarker.on('click', () => {
          handleSelectRegion(reg);
        });

        regMarker.on('mouseover', () => {
          setHoveredEntity({ type: 'region', data: reg });
        });

        markersGroup.addLayer(regMarker);
      });

      // Add Specific Destinations
      countryDests.forEach(dest => {
        if (!dest.coordinates) return;
        const isSelected = selectedDestination?.id === dest.id;
        const destMarker = L.marker(dest.coordinates, {
          icon: createCustomIcon(isSelected ? '#10b981' : '#34d399', isSelected)
        });

        destMarker.on('click', () => {
          setSelectedDestination(dest);
        });

        destMarker.on('mouseover', () => {
          setHoveredEntity({ type: 'destination', data: dest });
        });

        markersGroup.addLayer(destMarker);
      });
    }
  }, [countries, destinations, regions, selectedCountry, selectedRegion, selectedDestination]);

  // Handlers for Drilldown Navigation
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedRegion(null);
    setSelectedDestination(null);
    if (mapInstanceRef.current && country.coordinates) {
      mapInstanceRef.current.flyTo(country.coordinates, country.zoom || 6, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  };

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setSelectedDestination(null);
    if (mapInstanceRef.current && region.coordinates) {
      mapInstanceRef.current.flyTo(region.coordinates, 8, {
        duration: 1.2
      });
    }
  };

  const resetToAsia = () => {
    setSelectedCountry(null);
    setSelectedRegion(null);
    setSelectedDestination(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([28, 85], 4, {
        duration: 1.4
      });
    }
  };

  return (
    <div className={`relative w-full ${isFullPage ? 'h-[calc(100vh-80px)]' : 'h-[650px] rounded-3xl overflow-hidden border border-white/10 shadow-glass'}`}>
      
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Map Navigation Hierarchy Breadcrumb */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 p-2 px-3.5 rounded-2xl glass-panel text-xs text-white shadow-glass">
        <button 
          onClick={resetToAsia}
          className="flex items-center gap-1 font-bold text-ocean-300 hover:text-white transition-colors"
        >
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>Asia Continent</span>
        </button>

        {selectedCountry && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <button
              onClick={() => handleSelectCountry(selectedCountry)}
              className={`font-semibold hover:text-ocean-300 transition-colors ${!selectedRegion ? 'text-heritage-400' : 'text-slate-300'}`}
            >
              {selectedCountry.flag} {selectedCountry.name}
            </button>
          </>
        )}

        {selectedRegion && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-emerald-400">{selectedRegion.name}</span>
          </>
        )}

        {selectedDestination && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-sky-400">{selectedDestination.name}</span>
          </>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => mapInstanceRef.current?.zoomIn()}
          className="p-2.5 rounded-xl glass-panel hover:bg-white/20 text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => mapInstanceRef.current?.zoomOut()}
          className="p-2.5 rounded-xl glass-panel hover:bg-white/20 text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetToAsia}
          className="p-2.5 rounded-xl glass-panel hover:bg-white/20 text-white transition-colors"
          title="Reset View to All Asia"
        >
          <RotateCcw className="w-4 h-4 text-ocean-300" />
        </button>
      </div>

      {/* Interactive Entity Details Card (Popout Drawer) */}
      {(selectedDestination || selectedCountry) && (
        <div className="absolute bottom-6 left-6 z-20 w-80 sm:w-96 rounded-3xl glass-panel p-5 border border-white/20 shadow-glass animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {selectedDestination ? (
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {selectedDestination.category} • {selectedDestination.regionName}
                  </span>
                  <h4 className="font-display font-bold text-xl text-white">
                    {selectedDestination.name}
                  </h4>
                </div>
                <div className="px-2 py-1 rounded-xl bg-ocean-950 border border-ocean-400/40 text-xs font-bold text-ocean-300">
                  {selectedDestination.journeyScore?.total || 94}/100
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                {selectedDestination.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-200 mb-4 bg-white/5 p-2.5 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[9px]">Best Season</span>
                  <span className="font-semibold text-amber-300">{selectedDestination.bestTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Est. Daily Budget</span>
                  <span className="font-semibold text-emerald-300">{selectedDestination.estimatedBudget?.budget}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/destination/${selectedDestination.id}`)}
                  className="flex-1 py-2.5 rounded-xl bg-ocean-600 hover:bg-ocean-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-glow-blue"
                >
                  <span>Destination Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {selectedDestination.virtualTourId && (
                  <button
                    onClick={() => navigate(`/virtual-tour/${selectedDestination.virtualTourId}`)}
                    className="p-2.5 rounded-xl bg-heritage-900/60 hover:bg-heritage-800 border border-heritage-500/40 text-heritage-300 transition-colors"
                    title="Launch 360° Virtual Tour"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedCountry.flag}</span>
                  <div>
                    <h4 className="font-display font-bold text-xl text-white">
                      {selectedCountry.name}
                    </h4>
                    <span className="text-xs text-slate-400">Capital: {selectedCountry.capital}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">UNESCO Sites</span>
                  <span className="text-sm font-bold text-heritage-400">{selectedCountry.heritageCount}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                {selectedCountry.description}
              </p>

              {/* State/Region Exploration Pills for India, Japan, Thailand */}
              {regions.filter(r => r.countryCode === selectedCountry.code).length > 0 && (
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Explore States / Regions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {regions.filter(r => r.countryCode === selectedCountry.code).map(reg => (
                      <button
                        key={reg.id}
                        onClick={() => handleSelectRegion(reg)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          selectedRegion?.id === reg.id 
                            ? 'bg-amber-500 text-white shadow-glow-gold' 
                            : 'bg-white/10 hover:bg-white/20 text-slate-300'
                        }`}
                      >
                        {reg.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate(`/country/${selectedCountry.id}`)}
                className="w-full py-2.5 rounded-xl bg-ocean-600 hover:bg-ocean-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-glow-blue"
              >
                <span>Enter {selectedCountry.name} Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Bottom Map Legend */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-4 px-3.5 py-1.5 rounded-xl glass-panel text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-ocean-400 shadow-glow-blue" />
          <span>Country Capital</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-glow-gold" />
          <span>State / Region</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-glow-green" />
          <span>Heritage Destination</span>
        </div>
      </div>

    </div>
  );
};

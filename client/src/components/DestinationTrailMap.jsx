import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  MapPin, 
  Navigation, 
  Eye, 
  Layers, 
  Compass, 
  Footprints, 
  Clock, 
  Sparkles, 
  Maximize2, 
  CheckCircle,
  ExternalLink,
  ChevronRight,
  RotateCw
} from 'lucide-react';
import L from 'leaflet';
import { 
  GOOGLE_MAPS_API_KEY, 
  GOOGLE_STREETVIEW_API_KEY, 
  getStreetViewEmbedUrl, 
  getGoogleRouteEmbedUrl,
  setupFreeTileLayer
} from '../config/maps';
import { fetchOSRMRoute, fetchWeatherOpenMeteo } from '../services/freeApis';

// Helper to create numbered waypoint markers
const createNumberedMarker = (num, name, isSelected = false) => {
  return L.divIcon({
    className: 'custom-trail-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
        <div style="
          width: ${isSelected ? '34px' : '28px'};
          height: ${isSelected ? '34px' : '28px'};
          background: ${isSelected ? '#10b981' : '#0284c7'};
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 16px ${isSelected ? '#10b981' : '#38bdf8'};
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 800;
          font-size: ${isSelected ? '13px' : '11px'};
          transition: all 0.3s ease;
        ">
          ${num}
        </div>
        <div style="
          margin-top: 4px;
          background: rgba(3, 12, 27, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        ">
          ${name}
        </div>
      </div>
    `,
    iconSize: [80, 48],
    iconAnchor: [40, 16]
  });
};

export const DestinationTrailMap = ({ destination }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polylineRef = useRef(null);
  const markersGroupRef = useRef(null);

  const [activeTab, setActiveTab] = useState('trail'); // 'trail' | 'streetview' | 'google-route'
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState(0);

  // Derive or construct realistic waypoints for this destination
  const waypoints = (destination.trailWaypoints && destination.trailWaypoints.length > 0)
    ? destination.trailWaypoints
    : (destination.placesInside && destination.placesInside.length > 0)
    ? destination.placesInside.map((p, idx) => ({
        id: p.id || `wp-${idx}`,
        name: p.name,
        category: p.category || 'Scenic Stop',
        coordinates: p.coordinates || [
          destination.coordinates[0] + (idx * 0.008 * (idx % 2 === 0 ? 1 : -1)),
          destination.coordinates[1] + (idx * 0.009 * (idx % 3 === 0 ? -1 : 1))
        ],
        description: p.description || p.highlight || 'Iconic landmark along the exploration route.',
        timeToSpend: p.timeToSpend || '45 mins',
        photo: p.photo || destination.gallery?.[idx % destination.gallery?.length] || destination.heroMedia?.url,
        tips: p.tips || 'Early arrival recommended for serene photography.'
      }))
    : [
        {
          id: 'wp-1',
          name: `${destination.name} Gateway & Heritage Entrance`,
          category: 'Orientation Hub',
          coordinates: [destination.coordinates[0] - 0.006, destination.coordinates[1] - 0.005],
          description: `The grand entrance portal and welcome promenade into ${destination.name}.`,
          timeToSpend: '30 mins',
          photo: destination.heroMedia?.url,
          tips: 'Pick up physical trail maps and heritage guides here.'
        },
        {
          id: 'wp-2',
          name: `${destination.name} Core Sanctuary & Central Point`,
          category: 'Main Attraction',
          coordinates: destination.coordinates,
          description: destination.whyVisit || destination.description,
          timeToSpend: '1.5 hours',
          photo: destination.gallery?.[0] || destination.heroMedia?.url,
          tips: 'Prime vantage point offering breathtaking architectural views.'
        },
        {
          id: 'wp-3',
          name: `${destination.name} High Vista & Overlook`,
          category: 'Panoramic Vista',
          coordinates: [destination.coordinates[0] + 0.007, destination.coordinates[1] + 0.006],
          description: 'Elevated viewpoint with 360-degree vistas across surrounding valleys and mountains.',
          timeToSpend: '45 mins',
          photo: destination.gallery?.[1] || destination.heroMedia?.url,
          tips: 'Ideal spot for golden hour and sunset panorama shots.'
        },
        {
          id: 'wp-4',
          name: `${destination.name} Heritage Artisan Bazaar`,
          category: 'Cultural Market',
          coordinates: [destination.coordinates[0] + 0.003, destination.coordinates[1] + 0.011],
          description: 'Ancient market lane filled with local handicrafts, regional teas, and aromatic spices.',
          timeToSpend: '1 hour',
          photo: destination.gallery?.[2] || destination.heroMedia?.url,
          tips: 'Support local generational craftspeople directly.'
        }
      ];

  const currentWp = waypoints[selectedWaypointIndex] || waypoints[0];

  // Initialize and update Leaflet Trail Map
  useEffect(() => {
    if (activeTab !== 'trail' || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: destination.coordinates || [20, 80],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      // 100% Free Open Basemap (Esri Dark Gray + Reference Labels - No Watermark)
      setupFreeTileLayer(map, L, 'dark');

      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Collect coordinates for the route polyline ("way")
    const latLngs = waypoints.map(w => w.coordinates);

    // Draw scenic connected trail line ("Way not point")
    if (latLngs.length > 1) {
      // Glow underlying line
      L.polyline(latLngs, {
        color: '#38bdf8',
        weight: 6,
        opacity: 0.35,
        smoothFactor: 1
      }).addTo(markersGroup);

      // Main dashed route trail
      L.polyline(latLngs, {
        color: '#10b981',
        weight: 3.5,
        dashArray: '6, 8',
        opacity: 0.95,
        smoothFactor: 1
      }).addTo(markersGroup);
    }

    // Place numbered waypoints along the route
    waypoints.forEach((wp, idx) => {
      const isSelected = selectedWaypointIndex === idx;
      const marker = L.marker(wp.coordinates, {
        icon: createNumberedMarker(idx + 1, wp.name, isSelected)
      });

      marker.on('click', () => {
        setSelectedWaypointIndex(idx);
      });

      markersGroup.addLayer(marker);
    });

    // Fit map bounds to encompass all waypoints
    if (latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [activeTab, waypoints, selectedWaypointIndex, destination.coordinates]);

  // Clean up Leaflet on unmount or tab switch
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Center on newly selected waypoint
  const handleSelectWaypoint = (idx) => {
    setSelectedWaypointIndex(idx);
    if (mapInstanceRef.current && waypoints[idx]) {
      mapInstanceRef.current.flyTo(waypoints[idx].coordinates, 15, { duration: 1.0 });
    }
  };

  const photosphereContainerRef = useRef(null);
  const [streetViewMode, setStreetViewMode] = useState('google'); // 'google' | 'photosphere'
  const [isPhotosphereRotating, setIsPhotosphereRotating] = useState(true);

  // Three.js 360 Photosphere viewer for waypoint / destination
  useEffect(() => {
    if (activeTab !== 'streetview' || streetViewMode !== 'photosphere' || !photosphereContainerRef.current) return;

    const container = photosphereContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(50, 60, 40);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    const photoUrl = currentWp?.photo || destination.heroMedia?.url || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2500&q=90';

    textureLoader.load(
      photoUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      },
      undefined,
      (err) => console.warn('Photosphere fallback:', err)
    );

    let isUserInteracting = false;
    let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
    let lon = 0, onPointerDownLon = 0;
    let lat = 0, onPointerDownLat = 0;
    let phi = 0, theta = 0;
    let reqId;

    const onPointerDown = (e) => {
      isUserInteracting = true;
      setIsPhotosphereRotating(false);
      onPointerDownMouseX = e.clientX || e.touches?.[0]?.clientX;
      onPointerDownMouseY = e.clientY || e.touches?.[0]?.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (e) => {
      if (!isUserInteracting) return;
      const clientX = e.clientX || e.touches?.[0]?.clientX;
      const clientY = e.clientY || e.touches?.[0]?.clientY;
      lon = (onPointerDownMouseX - clientX) * 0.15 + onPointerDownLon;
      lat = (clientY - onPointerDownMouseY) * 0.15 + onPointerDownLat;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('touchstart', onPointerDown);
    dom.addEventListener('touchmove', onPointerMove);
    dom.addEventListener('touchend', onPointerUp);

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isUserInteracting && isPhotosphereRotating) {
        lon += 0.05;
      }
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);
      camera.target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );
      camera.lookAt(camera.target);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      dom.removeEventListener('touchmove', onPointerMove);
      dom.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
    };
  }, [activeTab, streetViewMode, currentWp, destination.heroMedia, isPhotosphereRotating]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-ocean-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Footprints className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Interactive Waypoint Route & Spatial Navigation</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            {destination.name} Exploration Way & 360° Trail
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Connected route path through key highlights, sanctuaries, and viewpoints inside this destination.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('trail')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'trail'
                ? 'bg-emerald-600 text-white shadow-glow-green'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Trail Map ("Way")</span>
          </button>

          <button
            onClick={() => setActiveTab('streetview')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'streetview'
                ? 'bg-heritage-500 text-slate-950 shadow-glow-gold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Google Street View 360°</span>
          </button>

          <button
            onClick={() => setActiveTab('google-route')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'google-route'
                ? 'bg-ocean-600 text-white shadow-glow-blue'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Directions Route</span>
          </button>
        </div>
      </div>

      {/* Main Display Stage */}
      <div className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-inner">
        
        {/* TAB 1: Leaflet Custom Trail Way Map */}
        {activeTab === 'trail' && (
          <div className="w-full h-full relative">
            <div ref={mapContainerRef} className="w-full h-full z-0" />
            
            {/* Trail Stats Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 p-3 px-4 rounded-2xl glass-panel border border-white/10 text-xs text-slate-200 flex items-center gap-3 shadow-glass">
              <div className="flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-emerald-400" />
                <span>Trail Distance: <strong className="text-white">~3.8 km</strong></span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-ocean-400" />
                <span>Est. Time: <strong className="text-white">2.5 hours</strong></span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-400/30">
                {waypoints.length} Connected Stops
              </span>
            </div>

            {/* Current Active Waypoint Card Floating Overlay */}
            {currentWp && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10 p-4 rounded-2xl glass-panel border border-emerald-500/40 bg-black/85 shadow-glow-green animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <img
                    src={currentWp.photo}
                    alt={currentWp.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/15 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-400/30">
                        Stop #{selectedWaypointIndex + 1} • {currentWp.category}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {currentWp.timeToSpend}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white truncate">
                      {currentWp.name}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                      {currentWp.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-400 font-medium">
                        💡 {currentWp.tips}
                      </span>
                      <button
                        onClick={() => setActiveTab('streetview')}
                        className="px-2.5 py-1 rounded-lg bg-heritage-500 hover:bg-heritage-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>360° Street View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Street View 360° Panorama with Zero-Key Google + 360 Photosphere Switcher */}
        {activeTab === 'streetview' && (
          <div className="w-full h-full relative">
            {streetViewMode === 'google' ? (
              <iframe
                title={`Google Street View - ${currentWp.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={getStreetViewEmbedUrl(currentWp.coordinates[0], currentWp.coordinates[1])}
              />
            ) : (
              <div className="w-full h-full relative bg-[#030c1b]">
                <div ref={photosphereContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-0" />
                <div className="absolute top-16 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs text-white flex items-center gap-2 pointer-events-none">
                  <RotateCw className={`w-3.5 h-3.5 text-ocean-400 ${isPhotosphereRotating ? 'animate-spin' : ''}`} />
                  <span>360° Photosphere &bull; Drag mouse/touch to look around</span>
                </div>
              </div>
            )}

            {/* Street View Control Badge */}
            <div className="absolute top-4 left-4 z-10 p-3 px-4 rounded-2xl glass-panel border border-white/10 text-xs text-white shadow-glass flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <strong className="block text-white text-xs">
                  {streetViewMode === 'google' ? 'Google 360° Street View' : 'Interactive 360° Photosphere'}
                </strong>
                <span className="text-[10px] text-slate-300">
                  Viewing: {currentWp.name} ({currentWp.coordinates[0].toFixed(4)}, {currentWp.coordinates[1].toFixed(4)})
                </span>
              </div>
            </div>

            {/* Dual Mode Switcher Pill */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-xs">
              <button
                onClick={() => setStreetViewMode('google')}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  streetViewMode === 'google'
                    ? 'bg-heritage-500 text-slate-950 shadow-glow-gold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Google 360°</span>
              </button>
              <button
                onClick={() => setStreetViewMode('photosphere')}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  streetViewMode === 'photosphere'
                    ? 'bg-ocean-600 text-white shadow-glow-blue'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Photosphere</span>
              </button>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${currentWp.coordinates[0]},${currentWp.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 shadow-glass"
              >
                <span>Full Screen in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: Google Maps Walking Directions Route ("Way") */}
        {activeTab === 'google-route' && (
          <div className="w-full h-full relative">
            <iframe
              title={`Google Directions Route - ${destination.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={getGoogleRouteEmbedUrl(
                waypoints[0].coordinates,
                waypoints[waypoints.length - 1].coordinates
              )}
            />

            <div className="absolute top-4 left-4 z-10 p-3 px-4 rounded-2xl glass-panel border border-white/10 text-xs text-white shadow-glass">
              <strong className="block text-white text-xs">Google Maps Walking Route Navigation</strong>
              <span className="text-[10px] text-slate-300">
                Connected route linking {waypoints.length} stops from start to finish
              </span>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${waypoints[0].coordinates[0]},${waypoints[0].coordinates[1]}&destination=${waypoints[waypoints.length - 1].coordinates[0]},${waypoints[waypoints.length - 1].coordinates[1]}&travelmode=walking`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 shadow-glass"
              >
                <span>Open in Google Maps Navigation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Sequential Numbered Waypoint Stops Strip */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
          Sequential Exploration Waypoints along the Trail:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {waypoints.map((wp, idx) => {
            const isSelected = selectedWaypointIndex === idx;
            return (
              <button
                key={wp.id}
                onClick={() => handleSelectWaypoint(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all border flex items-start gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-950/90 to-ocean-950/80 border-emerald-400 shadow-glow-green scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  isSelected ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-300'
                }`}>
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-xs text-white truncate">
                    {wp.name}
                  </h5>
                  <span className="text-[10px] text-ocean-300 block truncate">
                    {wp.category} • {wp.timeToSpend}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Inner Place Cards Grid ("all place details inside not empty / hidden") */}
      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-heritage-400 uppercase tracking-widest block mb-1">
              Place Details Inside
            </span>
            <h3 className="font-display font-bold text-xl text-white">
              Sights, Sanctuaries & Attractions Inside {destination.name}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {waypoints.length} Detailed Places Documented
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {waypoints.map((wp, idx) => (
            <div
              key={wp.id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row gap-4 group"
            >
              <img
                src={wp.photo}
                alt={wp.name}
                className="w-full sm:w-32 h-32 rounded-xl object-cover border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ocean-950 text-ocean-300 border border-ocean-400/30">
                      Stop {idx + 1} • {wp.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      ⏱ {wp.timeToSpend}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-ocean-300 transition-colors">
                    {wp.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {wp.description}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-medium">
                    📌 {wp.tips}
                  </span>
                  <button
                    onClick={() => {
                      handleSelectWaypoint(idx);
                      setActiveTab('streetview');
                    }}
                    className="text-[11px] font-bold text-heritage-400 hover:text-heritage-300 flex items-center gap-1"
                  >
                    <span>View 360°</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

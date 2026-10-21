import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Eye, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  Maximize2, 
  Compass, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  MapPin, 
  Award,
  Play,
  Pause,
  Navigation,
  Footprints,
  Layers,
  ExternalLink
} from 'lucide-react';
import L from 'leaflet';
import { usePassport } from '../context/PassportContext';
import { getStreetViewEmbedUrl } from '../config/maps';

// Waypoint marker for Sanctuary Trail
const createSanctuaryMarker = (num, name, isSelected = false) => {
  return L.divIcon({
    className: 'custom-sanctuary-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
        <div style="
          width: ${isSelected ? '32px' : '26px'};
          height: ${isSelected ? '32px' : '26px'};
          background: ${isSelected ? '#10b981' : '#f59e0b'};
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 16px ${isSelected ? '#10b981' : '#f59e0b'};
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 800;
          font-size: 11px;
        ">
          ${num}
        </div>
        <div style="
          margin-top: 3px;
          background: rgba(3, 12, 27, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 9px;
          font-weight: 600;
          padding: 2px 5px;
          border-radius: 4px;
          white-space: nowrap;
        ">
          ${name}
        </div>
      </div>
    `,
    iconSize: [80, 44],
    iconAnchor: [40, 14]
  });
};

export const VirtualTourViewer = ({ tours = [], activeTourId, onTourChange }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const sphereMeshRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const trailMapContainerRef = useRef(null);
  const trailMapInstanceRef = useRef(null);

  const { addXp, triggerCelebration } = usePassport();

  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [viewMode, setViewMode] = useState('photosphere'); // 'photosphere' | 'streetview' | 'trail'

  // Comprehensive virtual tours with exact coordinates & hotspot ways
  const defaultTours = [
    {
      id: "tour-meenakshi",
      title: "Meenakshi Sundareswarar Temple Hall of 1,000 Pillars",
      locationName: "Madurai, Tamil Nadu, India",
      coordinates: [9.9195, 78.1193],
      panoramaUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2500&q=90",
      audioGuideText: "Welcome to the Meenakshi Sundareswarar Temple thousand-pillar hall. Notice how each granite pillar is sculpted from a single solid monolith, depicting mythical yalis, celestial musicians, and cosmic mandalas.",
      hotspots: [
        { id: "h1", title: "South Gopuram (51.9m)", description: "The tallest tower featuring over 1,511 polychrome sculpted deities.", coords: { x: 30, y: 40 } },
        { id: "h2", title: "Potramarai Kulam (Golden Lotus Tank)", description: "The sacred stepped stone pool where classical Tamil Sangam poetry was judged.", coords: { x: 60, y: 70 } },
        { id: "h3", title: "Musical Granite Columns", description: "Granite columns carved from solid rock that resonate in musical tones when struck.", coords: { x: 75, y: 35 } }
      ]
    },
    {
      id: "tour-taj-mahal",
      title: "The Taj Mahal Charbagh & Marble Plinth",
      locationName: "Agra, Uttar Pradesh, India",
      coordinates: [27.1751, 78.0421],
      panoramaUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2500&q=90",
      audioGuideText: "You stand before the ivory-white marble dome of the Taj Mahal. The symmetry is mathematically immaculate from every quadrant, symbolizing paradise on earth.",
      hotspots: [
        { id: "ht1", title: "Central Marble Onion Dome", description: "Reaching 35 meters with inlaid black marble calligraphy.", coords: { x: 50, y: 25 } },
        { id: "ht2", title: "Pietra Dura Gem Inlay", description: "Semi-precious lapis lazuli and carnelian fitted seamlessly into white Makrana marble.", coords: { x: 42, y: 60 } }
      ]
    },
    {
      id: "tour-fushimi-inari",
      title: "Fushimi Inari Senbon Torii Corridor",
      locationName: "Kyoto, Kansai, Japan",
      coordinates: [34.9671, 135.7727],
      panoramaUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2500&q=90",
      audioGuideText: "Step into the vermilion tunnel of Fushimi Inari-Taisha. The distinctive orange-red hue repels misfortune and honors the Shinto deity of harvest and prosperity.",
      hotspots: [
        { id: "hfi1", title: "Senbon Torii Corridor", description: "Over 10,000 vermilion torii archways forming an enchanting sacred mountain path.", coords: { x: 50, y: 40 } }
      ]
    },
    {
      id: "tour-angkor-wat",
      title: "Angkor Wat Central Lotus Sanctuary & Moat",
      locationName: "Siem Reap, Cambodia",
      coordinates: [13.4125, 103.8670],
      panoramaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2500&q=90",
      audioGuideText: "Welcome to Angkor Wat, the grandest religious monument on Earth. Built by King Suryavarman II in the 12th century, it symbolizes Mount Meru, the cosmic center of the universe.",
      hotspots: [
        { id: "haw1", title: "Central Tower Lotus Spire", description: "Soaring 65 meters above the jungle floor representing Mount Meru.", coords: { x: 50, y: 35 } }
      ]
    },
    {
      id: "tour-borobudur",
      title: "Borobudur Stupa Terraces Over Mount Merapi",
      locationName: "Central Java, Indonesia",
      coordinates: [-7.6079, 110.2038],
      panoramaUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2500&q=90",
      audioGuideText: "Stand among the 72 perforated stone stupas of Borobudur, each sheltering a seated Buddha statue overlooking active volcanic ridges.",
      hotspots: [
        { id: "hbb1", title: "Perforated Stupas", description: "Lattice stupas containing seated Buddha figures reaching enlightenment.", coords: { x: 55, y: 45 } }
      ]
    }
  ];

  const activeTours = tours.length > 0 ? tours : defaultTours;
  const currentTour = activeTours[currentTourIndex] || activeTours[0];
  const tourCoords = currentTour.coordinates || [9.9195, 78.1193];

  // Initialize Three.js 360 Panorama Sphere when in photosphere mode
  useEffect(() => {
    if (viewMode !== 'photosphere' || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Create 360 Sphere
    const geometry = new THREE.SphereGeometry(50, 60, 40);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      currentTour.panoramaUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sphereMeshRef.current = sphere;
      },
      undefined,
      (err) => {
        console.warn("Texture load error, using high-res panorama fallback:", err);
      }
    );

    // Drag Controls
    let isUserInteracting = false;
    let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
    let lon = 0, onPointerDownLon = 0;
    let lat = 0, onPointerDownLat = 0;
    let phi = 0, theta = 0;

    const onPointerDown = (event) => {
      isUserInteracting = true;
      setIsRotating(false);
      onPointerDownMouseX = event.clientX || event.touches?.[0]?.clientX;
      onPointerDownMouseY = event.clientY || event.touches?.[0]?.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event) => {
      if (!isUserInteracting) return;
      const clientX = event.clientX || event.touches?.[0]?.clientX;
      const clientY = event.clientY || event.touches?.[0]?.clientY;
      lon = (onPointerDownMouseX - clientX) * 0.15 + onPointerDownLon;
      lat = (clientY - onPointerDownMouseY) * 0.15 + onPointerDownLat;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('touchstart', onPointerDown);
    domElement.addEventListener('touchmove', onPointerMove);
    domElement.addEventListener('touchend', onPointerUp);

    // Animation Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isUserInteracting && isRotating) {
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
      if (!containerRef.current || !renderer || !camera) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
    };
  }, [currentTourIndex, viewMode]);

  // Initialize Leaflet Map when in 'trail' mode ("Way not point")
  useEffect(() => {
    if (viewMode !== 'trail' || !trailMapContainerRef.current) return;

    if (!trailMapInstanceRef.current) {
      const map = L.map(trailMapContainerRef.current, {
        center: tourCoords,
        zoom: 16,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      trailMapInstanceRef.current = map;
    }

    const map = trailMapInstanceRef.current;
    if (!map) return;

    // Generate realistic waypoints inside the monument complex
    const sanctuaryWaypoints = [
      { name: "Outer Gopuram Gate", coords: [tourCoords[0] - 0.002, tourCoords[1] - 0.001] },
      { name: "Courtyard & Sacred Lotus Tank", coords: [tourCoords[0] - 0.0008, tourCoords[1] + 0.0005] },
      { name: "Thousand Pillar Hall", coords: tourCoords },
      { name: "Inner Sanctum Shrines", coords: [tourCoords[0] + 0.0012, tourCoords[1] + 0.0008] }
    ];

    const latLngs = sanctuaryWaypoints.map(w => w.coords);

    // Draw connected sanctuary walking way ("Way not point")
    L.polyline(latLngs, {
      color: '#f59e0b',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.95
    }).addTo(map);

    sanctuaryWaypoints.forEach((wp, idx) => {
      L.marker(wp.coords, {
        icon: createSanctuaryMarker(idx + 1, wp.name)
      }).addTo(map);
    });

    map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50] });

    return () => {
      if (trailMapInstanceRef.current) {
        trailMapInstanceRef.current.remove();
        trailMapInstanceRef.current = null;
      }
    };
  }, [viewMode, currentTourIndex, tourCoords]);

  // Audio Guide Narrator
  const toggleAudioGuide = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentTour.audioGuideText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      addXp(25, "Listened to 360° audio guide");
    }
  };

  const handleNextTour = () => {
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setSelectedHotspot(null);
    const nextIdx = (currentTourIndex + 1) % activeTours.length;
    setCurrentTourIndex(nextIdx);
    addXp(50, `Explored virtual tour: ${activeTours[nextIdx].title}`);
  };

  const handlePrevTour = () => {
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setSelectedHotspot(null);
    const prevIdx = (currentTourIndex - 1 + activeTours.length) % activeTours.length;
    setCurrentTourIndex(prevIdx);
  };

  return (
    <section className="py-20 bg-[#020914] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-ocean-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Eye className="w-3.5 h-3.5 text-heritage-400 animate-pulse" />
              <span>Immersive Heritage Discovery</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              VIRTUAL ASIA 360°
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Step inside sacred monuments with interactive 360° Photospheres, live Google Street View, and connected sanctuary walking trails.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('photosphere')}
              className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'photosphere'
                  ? 'bg-ocean-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>360° Photosphere</span>
            </button>

            <button
              onClick={() => setViewMode('streetview')}
              className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'streetview'
                  ? 'bg-heritage-500 text-slate-950 shadow-glow-gold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Google Street View</span>
            </button>

            <button
              onClick={() => setViewMode('trail')}
              className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'trail'
                  ? 'bg-emerald-600 text-white shadow-glow-green'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Sanctuary Trail ("Way")</span>
            </button>
          </div>
        </div>

        {/* 360 Viewer Shell */}
        <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-glass bg-black">
          
          {/* TAB 1: Three.js 360 Sphere */}
          {viewMode === 'photosphere' && (
            <div className="w-full h-full relative">
              <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Hotspots */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {currentTour.hotspots?.map((hs) => (
                  <button
                    key={hs.id}
                    onClick={() => setSelectedHotspot(hs)}
                    style={{ left: `${hs.coords.x}%`, top: `${hs.coords.y}%` }}
                    className="pointer-events-auto absolute p-2 rounded-full bg-ocean-500/80 hover:bg-ocean-400 text-white border-2 border-white shadow-glow-blue transition-all duration-300 hover:scale-125 animate-bounce-slow"
                    title={hs.title}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Google Street View 360° */}
          {viewMode === 'streetview' && (
            <div className="w-full h-full relative">
              <iframe
                title={`Google Street View - ${currentTour.title}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={getStreetViewEmbedUrl(tourCoords[0], tourCoords[1])}
              />

              <div className="absolute bottom-4 right-4 z-20">
                <a
                  href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${tourCoords[0]},${tourCoords[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 shadow-glass"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: Connected Sanctuary Trail ("Way not point") */}
          {viewMode === 'trail' && (
            <div className="w-full h-full relative">
              <div ref={trailMapContainerRef} className="w-full h-full z-0" />
              <div className="absolute top-4 left-4 z-20 p-3 px-4 rounded-2xl glass-panel border border-white/10 text-xs text-white shadow-glass flex items-center gap-2">
                <Footprints className="w-4 h-4 text-amber-400" />
                <span>Sanctuary Walkway: 4 Connected Courtyards & Inner Shrines</span>
              </div>
            </div>
          )}

          {/* Top Bar Overlay */}
          <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
            {/* Title & Location */}
            <div className="pointer-events-auto p-3 px-4 rounded-2xl glass-panel border border-white/15 max-w-md shadow-glass">
              <span className="text-[10px] font-bold text-heritage-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{currentTour.locationName}</span>
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">
                {currentTour.title}
              </h3>
            </div>

            {/* Audio Guide & Rotate Controls */}
            {viewMode === 'photosphere' && (
              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  onClick={toggleAudioGuide}
                  className={`p-3 rounded-2xl glass-panel border transition-all flex items-center gap-2 text-xs font-bold ${
                    isPlayingAudio
                      ? 'bg-heritage-500/40 border-heritage-400 text-white shadow-glow-gold animate-pulse'
                      : 'hover:bg-white/20 text-slate-200 border-white/15'
                  }`}
                  title="Toggle Audio Guide Narration"
                >
                  {isPlayingAudio ? <Volume2 className="w-4 h-4 text-heritage-300" /> : <VolumeX className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isPlayingAudio ? "Playing Audio Guide..." : "Audio Guide"}</span>
                </button>

                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`p-3 rounded-2xl glass-panel border text-white transition-colors ${
                    isRotating ? 'border-ocean-400 text-ocean-300' : 'border-white/15 hover:bg-white/20'
                  }`}
                  title="Toggle 360 Auto-Rotation"
                >
                  <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin-slow' : ''}`} />
                </button>
              </div>
            )}
          </div>

          {/* Selected Hotspot Modal Card */}
          {selectedHotspot && (
            <div className="absolute bottom-20 left-6 z-20 max-w-sm rounded-2xl glass-panel p-5 border border-white/20 shadow-glass animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-ocean-300 uppercase tracking-wider">Heritage Hotspot</span>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <h4 className="font-display font-bold text-sm text-white mb-2">
                {selectedHotspot.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedHotspot.description}
              </p>
            </div>
          )}

          {/* Bottom Bar: Switch Tours */}
          <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={handlePrevTour}
                className="p-3 rounded-2xl glass-panel hover:bg-white/20 text-white border border-white/15 transition-colors shadow-glass"
                title="Previous Virtual Tour"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextTour}
                className="p-3 rounded-2xl glass-panel hover:bg-white/20 text-white border border-white/15 transition-colors shadow-glass"
                title="Next Virtual Tour"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="pointer-events-auto flex items-center gap-2 p-2 px-3.5 rounded-2xl glass-panel border border-white/15 text-xs text-slate-300 shadow-glass">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tour {currentTourIndex + 1} of {activeTours.length}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

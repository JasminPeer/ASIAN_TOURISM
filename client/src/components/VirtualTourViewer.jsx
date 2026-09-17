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
  Pause
} from 'lucide-react';
import { usePassport } from '../context/PassportContext';

export const VirtualTourViewer = ({ tours = [], activeTourId, onTourChange }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const sphereMeshRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  const { addXp, triggerCelebration } = usePassport();

  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSynth, setSpeechSynth] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  // Fallback demo tours if none passed
  const demoTours = tours.length > 0 ? tours : [
    {
      id: "tour-meenakshi",
      title: "Meenakshi Sundareswarar Temple Hall of Thousand Pillars",
      locationName: "Madurai, Tamil Nadu, India",
      panoramaUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2500&q=90",
      audioGuideText: "Welcome to the Meenakshi Temple thousand-pillar hall. Notice how each granite pillar is sculpted from a single solid monolith, depicting mythical yalis, celestial musicians, and cosmic mandalas.",
      hotspots: [
        { id: "h1", title: "South Gopuram", description: "The tallest gopuram soaring 51.9 meters high with 1,511 colorful deities.", coords: { x: 30, y: 40 } },
        { id: "h2", title: "Musical Granite Columns", description: "Granite columns that chime in distinct Carnatic musical pitches when struck.", coords: { x: 75, y: 35 } }
      ]
    },
    {
      id: "tour-taj-mahal",
      title: "The Taj Mahal Charbagh & Marble Plinth",
      locationName: "Agra, Uttar Pradesh, India",
      panoramaUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2500&q=90",
      audioGuideText: "You stand before the ivory-white marble dome of the Taj Mahal. The symmetry is mathematically immaculate from every quadrant, symbolizing eternal balance.",
      hotspots: [
        { id: "ht1", title: "Central Marble Onion Dome", description: "Reaching 35 meters with inlaid verses of the Quran in black marble calligraphy.", coords: { x: 50, y: 25 } },
        { id: "ht2", title: "Pietra Dura Gem Inlay", description: "Semi-precious lapis lazuli, turquoise, and carnelian fitted seamlessly into marble.", coords: { x: 42, y: 60 } }
      ]
    },
    {
      id: "tour-fushimi-inari",
      title: "Fushimi Inari Senbon Torii Path",
      locationName: "Kyoto, Kansai, Japan",
      panoramaUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2500&q=90",
      audioGuideText: "Step into the vermilion tunnel of Fushimi Inari-Taisha. The distinctive orange-red hue is believed to repel misfortune and honor the rice deity Inari.",
      hotspots: [
        { id: "hfi1", title: "Senbon Torii Corridor", description: "Over 10,000 torii archways forming an enchanting sacred mountain path.", coords: { x: 50, y: 40 } }
      ]
    }
  ];

  const currentTour = demoTours[currentTourIndex] || demoTours[0];

  // Initialize Three.js 360 Panorama Sphere
  useEffect(() => {
    if (!containerRef.current) return;

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

    // Create 360 Sphere (inverted scale so inside is visible)
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

    // Mouse & Touch Drag Controls
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
        lon += 0.05; // Gentle slow rotation
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
  }, [currentTourIndex]);

  // Audio Guide Narrator using Web Speech Synthesis
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
    const nextIdx = (currentTourIndex + 1) % demoTours.length;
    setCurrentTourIndex(nextIdx);
    addXp(50, `Explored 360° virtual tour: ${demoTours[nextIdx].title}`);
  };

  const handlePrevTour = () => {
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setSelectedHotspot(null);
    const prevIdx = (currentTourIndex - 1 + demoTours.length) % demoTours.length;
    setCurrentTourIndex(prevIdx);
  };

  return (
    <section className="py-20 bg-[#020914] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-ocean-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Eye className="w-3.5 h-3.5 text-heritage-400 animate-pulse" />
              <span>Immersive Heritage Discovery</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              VIRTUAL ASIA 360°
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-400 max-w-md">
            Step inside sacred monuments, ancient temple sanctums, and imperial courtyards with interactive 360° spatial panoramas.
          </p>
        </div>

        {/* 360 Viewer Canvas Shell */}
        <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-glass">
          
          {/* Three.js Container */}
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

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
          </div>

          {/* Interactive 360 Hotspot Pins */}
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
                className="p-3 rounded-2xl glass-panel hover:bg-white/20 text-white border border-white/15 transition-colors"
                title="Previous Virtual Tour"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextTour}
                className="p-3 rounded-2xl glass-panel hover:bg-white/20 text-white border border-white/15 transition-colors"
                title="Next Virtual Tour"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="pointer-events-auto flex items-center gap-2 p-2 px-3.5 rounded-2xl glass-panel border border-white/15 text-xs text-slate-300">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tour {currentTourIndex + 1} of {demoTours.length}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

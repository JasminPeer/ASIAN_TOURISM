import React from 'react';
import { AsiaMapViewer } from '../components/AsiaMapViewer';
import { Compass, Sparkles, MapPin, Layers, Info } from 'lucide-react';

export const ExploreMapPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-[#030c1b]">
      
      {/* Top Banner */}
      <div className="bg-[#07162c] border-b border-white/10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-ocean-400 uppercase tracking-widest mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Full Continental Spatial Navigator</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              EXPLORE ASIA ON THE MAP
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 p-2 px-3 rounded-xl bg-white/5 border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-ocean-400" />
              <span>Click Country to Zoom & Reveal States/Regions</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 px-3 rounded-xl bg-white/5 border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Click Marker for Destination Guide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Map Viewer */}
      <div className="w-full">
        <AsiaMapViewer isFullPage={true} />
      </div>

    </div>
  );
};

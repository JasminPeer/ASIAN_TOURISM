import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#030c1b] flex items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <Compass className="w-16 h-16 text-ocean-400 mx-auto mb-4 animate-spin-slow" />
        <h1 className="font-display font-extrabold text-6xl text-white mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-200 mb-3">Unknown Asian Horizon</h2>
        <p className="text-xs text-slate-400 mb-6">
          The requested coordinate or trail does not exist on our continental map.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-ocean-600 hover:bg-ocean-500 text-white text-xs font-bold shadow-glow-blue transition-all"
        >
          Return to Asian Continent Home
        </Link>
      </div>
    </div>
  );
};

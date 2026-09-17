import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap gap-2 text-xs text-slate-400">
      <Link 
        to="/" 
        className="flex items-center gap-1.5 hover:text-white transition-colors py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10"
      >
        <Home className="w-3.5 h-3.5 text-ocean-400" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
            {isLast || !item.path ? (
              <span className="text-ocean-300 font-medium py-1 px-2 rounded-lg bg-ocean-950/40 border border-ocean-500/20 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.path} 
                className="hover:text-white transition-colors py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

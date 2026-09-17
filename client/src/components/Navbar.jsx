import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Sparkles, 
  Award, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck, 
  MapPin,
  Bookmark,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePassport } from '../context/PassportContext';

export const Navbar = ({ onOpenSearch, onOpenAuth, onOpenLuna }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { xp, stamps, setIsPassportOpen } = usePassport();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Asia', path: '/map' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Heritage', path: '/heritage' },
    { name: 'Virtual Tours', path: '/virtual-tours' },
    { name: 'Plan Your Tour', path: '/plan' },
    { name: 'Compare', path: '/compare' },
    { name: 'Secret Asia', path: '/secret-asia' },
  ];

  const isLinkActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    if (path === '/plan' && location.pathname === '/plan-tour') return true;
    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#030c1b]/90 backdrop-blur-xl border-b border-white/10 shadow-glass py-2.5' 
        : 'bg-gradient-to-b from-[#030c1b]/95 via-[#030c1b]/60 to-transparent py-4'
    }`}>
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-ocean-600 via-ocean-400 to-nature-400 p-0.5 shadow-glow-blue transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#07162c] rounded-[10px] flex items-center justify-center">
              <Compass className="w-4.5 h-4.5 text-ocean-300 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-ocean-200 to-emerald-300 block">
              ASIA EXPLORA
            </span>
            <span className="block text-[8px] font-bold tracking-widest text-heritage-400 uppercase -mt-0.5">
              Smart Tourism & Heritage
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Visible on 1280px+) */}
        <div className="hidden 2xl:flex items-center space-x-1 flex-shrink-0">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  active 
                    ? 'text-white bg-white/15 border border-ocean-400/40 shadow-glow-blue' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Compact Navigation Links (For screens between 1080px and 1536px) */}
        <div className="hidden xl:flex 2xl:hidden items-center space-x-1 flex-shrink-0">
          {navLinks.slice(0, 6).map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  active 
                    ? 'text-white bg-white/15 border border-ocean-400/40 shadow-glow-blue' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/secret-asia"
            className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              isLinkActive('/secret-asia') ? 'text-white bg-white/15 border border-ocean-400/40' : 'text-slate-300 hover:text-white'
            }`}
          >
            Secret Asia
          </Link>
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* Global Search Button */}
          <button 
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Global Search (Destinations, Countries, Heritage)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Luna AI Trigger */}
          <button
            onClick={onOpenLuna}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ocean-950/80 hover:bg-ocean-900 border border-ocean-400/40 text-ocean-300 text-xs font-semibold shadow-glow-blue transition-all duration-300 hover:scale-105"
            title="Ask Luna AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-heritage-400 animate-pulse" />
            <span>Luna AI</span>
          </button>

          {/* Travel Passport / XP Quick Badge */}
          <button
            onClick={() => setIsPassportOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-heritage-950/70 hover:bg-heritage-900 border border-heritage-500/40 text-heritage-300 hover:text-heritage-200 text-xs font-semibold transition-all duration-200 shadow-glow-gold"
            title="Open Digital Travel Passport"
          >
            <Award className="w-3.5 h-3.5 text-heritage-400 flex-shrink-0" />
            <span className="font-bold">{xp} XP</span>
            <span className="hidden lg:inline text-[10px] bg-heritage-500/20 px-1.5 py-0.2 rounded-full text-heritage-200">
              {stamps.length} Stamps
            </span>
          </button>

          {/* Currency Switcher */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-xs text-slate-300">
            {['USD', 'INR', 'JPY'].map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                  currency === curr ? 'bg-ocean-600 text-white font-bold' : 'hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* User Auth or Profile Dropdown */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
                aria-label="User profile"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-ocean-500 to-nature-500 flex items-center justify-center font-bold text-xs text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl glass-panel p-2 shadow-glass border border-white/10 animate-in fade-in zoom-in-95 duration-200 z-50">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/passport"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-heritage-400" />
                      <span>My Travel Passport</span>
                    </Link>
                    <Link
                      to="/plan"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-ocean-400" />
                      <span>My Saved Trips</span>
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-emerald-400 hover:bg-emerald-950/30 rounded-lg transition-colors font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                  </div>
                  <div className="border-t border-white/10 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Primary CTA "Plan Journey" */}
          <Link
            to="/plan"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-ocean-500 via-ocean-600 to-nature-600 hover:from-ocean-400 hover:to-nature-500 text-white text-xs font-bold shadow-glow-blue transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            <span>Plan Journey</span>
            <Sparkles className="w-3 h-3 text-heritage-300" />
          </Link>

          {/* Hamburger Menu Toggle (Visible below xl: 1280px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-3 pb-6 bg-[#030c1b]/98 border-b border-white/15 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-1 mb-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-ocean-600/30 text-white border border-ocean-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-ocean-400" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLuna();
              }}
              className="flex-1 py-2.5 rounded-xl bg-ocean-950 border border-ocean-400/40 text-ocean-300 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-heritage-400" />
              <span>Ask Luna AI</span>
            </button>

            <Link
              to="/plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-ocean-500 to-nature-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-glow-blue"
            >
              <span>Plan Journey</span>
              <Sparkles className="w-3 h-3 text-heritage-300" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

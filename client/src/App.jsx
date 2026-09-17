import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PassportProvider, usePassport } from './context/PassportContext';

import { ScrollToTop } from './components/ScrollToTop';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LunaTravelAI } from './components/LunaTravelAI';
import { DigitalPassportModal } from './components/DigitalPassportModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';

// Pages
import { Home } from './pages/Home';
import { ExploreMapPage } from './pages/ExploreMapPage';
import { CountryDetailPage } from './pages/CountryDetailPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { HeritagePage } from './pages/HeritagePage';
import { HistoricalErasPage } from './pages/HistoricalErasPage';
import { VirtualTourPage } from './pages/VirtualTourPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { ComparePage } from './pages/ComparePage';
import { SecretAsiaPage } from './pages/SecretAsiaPage';
import { CategoryExplorePage } from './pages/CategoryExplorePage';
import { PassportPage } from './pages/PassportPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Sparkles } from 'lucide-react';

// Main App Container with Global Modals & Notifications
const AppContent = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [lunaOpen, setLunaOpen] = useState(false);

  const { unlockedCelebration } = usePassport();

  return (
    <div className="min-h-screen flex flex-col bg-[#030c1b] text-slate-100 font-sans selection:bg-ocean-500 selection:text-white">
      {/* Reset Scroll on Navigation */}
      <ScrollToTop />

      {/* Top Glass Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenLuna={() => setLunaOpen(true)}
      />

      {/* Global Achievement Celebration Toast */}
      {unlockedCelebration && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl glass-panel border-2 border-heritage-400 bg-black/90 shadow-glow-gold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="text-3xl">{unlockedCelebration.icon}</span>
          <div>
            <span className="text-[10px] font-bold text-heritage-400 uppercase tracking-widest block">
              Passport Achievement
            </span>
            <h4 className="font-display font-bold text-sm text-white">
              {unlockedCelebration.title}
            </h4>
            <p className="text-xs text-slate-300">{unlockedCelebration.message}</p>
          </div>
        </div>
      )}

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenLuna={() => setLunaOpen(true)} onOpenAuth={() => setAuthOpen(true)} />} />
          <Route path="/map" element={<ExploreMapPage />} />
          <Route path="/explore" element={<ExploreMapPage />} />
          <Route path="/explore/:category" element={<CategoryExplorePage />} />
          <Route path="/country/:id" element={<CountryDetailPage />} />
          <Route path="/destination/:id" element={<DestinationDetailPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/eras" element={<HistoricalErasPage />} />
          <Route path="/heritage/eras" element={<HistoricalErasPage />} />
          <Route path="/virtual-tours" element={<VirtualTourPage />} />
          <Route path="/virtual-tour/:id" element={<VirtualTourPage />} />
          <Route path="/plan" element={<TripPlannerPage />} />
          <Route path="/plan-tour" element={<TripPlannerPage />} />
          <Route path="/ai-assistant" element={<TripPlannerPage onOpenLuna={() => setLunaOpen(true)} />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/secret-asia" element={<SecretAsiaPage />} />
          <Route path="/passport" element={<PassportPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <DigitalPassportModal />
      <LunaTravelAI isOpen={lunaOpen} onClose={() => setLunaOpen(false)} />

      {/* Floating Luna AI Trigger Button (Bottom Right) */}
      {!lunaOpen && (
        <button
          onClick={() => setLunaOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-ocean-950 via-[#0a2342] to-ocean-900 hover:to-ocean-800 border-2 border-ocean-400/50 text-white shadow-glow-blue flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group"
          title="Chat with Luna Travel AI"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-ocean-400 p-0.5 shadow-glow-gold">
            <div className="w-full h-full bg-[#07162c] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-heritage-400 animate-spin-slow" />
            </div>
          </div>
          <div className="text-left">
            <span className="font-display font-bold text-xs block text-white group-hover:text-ocean-200">
              Ask Luna Travel AI ✨
            </span>
            <span className="text-[10px] text-emerald-400 font-medium block">
              Instant Itineraries & Advice
            </span>
          </div>
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PassportProvider>
        <Router>
          <AppContent />
        </Router>
      </PassportProvider>
    </AuthProvider>
  );
}

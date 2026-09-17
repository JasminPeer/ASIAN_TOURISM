import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Compass, 
  Calendar, 
  Car, 
  Building, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Bookmark, 
  Navigation, 
  Sun, 
  ShieldCheck, 
  Award,
  Trash2,
  Plus
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { usePassport } from '../context/PassportContext';

export const InteractiveTripPlanner = ({ initialCountry = "India" }) => {
  const { isAuthenticated } = useAuth();
  const { addXp, triggerCelebration } = usePassport();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: initialCountry,
    duration: "4–7 days",
    travelType: "Cultural",
    budget: "Moderate",
    currency: "USD",
    interests: ["Heritage", "Food", "Photography"],
    month: "November",
    transport: "Mixed",
    accommodation: "Hotel"
  });

  const [loading, setLoading] = useState(false);
  const [replanning, setReplanning] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleWeatherReplan = async (customAlert) => {
    if (!generatedItinerary) return;
    setReplanning(true);
    try {
      const alertData = customAlert || {
        condition: "Torrential Monsoon & Coastal Ghat Warning",
        advisory: "Monsoon squalls detected. Luna AI automatically shifted outdoor lake/temple walks to sheltered thousand-pillar granite halls, royal palace durbar galleries, and enclosed AC transit."
      };
      const replanned = await api.replanTripForWeather(generatedItinerary, alertData);
      setGeneratedItinerary(replanned);
      triggerCelebration("Weather Replanned!", "Outdoor treks substituted with magnificent indoor palaces & museums", "🌧️");
      addXp(75, "Weather-aware itinerary re-architected");
    } catch (err) {
      console.error("Weather replanning error:", err);
    } finally {
      setReplanning(false);
    }
  };

  // Steps Configuration
  const steps = [
    { num: 1, label: "Destination", title: "Where do you want to explore?" },
    { num: 2, label: "Duration", title: "How long is your journey?" },
    { num: 3, label: "Travel Style", title: "Who is traveling & what is your style?" },
    { num: 4, label: "Budget", title: "What is your target budget?" },
    { num: 5, label: "Interests", title: "What experiences excite you most?" },
    { num: 6, label: "Travel Month", title: "When do you plan to travel?" },
    { num: 7, label: "Transit", title: "Preferred transportation mode?" },
    { num: 8, label: "Stay", title: "Preferred accommodation type?" },
  ];

  // Options for Each Step
  const destinationOptions = [
    "India (Tamil Nadu, Agra, Kerala, Rajasthan)",
    "Japan (Kyoto, Tokyo, Shirakawa-go)",
    "Thailand (Chiang Mai, Bangkok, Islands)",
    "Cambodia (Angkor Wat, Siem Reap)",
    "Indonesia (Borobudur, Bali, Java)",
    "Vietnam (Ha Long, Hanoi, Hoi An)",
    "Sri Lanka (Sigiriya, Kandy, Galle)",
    "Nepal & Bhutan (Himalayas & Monasteries)",
    "Multiple Asian Countries"
  ];

  const durationOptions = ["1–3 days", "4–7 days", "8–14 days", "15+ days", "Custom Extended Tour"];

  const travelTypeOptions = [
    "Solo", "Couple", "Family", "Friends", "Group", 
    "Honeymoon", "Cultural", "Spiritual", "Adventure", "Luxury", "Budget Backpacking"
  ];

  const budgetOptions = ["Budget ($30-$50/day)", "Moderate ($60-$120/day)", "Premium ($150-$280/day)", "Luxury ($350+/day)"];

  const interestOptions = [
    "Heritage", "Nature", "History", "Food", "Shopping", "Adventure", 
    "Beaches", "Mountains", "Wildlife", "Photography", "Architecture", 
    "Spirituality", "Nightlife", "Local culture"
  ];

  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const transportOptions = ["Flight", "Train", "Bus", "Car / Chauffeur", "Taxi / Tuk-tuk", "Metro", "Walking", "Mixed Transit"];

  const accommodationOptions = ["Budget hotel", "Hotel", "Resort", "Hostel", "Heritage Homestay", "Luxury Palace / Ryokan"];

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await api.planTripWithAI(formData);
      setGeneratedItinerary(result);
      addXp(100, "Created personalized AI itinerary");
    } catch (err) {
      console.error("AI Planner error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    if (!generatedItinerary) return;
    try {
      await api.saveTrip({
        title: generatedItinerary.tripTitle,
        destination: formData.destination,
        duration: formData.duration,
        itinerary: generatedItinerary.dayByDay,
        estimatedBudget: generatedItinerary.estimatedTotalBudget,
        season: formData.month
      });
      setSavedSuccess(true);
      triggerCelebration("Trip Saved!", "Your itinerary has been added to your profile & passport", "🗺");
    } catch (err) {
      console.error("Save trip error:", err);
    }
  };

  return (
    <section id="trip-planner" className="py-24 bg-[#030c1b] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-ocean-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-heritage-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ocean-950 border border-ocean-400/30 text-ocean-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-glow-blue">
            <Sparkles className="w-3.5 h-3.5 text-heritage-400 animate-pulse" />
            <span>AI Travel Engineer</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            PLAN YOUR PERFECT ASIAN JOURNEY
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Tell our intelligent planner your travel desires, and let Gemini AI curate a bespoke day-by-day itinerary with weather intelligence, crowd forecasts, and heritage routes.
          </p>
        </div>

        {/* Multi-Step Wizard or Generated Output */}
        {!generatedItinerary ? (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-glass">
            
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>Step {currentStep} of 8: {steps[currentStep - 1].label}</span>
                <span>{Math.round((currentStep / 8) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-ocean-500 via-sky-400 to-emerald-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 8) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-6">
                  {steps[currentStep - 1].title}
                </h3>

                {/* Step 1: Destination */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {destinationOptions.map(dest => (
                      <button
                        key={dest}
                        onClick={() => setFormData({ ...formData, destination: dest })}
                        className={`p-4 rounded-2xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                          formData.destination === dest
                            ? 'bg-ocean-600/40 border-ocean-400 text-white shadow-glow-blue'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{dest}</span>
                        {formData.destination === dest && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2: Duration */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {durationOptions.map(dur => (
                      <button
                        key={dur}
                        onClick={() => setFormData({ ...formData, duration: dur })}
                        className={`p-4 rounded-2xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                          formData.duration === dur
                            ? 'bg-ocean-600/40 border-ocean-400 text-white shadow-glow-blue'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-sm font-bold">{dur}</span>
                        {formData.duration === dur && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 3: Travel Type */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {travelTypeOptions.map(t => (
                      <button
                        key={t}
                        onClick={() => setFormData({ ...formData, travelType: t })}
                        className={`p-3.5 rounded-2xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                          formData.travelType === t
                            ? 'bg-amber-500/30 border-amber-400 text-white shadow-glow-gold'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{t}</span>
                        {formData.travelType === t && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 4: Budget */}
                {currentStep === 4 && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {budgetOptions.map(b => (
                        <button
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b.split(' ')[0] })}
                          className={`p-4 rounded-2xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                            formData.budget === b.split(' ')[0]
                              ? 'bg-emerald-600/30 border-emerald-400 text-white shadow-glow-green'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-sm block">{b.split(' ')[0]}</span>
                            <span className="text-slate-400 text-[11px]">{b.split(' ')[1]}</span>
                          </div>
                          {formData.budget === b.split(' ')[0] && <Check className="w-4 h-4 text-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Interests */}
                {currentStep === 5 && (
                  <div>
                    <p className="text-xs text-slate-400 mb-3">Select multiple passions to customize your trail:</p>
                    <div className="flex flex-wrap gap-2.5">
                      {interestOptions.map(item => {
                        const isSelected = formData.interests.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() => toggleInterest(item)}
                            className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-sky-500/30 border-sky-400 text-white shadow-glow-blue'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                            }`}
                          >
                            {item} {isSelected ? '✓' : '+'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 6: Preferred Month */}
                {currentStep === 6 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                    {monthOptions.map(m => (
                      <button
                        key={m}
                        onClick={() => setFormData({ ...formData, month: m })}
                        className={`p-3 rounded-2xl text-center border transition-all text-xs font-semibold ${
                          formData.month === m
                            ? 'bg-ocean-600 border-ocean-400 text-white shadow-glow-blue'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 7: Transport Mode */}
                {currentStep === 7 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {transportOptions.map(tr => (
                      <button
                        key={tr}
                        onClick={() => setFormData({ ...formData, transport: tr })}
                        className={`p-3.5 rounded-2xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                          formData.transport === tr
                            ? 'bg-emerald-600/30 border-emerald-400 text-white shadow-glow-green'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{tr}</span>
                        {formData.transport === tr && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 8: Accommodation */}
                {currentStep === 8 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {accommodationOptions.map(acc => (
                      <button
                        key={acc}
                        onClick={() => setFormData({ ...formData, accommodation: acc })}
                        className={`p-4 rounded-2xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                          formData.accommodation === acc
                            ? 'bg-amber-600/30 border-amber-400 text-white shadow-glow-gold'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{acc}</span>
                        {formData.accommodation === acc && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}

              </div>

              {/* Wizard Navigation Buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    currentStep === 1 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {currentStep < 8 ? (
                  <button
                    onClick={() => setCurrentStep(prev => Math.min(8, prev + 1))}
                    className="px-6 py-2.5 rounded-full bg-ocean-600 hover:bg-ocean-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-glow-blue"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-ocean-500 via-sky-500 to-emerald-500 hover:from-ocean-400 hover:to-emerald-400 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-glow-blue flex items-center gap-2 hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                    <span>{loading ? "Engineering with AI..." : "Build My Trip ✨"}</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        ) : (
          /* Generated Itinerary Presentation View */
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            
            {/* Master Header Card */}
            <div className="glass-panel p-8 rounded-3xl border border-ocean-400/40 shadow-glow-blue relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Your Personalized Asia Journey</span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                    {generatedItinerary.tripTitle}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {generatedItinerary.overview}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSaveTrip}
                    disabled={savedSuccess}
                    className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      savedSuccess 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gradient-to-r from-heritage-600 to-amber-500 hover:from-heritage-500 text-white shadow-glow-gold'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{savedSuccess ? "Saved to Trips ✓" : "Save Itinerary"}</span>
                  </button>

                  <button
                    onClick={() => setGeneratedItinerary(null)}
                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-colors"
                  >
                    Modify Preferences
                  </button>
                </div>
              </div>

              {/* Trip Intelligence Metric Pills */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block font-medium">Estimated Budget</span>
                  <span className="text-sm font-bold text-emerald-300">{generatedItinerary.estimatedTotalBudget}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block font-medium">Travel Season</span>
                  <span className="text-sm font-bold text-amber-300">{generatedItinerary.travelMonth}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block font-medium">Crowd Forecast</span>
                  <span className="text-sm font-bold text-sky-300">{generatedItinerary.crowdRating?.split('—')[0]}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block font-medium">Journey Score</span>
                  <span className="text-sm font-bold text-white">{generatedItinerary.journeyScore || 94}/100</span>
                </div>
              </div>

              {/* Weather-Aware Dynamic Trip Replanning Bar */}
              <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ocean-950 text-ocean-300 border border-ocean-400/30">
                      Weather Intelligence
                    </span>
                    {generatedItinerary.replanned ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 bg-amber-950 border border-amber-500/30">
                        ⚡ Weather-Replanned Safe Route Active
                      </span>
                    ) : (
                      <span className="text-xs text-slate-300">
                        Detect monsoon downpours or extreme conditions & dynamically re-route
                      </span>
                    )}
                  </div>
                  {generatedItinerary.alertCondition && (
                    <p className="text-xs text-amber-300 mt-1 font-medium">
                      Simulated Condition: {generatedItinerary.alertCondition}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleWeatherReplan()}
                  disabled={replanning}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold shadow-glow-gold transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{replanning ? "Recalculating Itinerary..." : generatedItinerary.replanned ? "Re-run Weather Intelligence" : "Simulate Severe Weather & Replan"}</span>
                </button>
              </div>

              {/* Weather Replanned Changes Summary */}
              {generatedItinerary.changesSummary?.length > 0 && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs text-slate-200">
                  <span className="font-bold text-amber-300 block mb-1">
                    🛡️ Weather-Safety Adjustments Applied by Luna AI:
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {generatedItinerary.changesSummary.map((change, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Day-by-Day Detailed Itinerary Cards */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-ocean-400" />
                <span>Curated Day-by-Day Schedule</span>
              </h4>

              <div className="grid grid-cols-1 gap-4">
                {generatedItinerary.dayByDay?.map((day) => (
                  <div key={day.day} className="glass-card p-6 rounded-3xl border border-white/10 hover:border-ocean-400/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-ocean-600 text-white font-bold text-xs flex items-center justify-center">
                          D{day.day}
                        </span>
                        <h5 className="font-display font-bold text-lg text-white">
                          {day.title}
                        </h5>
                      </div>
                      <span className="text-xs text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-medium">
                        Stay: {day.hotel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="font-bold text-sky-300 block mb-1">🌅 Morning</span>
                        <p>{day.morning}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="font-bold text-amber-300 block mb-1">☀️ Afternoon</span>
                        <p>{day.afternoon}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="font-bold text-purple-300 block mb-1">🌙 Evening</span>
                        <p>{day.evening}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Route & Tips Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-3xl border border-white/10">
                <h5 className="font-display font-bold text-base text-white mb-3 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Transit & Navigation Route</span>
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {generatedItinerary.recommendedTransport}
                </p>
                <div className="p-3 rounded-2xl bg-white/5 text-xs text-slate-400">
                  <span>Weather Forecast: {generatedItinerary.weatherForecast}</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-white/10">
                <h5 className="font-display font-bold text-base text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Curated Local Travel Tips</span>
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  {generatedItinerary.safetyTips?.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

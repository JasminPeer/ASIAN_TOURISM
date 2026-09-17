import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

const PassportContext = createContext(null);

export const PassportProvider = ({ children }) => {
  const { user, updateUserLocal, isAuthenticated } = useAuth();
  const [stamps, setStamps] = useState(['IN', 'JP']); // default initial explored stamps
  const [xp, setXp] = useState(250);
  const [badges, setBadges] = useState(['badge-asia-explorer']);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [unlockedCelebration, setUnlockedCelebration] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.passportStamps?.length) setStamps(user.passportStamps);
      if (user.xp !== undefined) setXp(user.xp);
      if (user.unlockedBadges?.length) setBadges(user.unlockedBadges);
    }
  }, [user]);

  const triggerCelebration = (title, message, icon = '🎉') => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setUnlockedCelebration({ title, message, icon });
    setTimeout(() => {
      setUnlockedCelebration(null);
    }, 4500);
  };

  const stampCountry = async (countryCode, countryName) => {
    const code = countryCode.toUpperCase();
    if (stamps.includes(code)) return false;

    if (isAuthenticated) {
      try {
        const res = await api.stampPassport(code);
        if (res?.passportStamps) {
          setStamps(res.passportStamps);
          setXp(res.xp);
          setBadges(res.unlockedBadges);
          updateUserLocal({
            passportStamps: res.passportStamps,
            xp: res.xp,
            unlockedBadges: res.unlockedBadges
          });
          if (res.newBadgeUnlocked) {
            triggerCelebration(
              `Badge Unlocked: ${res.newBadgeUnlocked.name}!`,
              res.newBadgeUnlocked.description,
              res.newBadgeUnlocked.icon
            );
          } else {
            triggerCelebration(
              `Passport Stamped: ${countryName || code}!`,
              `+50 XP added to your Travel Passport`,
              '✈️'
            );
          }
          return true;
        }
      } catch (err) {
        console.error("Stamp passport failed:", err);
      }
    }

    // Local guest fallback
    const newStamps = [...stamps, code];
    const newXp = xp + 50;
    setStamps(newStamps);
    setXp(newXp);
    triggerCelebration(
      `Passport Stamped: ${countryName || code}!`,
      `+50 XP added to your Travel Passport`,
      '✈️'
    );
    return true;
  };

  const addXp = (points, reason = "Exploration") => {
    const newXp = xp + points;
    setXp(newXp);
    triggerCelebration(`+${points} XP Earned!`, reason, '✨');
  };

  return (
    <PassportContext.Provider value={{
      stamps,
      xp,
      badges,
      isPassportOpen,
      setIsPassportOpen,
      stampCountry,
      addXp,
      unlockedCelebration,
      triggerCelebration
    }}>
      {children}
    </PassportContext.Provider>
  );
};

export const usePassport = () => useContext(PassportContext);

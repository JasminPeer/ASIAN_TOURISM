import express from 'express';
import { askLunaAI, generatePersonalizedItinerary, replanTripForWeather } from '../services/aiService.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Ask Luna AI Assistant
router.post('/chat', optionalAuth, async (req, res) => {
  const { message, context } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'A prompt or message is required' });
  }

  try {
    const response = await askLunaAI(message, context);
    res.json({ reply: response });
  } catch (err) {
    res.status(500).json({ message: 'AI processing error', error: err.message });
  }
});

// Generate Personalized Trip Plan
router.post('/plan-trip', optionalAuth, async (req, res) => {
  try {
    const itinerary = await generatePersonalizedItinerary(req.body);
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Itinerary generation error', error: err.message });
  }
});

// Weather-Aware Dynamic Trip Replanning
router.post('/replan-trip', optionalAuth, async (req, res) => {
  try {
    const { tripPlan, weatherAlert } = req.body;
    if (!tripPlan) {
      return res.status(400).json({ message: 'Existing tripPlan object is required for replanning' });
    }
    const replanned = await replanTripForWeather(tripPlan, weatherAlert);
    res.json(replanned);
  } catch (err) {
    res.status(500).json({ message: 'Trip replanning error', error: err.message });
  }
});

export default router;

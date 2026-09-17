import express from 'express';
import { store } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user trips
router.get('/', authenticate, (req, res) => {
  const trips = store.find('trips', t => t.userId === req.user.id);
  res.json(trips);
});

// Save new trip
router.post('/', authenticate, (req, res) => {
  const { title, destination, duration, itinerary, estimatedBudget, season } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Trip title is required' });
  }

  const newTrip = store.insertOne('trips', {
    userId: req.user.id,
    title,
    destination,
    duration,
    itinerary,
    estimatedBudget,
    season,
    stops: req.body.stops || []
  });

  // Award XP for trip creation
  let updatedUser = req.user;
  const newXp = (req.user.xp || 0) + 100;
  const badges = req.user.unlockedBadges || [];
  if (!badges.includes('badge-master-planner')) {
    badges.push('badge-master-planner');
  }

  store.updateOne('users', u => u.id === req.user.id, {
    xp: newXp,
    unlockedBadges: badges
  });

  res.status(201).json({
    trip: newTrip,
    xpAwarded: 100,
    newXp
  });
});

// Delete trip
router.delete('/:id', authenticate, (req, res) => {
  const trip = store.findOne('trips', t => t.id === req.params.id);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  if (trip.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  store.deleteOne('trips', t => t.id === req.params.id);
  res.json({ message: 'Trip removed successfully' });
});

export default router;

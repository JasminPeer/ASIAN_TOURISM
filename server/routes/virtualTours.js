import express from 'express';
import { store } from '../data/store.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all virtual tours
router.get('/', (req, res) => {
  const tours = store.find('virtualTours');
  res.json(tours);
});

// Get tour by ID
router.get('/:id', (req, res) => {
  const tour = store.findOne('virtualTours', vt => vt.id === req.params.id);
  if (!tour) {
    return res.status(404).json({ message: 'Virtual tour not found' });
  }

  const heritage = store.findOne('heritage', h => h.id === tour.heritageId);
  res.json({
    ...tour,
    heritage
  });
});

// Admin: Add virtual tour
router.post('/', authenticate, requireAdmin, (req, res) => {
  const { title, heritageId, locationName, panoramaUrl, audioGuideText, hotspots } = req.body;
  if (!title || !panoramaUrl) {
    return res.status(400).json({ message: 'Title and panoramaUrl are required' });
  }

  const newTour = store.insertOne('virtualTours', {
    ...req.body,
    id: req.body.id || `tour-${Date.now()}`
  });

  res.status(201).json(newTour);
});

export default router;

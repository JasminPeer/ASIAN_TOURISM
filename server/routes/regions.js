import express from 'express';
import { store } from '../data/store.js';

const router = express.Router();

// Get regions (optionally by country)
router.get('/', (req, res) => {
  const { country, countryCode } = req.query;
  let regions = store.find('regions');

  if (countryCode) {
    regions = regions.filter(r => r.countryCode?.toLowerCase() === countryCode.toLowerCase());
  } else if (country) {
    regions = regions.filter(r => r.countryId?.toLowerCase() === country.toLowerCase());
  }

  res.json(regions);
});

// Get single region with its destinations
router.get('/:id', (req, res) => {
  const region = store.findOne('regions', r => r.id === req.params.id);
  if (!region) {
    return res.status(404).json({ message: 'Region not found' });
  }

  const destinations = store.find('destinations', d => d.regionId === region.id);
  res.json({
    ...region,
    destinations
  });
});

export default router;

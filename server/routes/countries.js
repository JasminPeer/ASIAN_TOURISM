import express from 'express';
import { store } from '../data/store.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all countries
router.get('/', (req, res) => {
  const { region, search } = req.query;
  let countries = store.find('countries');

  if (region && region !== 'All') {
    countries = countries.filter(c => c.continentRegion?.toLowerCase() === region.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    countries = countries.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.capital.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  }

  res.json(countries);
});

// Get country by code or id
router.get('/:identifier', (req, res) => {
  const { identifier } = req.params;
  const country = store.findOne('countries', c => 
    c.id.toLowerCase() === identifier.toLowerCase() || 
    c.code.toLowerCase() === identifier.toLowerCase()
  );

  if (!country) {
    return res.status(404).json({ message: 'Country not found' });
  }

  // Also attach regions and destinations for this country
  const regions = store.find('regions', r => r.countryCode === country.code);
  const destinations = store.find('destinations', d => d.countryCode === country.code);
  const heritage = store.find('heritage', h => h.countryCode === country.code);

  res.json({
    ...country,
    regions,
    destinations,
    heritage
  });
});

// Admin: Add country
router.post('/', authenticate, requireAdmin, (req, res) => {
  const { name, code, capital, continentRegion, description, heroMedia, coordinates, bestSeason, currency, languages } = req.body;
  if (!name || !code) {
    return res.status(400).json({ message: 'Country name and code are required' });
  }

  const newCountry = store.insertOne('countries', {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    code: code.toUpperCase(),
    capital: capital || 'Capital',
    continentRegion: continentRegion || 'South Asia',
    description: description || '',
    heroMedia: heroMedia || { type: 'image', url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80' },
    coordinates: coordinates || [20, 80],
    bestSeason: bestSeason || 'October to March',
    currency: currency || 'USD',
    languages: languages || ['English'],
    heritageCount: 0,
    popularActivities: ['Sightseeing', 'Cultural Tours'],
    estimatedDailyBudget: '$40 - $120 / day',
    journeyScore: 90
  });

  res.status(201).json(newCountry);
});

// Admin: Update country
router.put('/:id', authenticate, requireAdmin, (req, res) => {
  const updated = store.updateOne('countries', c => c.id === req.params.id || c.code === req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Country not found' });
  res.json(updated);
});

// Admin: Delete country
router.delete('/:id', authenticate, requireAdmin, (req, res) => {
  const deleted = store.deleteOne('countries', c => c.id === req.params.id || c.code === req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Country not found' });
  res.json({ message: 'Country deleted successfully' });
});

export default router;

import express from 'express';
import { store } from '../data/store.js';
import { getDestinationWeather } from '../services/weatherService.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get month-based smart recommendations (Category A & B)
router.get('/recommendations', (req, res) => {
  const { month } = req.query;
  const allMonthly = store.data.monthlyRecommendations || {};
  if (month) {
    const mKey = month.toLowerCase().trim();
    const data = allMonthly[mKey] || Object.values(allMonthly).find(item => item.month?.toLowerCase() === mKey);
    return res.json(data || { month, categoryA: [], categoryB: [] });
  }
  res.json(allMonthly);
});

// Get all destinations with query filters
router.get('/', (req, res) => {
  const { category, country, region, isHiddenGem, search, month, crowd, budgetTier } = req.query;
  let destinations = store.find('destinations');

  if (category && category !== 'All') {
    destinations = destinations.filter(d => d.category?.toLowerCase() === category.toLowerCase());
  }

  if (country) {
    destinations = destinations.filter(d => 
      d.countryCode?.toLowerCase() === country.toLowerCase() ||
      d.country?.toLowerCase() === country.toLowerCase()
    );
  }

  if (region) {
    destinations = destinations.filter(d => d.regionId === region);
  }

  if (isHiddenGem === 'true') {
    destinations = destinations.filter(d => d.isHiddenGem === true);
  }

  if (month) {
    const mPrefix = month.slice(0, 3).toLowerCase();
    destinations = destinations.filter(d => {
      const monthData = d.weatherByMonth?.find(w => w.month.toLowerCase().startsWith(mPrefix));
      return monthData ? monthData.recommended : true;
    });
  }

  if (crowd) {
    const cLow = crowd.toLowerCase();
    destinations = destinations.filter(d => {
      const level = (d.crowdPrediction?.level || '').toLowerCase();
      return level.includes(cLow);
    });
  }

  if (budgetTier) {
    const bLow = budgetTier.toLowerCase();
    if (bLow.includes('budget') || bLow.includes('low')) {
      destinations = destinations.filter(d => (d.estimatedBudget?.budget || '').includes('$2') || (d.estimatedBudget?.budget || '').includes('$3'));
    }
  }

  if (search) {
    const q = search.toLowerCase();
    destinations = destinations.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.regionName?.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.category?.toLowerCase().includes(q)
    );
  }

  res.json(destinations);
});

// Get destination by ID with live weather intelligence
router.get('/:id', async (req, res) => {
  const destination = store.findOne('destinations', d => d.id === req.params.id);
  if (!destination) {
    return res.status(404).json({ message: 'Destination not found' });
  }

  // Fetch real-time / seasonal weather
  const [lat, lng] = destination.coordinates || [20, 78];
  const liveWeather = await getDestinationWeather(lat, lng, destination.name);

  // Link heritage site if any
  const heritage = store.findOne('heritage', h => h.destinationId === destination.id);
  // Link virtual tour if any
  const virtualTour = store.findOne('virtualTours', vt => vt.id === destination.virtualTourId);
  // Nearby attractions in same region/country
  const nearby = store.find('destinations', d => d.id !== destination.id && d.countryCode === destination.countryCode).slice(0, 3);

  res.json({
    ...destination,
    liveWeather,
    heritage,
    virtualTour,
    nearby
  });
});

// Admin: Create destination
router.post('/', authenticate, requireAdmin, (req, res) => {
  const { name, country, countryCode, regionId, regionName, category, description, coordinates } = req.body;
  if (!name || !country || !countryCode) {
    return res.status(400).json({ message: 'Destination name and country are required' });
  }

  const newDest = store.insertOne('destinations', {
    ...req.body,
    id: req.body.id || name.toLowerCase().replace(/\s+/g, '-'),
    journeyScore: req.body.journeyScore || {
      total: 92,
      weather: 88,
      heritage: 90,
      culture: 92,
      accessibility: 85,
      budget: 88
    },
    crowdPrediction: req.body.crowdPrediction || {
      level: 'Moderate Crowd',
      statusColor: 'text-amber-400',
      score: 50,
      factors: 'Standard seasonal travel patterns'
    }
  });

  res.status(201).json(newDest);
});

// Admin: Update destination
router.put('/:id', authenticate, requireAdmin, (req, res) => {
  const updated = store.updateOne('destinations', d => d.id === req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Destination not found' });
  res.json(updated);
});

// Admin: Delete destination
router.delete('/:id', authenticate, requireAdmin, (req, res) => {
  const deleted = store.deleteOne('destinations', d => d.id === req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Destination not found' });
  res.json({ message: 'Destination deleted successfully' });
});

export default router;

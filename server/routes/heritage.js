import express from 'express';
import { store } from '../data/store.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get historical eras metadata with monument counts
router.get('/eras', (req, res) => {
  const eras = store.getCollection('historicalEras') || [];
  const heritage = store.find('heritage');

  const enrichedEras = eras.map(era => {
    const eraId = era.id.toLowerCase();
    const eraSpace = eraId.replace(/-/g, ' ');
    const count = heritage.filter(h => {
      const p = (h.period || '').toLowerCase();
      const e = (h.era || '').toLowerCase();
      const he = (h.historicalEra || '').toLowerCase();
      return p.includes(eraId) || p.includes(eraSpace) || 
             e.includes(eraId) || e.includes(eraSpace) || 
             he.includes(eraId) || he.includes(eraSpace) || 
             (eraId === 'ancient' && (p.includes('bc') || p.includes('bce') || p.includes('3rd') || p.includes('ancient')));
    }).length;
    return { ...era, count };
  });

  res.json(enrichedEras);
});

// Get all heritage sites with era filters
router.get('/', (req, res) => {
  const { period, era, country, unesco, search } = req.query;
  let heritage = store.find('heritage');

  if (period || era) {
    const filterEra = (period || era).toLowerCase();
    const filterSpace = filterEra.replace(/-/g, ' ');
    heritage = heritage.filter(h => {
      const p = (h.period || '').toLowerCase();
      const e = (h.era || '').toLowerCase();
      const he = (h.historicalEra || '').toLowerCase();
      return p.includes(filterEra) || p.includes(filterSpace) ||
             e.includes(filterEra) || e.includes(filterSpace) ||
             he.includes(filterEra) || he.includes(filterSpace);
    });
  }

  if (country) {
    heritage = heritage.filter(h => 
      h.countryCode?.toLowerCase() === country.toLowerCase() ||
      h.country?.toLowerCase() === country.toLowerCase()
    );
  }

  if (unesco === 'true') {
    heritage = heritage.filter(h => h.unesco === true);
  }

  if (search) {
    const q = search.toLowerCase();
    heritage = heritage.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.location?.toLowerCase().includes(q) ||
      h.architecture?.toLowerCase().includes(q) ||
      h.significance?.toLowerCase().includes(q)
    );
  }

  res.json(heritage);
});

// Get heritage site by ID
router.get('/:id', (req, res) => {
  const item = store.findOne('heritage', h => h.id === req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Heritage site not found' });
  }

  const destination = store.findOne('destinations', d => d.id === item.destinationId);
  const virtualTour = store.findOne('virtualTours', vt => vt.heritageId === item.id);

  res.json({
    ...item,
    destination,
    virtualTour
  });
});

// Admin: Add heritage site
router.post('/', authenticate, requireAdmin, (req, res) => {
  const { name, country, period, architecture, significance } = req.body;
  if (!name || !country) {
    return res.status(400).json({ message: 'Name and country are required' });
  }

  const newHeritage = store.insertOne('heritage', {
    ...req.body,
    id: req.body.id || name.toLowerCase().replace(/\s+/g, '-')
  });

  res.status(201).json(newHeritage);
});

// Admin: Update heritage site
router.put('/:id', authenticate, requireAdmin, (req, res) => {
  const updated = store.updateOne('heritage', h => h.id === req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Heritage site not found' });
  res.json(updated);
});

// Admin: Delete heritage site
router.delete('/:id', authenticate, requireAdmin, (req, res) => {
  const deleted = store.deleteOne('heritage', h => h.id === req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Heritage site not found' });
  res.json({ message: 'Heritage site deleted' });
});

export default router;

import express from 'express';
import { store } from '../data/store.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get Admin Analytics
router.get('/stats', authenticate, requireAdmin, (req, res) => {
  const countries = store.find('countries');
  const destinations = store.find('destinations');
  const heritage = store.find('heritage');
  const virtualTours = store.find('virtualTours');
  const users = store.find('users');
  const trips = store.find('trips');

  // Distribution by Region
  const regionBreakdown = countries.reduce((acc, c) => {
    const reg = c.continentRegion || 'Other';
    acc[reg] = (acc[reg] || 0) + 1;
    return acc;
  }, {});

  const regionChartData = Object.entries(regionBreakdown).map(([name, count]) => ({
    name,
    count
  }));

  // Category Breakdown
  const categoryBreakdown = destinations.reduce((acc, d) => {
    const cat = d.category || 'Culture';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryBreakdown).map(([category, count]) => ({
    category,
    count
  }));

  // Historical Era Breakdown
  const eraBreakdown = heritage.reduce((acc, h) => {
    const era = h.period || 'Classical Era';
    acc[era] = (acc[era] || 0) + 1;
    return acc;
  }, {});

  const eraChartData = Object.entries(eraBreakdown).map(([era, count]) => ({
    era,
    count
  }));

  res.json({
    totals: {
      countries: countries.length,
      destinations: destinations.length,
      heritageSites: heritage.length,
      virtualTours: virtualTours.length,
      registeredUsers: users.length,
      savedTrips: trips.length
    },
    charts: {
      regionChartData,
      categoryChartData,
      eraChartData
    }
  });
});

export default router;

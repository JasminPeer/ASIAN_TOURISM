import express from 'express';
import { getDestinationWeather } from '../services/weatherService.js';

const router = express.Router();

// Get live weather for coordinates
router.get('/', async (req, res) => {
  const { lat = 20, lng = 78, name = "Asia Destination" } = req.query;
  try {
    const weather = await getDestinationWeather(parseFloat(lat), parseFloat(lng), name);
    res.json(weather);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving weather', error: err.message });
  }
});

export default router;

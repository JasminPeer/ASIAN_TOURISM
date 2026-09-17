import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Route imports
import countriesRoutes from './routes/countries.js';
import destinationsRoutes from './routes/destinations.js';
import regionsRoutes from './routes/regions.js';
import heritageRoutes from './routes/heritage.js';
import virtualToursRoutes from './routes/virtualTours.js';
import tripsRoutes from './routes/trips.js';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import adminRoutes from './routes/admin.js';
import weatherRoutes from './routes/weather.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/countries', countriesRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use('/api/regions', regionsRoutes);
app.use('/api/heritage', heritageRoutes);
app.use('/api/virtual-tours', virtualToursRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/weather', weatherRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'ASIA EXPLORA — Smart Tourism Information & Heritage Management',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 ASIA EXPLORA Backend running on http://localhost:${PORT}`);
  });
};

startServer();

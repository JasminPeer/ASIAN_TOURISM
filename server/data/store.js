import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  countriesData,
  regionsData,
  destinationsData,
  heritageSitesData,
  virtualToursData,
  historicalErasData,
  monthlyRecommendations,
  gamificationBadges
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, 'defaultStore.json');

// In-Memory & File-backed Store for zero-setup resilience
class MemoryDataStore {
  constructor() {
    this.data = {
      countries: [...countriesData],
      regions: [...regionsData],
      destinations: [...destinationsData],
      heritage: [...heritageSitesData],
      virtualTours: [...virtualToursData],
      historicalEras: [...historicalErasData],
      monthlyRecommendations: { ...monthlyRecommendations },
      badges: [...gamificationBadges],
      users: [
        {
          id: "admin-1",
          name: "Asia Explora Admin",
          email: "admin@asiaexplora.com",
          passwordHash: "$2a$10$wT0l0.7C1sCqfVb2vW9.1e92d7GzZlB9C0h8R0W1y.T4a7C2sCqfV", // "admin123"
          role: "admin",
          xp: 1250,
          passportStamps: ["IN", "JP", "KH"],
          unlockedBadges: ["badge-asia-explorer", "badge-heritage-hunter"],
          savedTrips: []
        }
      ],
      trips: []
    };
    this.loadFromFile();
  }

  loadFromFile() {
    try {
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        // Retain user dynamic state (users, trips) while ensuring catalog collections have latest seed entries
        this.data = {
          ...this.data,
          ...parsed,
          countries: [...countriesData],
          regions: [...regionsData],
          destinations: [...destinationsData],
          heritage: [...heritageSitesData],
          virtualTours: [...virtualToursData],
          historicalEras: [...historicalErasData],
          monthlyRecommendations: { ...monthlyRecommendations },
          badges: [...gamificationBadges],
          users: parsed.users?.length ? parsed.users : this.data.users,
          trips: parsed.trips || []
        };
      } else {
        this.saveToFile();
      }
    } catch (err) {
      console.warn("Store file read error, using in-memory default seed data:", err.message);
    }
  }

  saveToFile() {
    try {
      fs.writeFileSync(STORE_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error("Store file write error:", err.message);
    }
  }

  // Generic helpers
  getCollection(name) {
    if (!this.data[name]) this.data[name] = [];
    return this.data[name];
  }

  find(collectionName, filterFn = () => true) {
    return this.getCollection(collectionName).filter(filterFn);
  }

  findOne(collectionName, filterFn) {
    return this.getCollection(collectionName).find(filterFn) || null;
  }

  insertOne(collectionName, item) {
    const collection = this.getCollection(collectionName);
    const newItem = {
      ...item,
      id: item.id || `${collectionName.slice(0, 3)}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString()
    };
    collection.push(newItem);
    this.saveToFile();
    return newItem;
  }

  updateOne(collectionName, filterFn, updates) {
    const collection = this.getCollection(collectionName);
    const index = collection.findIndex(filterFn);
    if (index !== -1) {
      collection[index] = { ...collection[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveToFile();
      return collection[index];
    }
    return null;
  }

  deleteOne(collectionName, filterFn) {
    const collection = this.getCollection(collectionName);
    const initialLen = collection.length;
    this.data[collectionName] = collection.filter(item => !filterFn(item));
    const deleted = this.data[collectionName].length < initialLen;
    if (deleted) this.saveToFile();
    return deleted;
  }
}

export const store = new MemoryDataStore();

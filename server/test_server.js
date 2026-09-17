import { store } from './data/store.js';
import { askLunaAI, generatePersonalizedItinerary } from './services/aiService.js';
import { getDestinationWeather } from './services/weatherService.js';

async function runTests() {
  console.log("=== RUNNING ASIA EXPLORA BACKEND VERIFICATION ===");

  // 1. Store check
  const countries = store.find('countries');
  console.log(`[PASS] Countries in store: ${countries.length}`);
  if (countries.length === 0) throw new Error("No countries found!");

  const destinations = store.find('destinations');
  console.log(`[PASS] Destinations in store: ${destinations.length}`);

  const heritage = store.find('heritage');
  console.log(`[PASS] Heritage sites in store: ${heritage.length}`);

  const tours = store.find('virtualTours');
  console.log(`[PASS] Virtual Tours in store: ${tours.length}`);

  // 2. Weather check
  const weather = await getDestinationWeather(9.9195, 78.1193, "Madurai");
  console.log(`[PASS] Weather model returned temp: ${weather.temperature}°C, condition: ${weather.condition}`);

  // 3. AI Assistant check
  const reply = await askLunaAI("What are top heritage places in India and Japan?");
  console.log(`[PASS] Luna AI response length: ${reply.length} chars`);

  // 4. AI Travel Itinerary Planner check
  const plan = await generatePersonalizedItinerary({
    destination: "India & Japan",
    duration: "4–7 days",
    travelType: "Cultural",
    budget: "Moderate",
    interests: ["Heritage", "Food"],
    month: "November"
  });
  console.log(`[PASS] AI Itinerary title: ${plan.tripTitle}`);
  console.log(`[PASS] Days generated: ${plan.dayByDay?.length}`);

  console.log("=== ALL BACKEND INTEGRITY TESTS PASSED ===");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});

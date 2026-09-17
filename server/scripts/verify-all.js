// Comprehensive Verification Script for Asia Explora
const runVerification = async () => {
  const BASE_URL = 'http://localhost:5000/api';
  console.log('=== STARTING ASIA EXPLORA FULL-STACK VERIFICATION ===\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName, extraInfo = '') => {
    if (condition) {
      console.log(`[PASS] ${testName} ${extraInfo}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} ${extraInfo}`);
      failed++;
    }
  };

  try {
    // 1. All 48 Asian Countries
    const countriesRes = await fetch(`${BASE_URL}/countries`);
    const countries = await countriesRes.json();
    assert(Array.isArray(countries) && countries.length >= 48, 
      `All Asian Countries in Database: Expected >= 48, Found: ${countries.length}`);

    // 2. Tamil Nadu Region and Destinations
    const tnDestRes = await fetch(`${BASE_URL}/destinations?region=tamil-nadu`);
    const tnDestinations = await tnDestRes.json();
    assert(tnDestinations.length === 8, 
      `Tamil Nadu 8 Major Destinations: Expected 8, Found: ${tnDestinations.length}`,
      `(${tnDestinations.map(d => d.id).join(', ')})`);

    // 3. Destination Detail with 25 Parameters
    const destDetailRes = await fetch(`${BASE_URL}/destinations/madurai`);
    const destDetail = await destDetailRes.json();
    assert(destDetail.id === 'madurai', `Destination Detail Endpoint (/destinations/madurai)`);
    assert(destDetail.localGuide?.nearbyHotels?.length >= 2, `Local Guide Nearby Hotels: Found ${destDetail.localGuide?.nearbyHotels?.length}`);
    assert(destDetail.localGuide?.nearbyRestaurants?.length >= 2, `Local Guide Nearby Restaurants: Found ${destDetail.localGuide?.nearbyRestaurants?.length}`);
    assert(destDetail.transportComparison?.length >= 3, `Multi-Modal Transport Comparison: Found ${destDetail.transportComparison?.length} modes`);
    assert(destDetail.weatherByMonth?.length === 12, `12-Month Climate Profile: Found ${destDetail.weatherByMonth?.length} months`);
    assert(destDetail.crowdPrediction && destDetail.crowdPrediction.level, `Crowd Prediction Metric: ${destDetail.crowdPrediction?.level}`);

    // 4. Historical Eras API
    const erasRes = await fetch(`${BASE_URL}/heritage/eras`);
    const eras = await erasRes.json();
    assert(Array.isArray(eras) && eras.length === 5, 
      `Chronological Historical Eras: Expected 5 epochs, Found: ${eras.length}`,
      `(${eras.map(e => `${e.id} [${e.count} sites]`).join(', ')})`);

    // 5. Month-Based Recommendations (Category A & B)
    const recRes = await fetch(`${BASE_URL}/destinations/recommendations?month=November`);
    const recData = await recRes.json();
    assert(recData.categoryA?.length > 0, `Category A (Best Weather & Low Crowd) in November: Found ${recData.categoryA?.length}`);
    assert(recData.categoryB?.length > 0, `Category B (Festivals & Living Traditions) in November: Found ${recData.categoryB?.length}`);

    // 6. Dynamic Weather-Aware Itinerary Replanning
    const sampleTrip = {
      tripTitle: "6-Day Cultural Odyssey in Tamil Nadu",
      destination: "India",
      travelMonth: "November",
      dayByDay: [
        { day: 1, title: "Outdoor temple courtyards & scenic lake stroll", morning: "Outdoor temple courtyards", afternoon: "Lake walk", evening: "Open food stalls" },
        { day: 2, title: "Open-air river cruise", morning: "Boat ride", afternoon: "Open hilltop trek", evening: "Night market" }
      ]
    };
    const replanRes = await fetch(`${BASE_URL}/ai/replan-trip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tripPlan: sampleTrip,
        weatherAlert: {
          condition: "Severe Monsoon & Flash Flood Alert",
          advisory: "Outdoor temple courtyards and open boat cruises are compromised."
        }
      })
    });
    const replanned = await replanRes.json();
    assert(replanned.replanned === true, `AI Dynamic Weather Replanning Status: replanned = true`);
    assert(replanned.changesSummary?.length > 0, `AI Weather-Aware Changes Summary Generated: ${replanned.changesSummary?.length} items`);
    assert(replanned.dayByDay?.[0]?.morning?.includes('[WEATHER SHIFT]'), `Outdoor Morning Shifted to Sheltered Sanctuaries`);

    // 7. Scalable Virtual Tours
    const vtRes = await fetch(`${BASE_URL}/virtual-tours`);
    const tours = await vtRes.json();
    assert(Array.isArray(tours) && tours.length >= 7, 
      `360° Virtual Tours Catalog: Expected >= 7, Found: ${tours.length}`,
      `(${tours.map(t => t.id).join(', ')})`);

    console.log(`\n=== VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED ===\n`);
    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("Verification execution error:", err);
    process.exit(1);
  }
};

runVerification();

export const getDestinationWeather = async (lat, lng, destinationName = "Asia Destination") => {
  const apiKey = process.env.WEATHER_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`);
      if (res.ok) {
        const data = await res.json();
        return {
          source: "live",
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          condition: data.weather[0]?.main || "Clear",
          description: data.weather[0]?.description || "Partly Cloudy",
          windSpeed: `${data.wind.speed} m/s`,
          uvIndex: 6,
          rainProb: 15
        };
      }
    } catch (err) {
      console.warn("Weather API fetch error, utilizing fallback weather model:", err.message);
    }
  }

  // Realistic seasonal weather calculation based on coordinates & month
  const currentMonth = new Date().getMonth(); // 0 to 11
  const isWinter = currentMonth >= 10 || currentMonth <= 1;
  const isMonsoon = currentMonth >= 5 && currentMonth <= 8;

  let temp = 27;
  let condition = "Sunny & Clear";
  let rainProb = 12;
  let humidity = 58;

  if (lat > 30) {
    // East Asia / High latitude
    temp = isWinter ? 6 : isMonsoon ? 29 : 19;
    condition = isWinter ? "Crisp & Chilly" : isMonsoon ? "Humid & Occasional Showers" : "Pleasant & Clear";
    rainProb = isMonsoon ? 55 : 15;
  } else if (lat < 10) {
    // Tropical equatorial
    temp = 29;
    condition = isMonsoon ? "Tropical Refreshing Showers" : "Tropical Warmth & Sun";
    rainProb = isMonsoon ? 45 : 20;
    humidity = 75;
  } else {
    // Subtropical (India, Southeast Asia inland)
    temp = isWinter ? 24 : isMonsoon ? 32 : 30;
    condition = isWinter ? "Golden Sunshine & Gentle Breeze" : isMonsoon ? "Monsoon Greenery" : "Warm & Sunny";
    rainProb = isMonsoon ? 60 : 10;
  }

  return {
    source: "seasonal_model",
    temperature: temp,
    feelsLike: temp + 1,
    humidity,
    condition,
    description: `Optimal visiting climate for ${destinationName}`,
    windSpeed: "12 km/h",
    uvIndex: 7,
    rainProb
  };
};

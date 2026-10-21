// Google Maps, Street View & Geocoding configuration for ASIA EXPLORA

export const GOOGLE_MAPS_API_KEY = 
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDDpiS7WxEJGfQuj-Cmip6lZfgyBxPLJYw';

export const GOOGLE_STREETVIEW_API_KEY = 
  import.meta.env.VITE_GOOGLE_STREETVIEW_API_KEY || 'AIzaSyCuTt7lTX8C6GgYcAq-bHm8NdH1V2ket9g';

export const GOOGLE_GEOCODING_API_KEY = 
  import.meta.env.VITE_GOOGLE_GEOCODING_API_KEY || 'AIzaSyB5QgS2nhvUQt-xDLo9V6hseAyvsyXvDg0';

/**
 * Returns a high-res Google Street View Embed iframe URL
 */
export const getStreetViewEmbedUrl = (lat, lng, heading = 165, pitch = 10, fov = 85) => {
  return `https://www.google.com/maps/embed/v1/streetview?key=${GOOGLE_STREETVIEW_API_KEY}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
};

/**
 * Returns a Google Maps directions route URL with waypoints (Trail / Way mode)
 */
export const getGoogleRouteEmbedUrl = (origin, destination, waypoints = []) => {
  const originStr = `${origin[0]},${origin[1]}`;
  const destStr = `${destination[0]},${destination[1]}`;
  const wpParam = waypoints.length > 0 
    ? `&waypoints=${waypoints.map(w => `${w[0]},${w[1]}`).join('|')}` 
    : '';
  return `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${originStr}&destination=${destStr}${wpParam}&mode=walking`;
};

/**
 * Returns a Google Maps Place Embed URL
 */
export const getGooglePlaceEmbedUrl = (lat, lng, zoom = 15) => {
  return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=${zoom}`;
};

/**
 * Dynamically loads Google Maps JavaScript SDK if not already present
 */
export const loadGoogleMapsSdk = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    const existingScript = document.getElementById('google-maps-sdk');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google.maps));
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-sdk';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};

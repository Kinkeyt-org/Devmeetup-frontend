import { useState, useEffect } from "react";

//grabbing the user's gps coordinates 
export const useLocation = () => {
  const [location, setLocation] = useState({
    coords: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // If the browser is super old and doesn't support geolocation, I bail early.
    if (!navigator.geolocation) {
      setLocation({
        coords: null,
        loading: false,
        error: "Geolocation is not supported by your browser",
      });
      return;
    }

    const handleSuccess = (position) => {
      // I'm logging this so I can see lat and long in the console during dev.
      console.log("User location captured:", position.coords.latitude, position.coords.longitude);
      
      setLocation({
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        loading: false,
        error: null,
      });
    };

    const handleError = (error) => {
      // If they click 'Block' or it times out, I handle it here.
      console.warn("Geolocation error:", error.message);
      setLocation({
        coords: null,
        loading: false,
        error: error.message,
      });
    };

    // This actually triggers the browser popup asking for permission.
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 300000,
    });
  }, []);

  return location;
};

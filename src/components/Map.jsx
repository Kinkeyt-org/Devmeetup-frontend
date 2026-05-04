import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set Mapbox access token from environment variables
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

//connects react to mapbox and renders the map
const Map = ({ events = [], userLocation = null }) => {

  // Ref to the DOM node where Mapbox will render the map
  const mapContainer = useRef(null);

  // Ref to store the actual Mapbox instance (so it persists across renders)
  const map = useRef(null);

  //runs once to initialise the map once it is ready
  useEffect(() => {
    //if map already exists → do nothing (prevents re-initialization)
    if (map.current) return;

    const isDark = document.documentElement.classList.contains("dark");

    let initialCenter = [0, 0];
    let initialZoom = 1;

    if (userLocation) {
      initialCenter = [userLocation.lng, userLocation.lat];
      initialZoom = 12;
    } else if (events.length > 0 && events[0].lat && events[0].lng) {
      initialCenter = [events[0].lng, events[0].lat];
      initialZoom = 12;
    }

    //creates a new mapbox instance and stores it in ref
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // DOM element to mount map
      style: isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11", //map theme
      center: initialCenter,
      zoom: initialZoom,
    });

    // Add zoom + rotation controls (top-right corner)
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    // Watch for theme changes (dark/light mode toggle)
    const observer = new MutationObserver(() => {
      const darkEnabled = document.documentElement.classList.contains("dark");
      if (map.current) {
        map.current.setStyle(darkEnabled ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11");
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, [userLocation, events]); // Runs on mount + when userLocation/events change

  //updates map with events when it is ready 
  useEffect(() => {
    // If map not ready OR no events → stop
    if (!map.current || !events.length) return;

    //loops through events and adds markers
    events.forEach((event) => {
      // Only render marker if coordinates exist
      if (event.lat && event.lng) {

        // Create popup content for this event
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${event.title}</h3><p>${event.location}</p>`
        );

        // Create marker → set position → attach popup → add to map
        new mapboxgl.Marker({ color: "#f59e0b" })
          .setLngLat([event.lng, event.lat]) // [lng, lat] is Mapbox format
          .setPopup(popup)
          .addTo(map.current);
      }
    });

    //Adds user location marker (if available)
    if (userLocation) {
      new mapboxgl.Marker({ color: "#3b82f6" })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML("<h4>You are here</h4>")
        )
        .addTo(map.current);

      //Moves camera to user location
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 13,
        essential: true, // Ensures animation runs even for accessibility settings
      });
    } else if (events.length > 0 && events[0].lat && events[0].lng) {
      // If no user location, move camera to the first event
      map.current.flyTo({
        center: [events[0].lng, events[0].lat],
        zoom: 13,
        essential: true,
      });
    }
  }, [events, userLocation]); // Re-run when data changes

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
      {/* This div is where the map lives */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "../context/ThemeContext";

const EventLocationMap = ({ lat, lng, label = "Event location" }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!containerRef.current || !lat || !lng || !token) return;

    mapboxgl.accessToken = token;
    const isDark = theme === "dark";

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
      markerRef.current = null;
    }

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: isDark ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: 15,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    markerRef.current = new mapboxgl.Marker({ color: "#f59e0b" })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(label))
      .addTo(mapRef.current);

    return () => {
      markerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, label, theme]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default EventLocationMap;

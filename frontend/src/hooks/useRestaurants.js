import { useEffect, useState } from "react";
import { API } from "../utils/api";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Generic fetch (by city or lat/lng)
  const fetchRestaurants = async (query = "") => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/nearby${query}`);
      console.log("✅ Fetched restaurants:", res.data);

      setRestaurants(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch restaurants:", err);
      setError("Unable to fetch restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Detect user location and fetch nearby restaurants
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      fetchRestaurants(); // fallback
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("📍 Detected location:", latitude, longitude);

        try {
          const res = await API.get(`/nearby?lat=${latitude}&lng=${longitude}`);
          console.log("✅ Nearby data:", res.data);
          setRestaurants(res.data || []);
        } catch (err) {
          console.error("❌ Error fetching nearby restaurants:", err);
          setError("Unable to fetch nearby restaurants.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.warn("⚠️ Location denied or failed:", err);
        setError("Location access denied. Showing default results.");
        setLoading(false);
        fetchRestaurants(); // fallback to default list
      }
    );
  };

  // ✅ Auto-detect on mount (only once)
  useEffect(() => {
    detectLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    restaurants,
    loading,
    error,
    fetchRestaurants,
    detectLocation,
  };
}

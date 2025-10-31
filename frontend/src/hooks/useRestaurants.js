import { useEffect, useState } from "react";
import { API } from "../utils/api";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch restaurants by query (either city or lat/lng)
  const fetchRestaurants = async (query = "") => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get(`/nearby${query}`);
      setRestaurants(res.data || []);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);
      setError("Unable to fetch restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Detect user's current location and fetch nearby restaurants
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await API.get(`/nearby?lat=${latitude}&lng=${longitude}`);
          setRestaurants(res.data || []);
        } catch (err) {
          console.error("Error fetching nearby restaurants:", err);
          setError("Unable to fetch nearby restaurants.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Location access denied:", err);
        setError("Location access denied. Showing default results.");
        setLoading(false);
        // fallback — fetch default restaurants
        fetchRestaurants();
      }
    );
  };

  // ✅ Auto detect location on mount
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

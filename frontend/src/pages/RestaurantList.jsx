import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/api";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRestaurants = async (query = "") => {
    try {
      setLoading(true);
      const res = await API.get(`/nearby${query}`);
      setRestaurants(res.data);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchRestaurants(`?city=${city}`);
  };

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchRestaurants(`?lat=${latitude}&lng=${longitude}`);
      },
      (err) => {
        console.warn("Geolocation failed:", err);
        setLoading(false);
      }
    );
  };

  // 🟢 Fetch nearby restaurants automatically on mount
  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by City"
            className="border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 rounded">
            Search
          </button>
        </form>
        <button
          onClick={detectLocation}
          className="bg-green-500 text-white px-4 rounded"
        >
          Use My Location
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading nearby restaurants...</p>
      ) : restaurants.length === 0 ? (
        <p className="text-center text-gray-500">No restaurants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((r) => (
            <div
              key={r.id}
              onClick={() => navigate(`/restaurant/${r.id}`)}
              className="border rounded-lg shadow hover:shadow-md cursor-pointer overflow-hidden"
            >
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h2 className="font-semibold text-lg">{r.name}</h2>
                <p className="text-sm text-gray-600">{r.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

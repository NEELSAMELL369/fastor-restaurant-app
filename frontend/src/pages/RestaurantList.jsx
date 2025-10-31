import { useState } from "react";
import { MapPin } from "lucide-react";
import SearchBar from "../components/SearchBar";
import RestaurantCard from "../components/RestaurantCard";
import { useRestaurants } from "../hooks/useRestaurants";

export default function RestaurantList() {
  const [city, setCity] = useState("");
  const { restaurants, loading, fetchRestaurants, detectLocation } =
    useRestaurants();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchRestaurants(`?city=${city}`);
  };

  return (
    <div className="min-h-screen  from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 🔍 Search Bar + Location Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <SearchBar
            city={city}
            setCity={setCity}
            onSearch={handleSearch}
            loading={loading}
          />
          <button
            onClick={detectLocation}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition text-white
              ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
          >
            <MapPin className="w-5 h-5" />
            <span>{loading ? "Detecting..." : "Use My Location"}</span>
          </button>
        </div>

        {/* 🍽️ Restaurant List */}
        <div className="relative">
          {/* Grid always stays mounted */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} r={r} />
            ))}

            {/* Keep placeholders when loading */}
            {loading &&
              [...Array(6)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="bg-gray-200 rounded-2xl h-[280px] animate-pulse"
                />
              ))}
          </div>

          {/* Empty state */}
          {!loading && restaurants.length === 0 && (
            <p className="text-center text-gray-500 mt-16 text-lg">
              No restaurants found 🍽️
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { Search } from "lucide-react";

export default function SearchBar({ city, setCity, onSearch, loading }) {
  return (
    <form
      onSubmit={onSearch}
      className="flex w-full sm:w-auto items-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-indigo-200 transition"
    >
      <Search className="text-gray-500 w-5 h-5" />
      <input
        type="text"
        placeholder="Search by city..."
        className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        disabled={loading}
        className={`px-4 py-1.5 rounded-lg font-medium transition ${
          loading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

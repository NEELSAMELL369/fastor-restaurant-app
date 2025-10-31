import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "./LoadingSkeleton";

export default function RestaurantCard({ r, loading = false }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-white/80 backdrop-blur-sm border border-gray-100
                 rounded-2xl shadow-md hover:shadow-lg cursor-pointer
                 overflow-hidden transition h-[280px] flex flex-col"
      onClick={() => !loading && navigate(`/restaurant/${r.id}`)}
    >
      {/* Image section */}
      <div className="w-full h-44 bg-gray-100 overflow-hidden">
        <img
          src={r.image}
          alt={r.name}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg text-gray-800 truncate">
            {r.name}
          </h2>
          <p className="text-gray-600 text-sm">{r.city}</p>
        </div>
        <p className="text-sm text-indigo-600 mt-2 font-medium">
          {r.cuisine || "Various cuisines"}
        </p>
      </div>

      {/* Overlay shimmer */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { API } from "../utils/api";
import { toPng } from "html-to-image";
import { Share2 } from "lucide-react";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoPos, setLogoPos] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    API.get(`/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // Drag Handlers
  const handleMouseDown = (e) => {
    setDragging(true);
    const rect = logoRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const container = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - container.left - offset.x) / container.width) * 100;
    const y = ((e.clientY - container.top - offset.y) / container.height) * 100;
    setLogoPos({
      x: Math.min(90, Math.max(0, x)),
      y: Math.min(90, Math.max(0, y)),
    });
  };

  const handleMouseUp = () => setDragging(false);

  // Share logic
  const handleShare = async () => {
    if (!imageRef.current || !restaurant) return;
    try {
      const dataUrl = await toPng(imageRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${restaurant.name}.png`, {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: restaurant.name,
          text: "Check out this restaurant!",
          files: [file],
        });
      } else {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${restaurant.name}.png`;
        link.click();
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading restaurant details...
        </p>
      </div>
    );
  }

  // Not found
  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-screen  from-blue-50 to-indigo-100">
        <p className="text-gray-500 text-lg">Restaurant not found 😔</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center  from-blue-50 to-indigo-100 px-4 py-10"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 w-full max-w-md border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          {restaurant.name}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {restaurant.cuisine} • {restaurant.city}
        </p>

        {/* Image with draggable logo */}
        <div
          ref={imageRef}
          className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-200"
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
          <img
            ref={logoRef}
            src="/fastor-logo.png"
            alt="Fastor Logo"
            draggable={false}
            onMouseDown={handleMouseDown}
            className="absolute w-16 h-16 cursor-grab active:cursor-grabbing select-none transition-transform duration-100"
            style={{
              left: `${logoPos.x}%`,
              top: `${logoPos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleShare}
          className="mt-6 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all w-full"
        >
          <Share2 className="w-5 h-5" />
          Share Image
        </motion.button>

        <p className="text-center text-gray-500 text-sm mt-3">
          Drag the Fastor logo to reposition before sharing 📍
        </p>
      </motion.div>
    </div>
  );
}

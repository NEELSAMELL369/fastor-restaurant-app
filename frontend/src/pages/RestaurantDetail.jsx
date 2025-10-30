import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { API } from "../utils/api";
import { toPng } from "html-to-image";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoPos, setLogoPos] = useState({ x: 50, y: 50 }); // percentage positions
  const imageRef = useRef(null);
  const logoRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Fetch restaurant details
  useEffect(() => {
    API.get(`/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // Handle logo drag start
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

  // Handle share
  const handleShare = async () => {
    if (!imageRef.current) return;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading restaurant...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        {restaurant.name}
      </h1>

      {/* Image container with overlay */}
      <div
        ref={imageRef}
        className="relative w-full max-w-md aspect-square bg-white rounded-xl shadow overflow-hidden"
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />

        {/* ✅ Fastor logo overlay (draggable) */}
        <img
          ref={logoRef}
          src="/fastor-logo.png" // make sure this logo is in your public folder
          alt="Fastor Logo"
          className="absolute w-16 h-16 cursor-move"
          style={{
            left: `${logoPos.x}%`,
            top: `${logoPos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseDown={handleMouseDown}
          draggable={false}
        />
      </div>

      <button
        onClick={handleShare}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Share Image
      </button>

      <p className="text-gray-500 text-sm mt-2">
        (Drag the logo to reposition before sharing)
      </p>
    </div>
  );
}

export default function LoadingSkeleton({ count = 15, overlay = false }) {
  if (overlay) {
    // Overlay shimmer (used on top of real data)
    return (
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm animate-pulse rounded-2xl z-10" />
    );
  }

  // Normal placeholder grid (used before data loads)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white/70 backdrop-blur-sm h-56 rounded-xl shadow-md"
        />
      ))}
    </div>
  );
}

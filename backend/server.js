import express from "express";
import cors from "cors";

import { restaurants } from "./restaurants.js";

const app = express();
app.use(cors());

// ✅ Get nearby restaurants by city or lat/lng
app.get("/api/nearby", (req, res) => {
  const { city, lat, lng } = req.query;

  if (city) {
    const matches = restaurants.filter(
      (r) => r.city.toLowerCase() === city.toLowerCase()
    );
    return res.json(matches);
  }

  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    const withDistance = restaurants.map((r) => {
      const distance = Math.sqrt(
        Math.pow(userLat - r.lat, 2) + Math.pow(userLng - r.lng, 2)
      );
      return { ...r, distance };
    });

    withDistance.sort((a, b) => a.distance - b.distance);
    
    return res.json(withDistance.slice(0, 10)); // Return nearest 5
  }

  res.json(restaurants);
});

// ✅ Get single restaurant by ID
app.get("/api/restaurants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  res.json(restaurant);
});


app.listen(5000, () => console.log("✅ Server running on port 5000"));

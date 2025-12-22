import { useEffect, useState } from "react";
import { getAllPlaces } from "../api/api";
import PlaceCard from "../components/PlaceCard";
import { motion } from "framer-motion";

export default function Wishlist() {
  const [places, setPlaces] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setSavedIds(stored);
  }, []);

  useEffect(() => {
    if (savedIds.length === 0) return;
    getAllPlaces().then((all) => {
      const filtered = all.filter((p) => savedIds.includes(p.id));
      setPlaces(filtered);
    });
  }, [savedIds]);

  if (savedIds.length === 0)
    return <div className="p-4 text-lg">Your wishlist is empty 😢</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Wishlist ❤️</h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} wishlist />
        ))}
      </motion.div>
    </div>
  );
}

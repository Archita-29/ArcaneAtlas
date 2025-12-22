import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  if (!place) return null;

  // Wishlist
  const toggleWishlist = () => {
    let list = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (list.includes(place.id)) {
      list = list.filter((id) => id !== place.id);
    } else {
      list.push(place.id);
    }

    localStorage.setItem("wishlist", JSON.stringify(list));
  };

  const isSaved = () => {
    const list = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return list.includes(place.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* 📸 Image */}
      <Link to={`/place/${place.id}`}>
        <img
          src={place.photo_url || "https://via.placeholder.com/400"}
          alt={place.name}
          className="w-full h-48 object-cover"
        />
      </Link>

      {/* 📝 Text Section */}
      <div className="p-4 space-y-1">
        <h2 className="text-xl font-bold">{place.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{place.state}</p>

        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 inline-block rounded-full">
          {place.category}
        </div>

        {/* 🔍 DESCRIPTION SHORT */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
          {place.description_short || "No description available."}
        </p>

        {/* ❤️ Wishlist */}
        <button
          onClick={toggleWishlist}
          className="mt-2 w-full py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {isSaved() ? "❤️ Saved" : "🤍 Add to Wishlist"}
        </button>
      </div>
    </motion.div>
  );
}

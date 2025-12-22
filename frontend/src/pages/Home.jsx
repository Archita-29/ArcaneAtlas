import { useEffect, useState } from "react";
import { getAllPlaces } from "../api/api";
import PlaceCard from "../components/PlaceCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    "all",
    "spiritual",
    "mountain",
    "adventure",
    "waterfall",
    "heritage",
    "forest",
  ];

  // Fetch all places
  useEffect(() => {
    getAllPlaces().then((data) => {
      setPlaces(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
  let output = places;
  const q = search.trim().toLowerCase();

  if (q !== "") {
    output = output.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q) ||      // SEARCH BY STATE
      p.category.toLowerCase().includes(q)      // SEARCH BY CATEGORY
    );
  }

  if (category !== "all") {
    output = output.filter((p) =>
      p.category.toLowerCase().includes(category)
    );
  }

  setFiltered(output);
}, [search, category, places]);

  return (
    <div className="space-y-8">

      {/* HERO BANNER */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Discover Hidden India 🇮🇳</h1>
        <p className="mt-2 text-lg">
          Explore spiritual wonders, mountain escapes, waterfalls, caves, forests & more.
        </p>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search places..."
          className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              category === c
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Skeleton Loader */}
      {loading && (
        <div>
          <Skeleton height={220} className="mb-4 rounded-xl" />
          <Skeleton height={220} className="mb-4 rounded-xl" />
          <Skeleton height={220} className="mb-4 rounded-xl" />
        </div>
      )}

      {/* Results */}
      {!loading && filtered.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No places found.</p>
      ) : !loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

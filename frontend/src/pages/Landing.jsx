import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      <div className="text-center space-y-8 px-6">

        {/* BRAND */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
          Arcane<span className="text-indigo-400">Atlas</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          Discover destinations with real-time weather, terrain intelligence,
          safety insights, and cultural depth — all in one atlas.
        </p>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white/10 p-6 rounded-xl">
            🌍 <h3 className="font-semibold mt-2">Smart Exploration</h3>
            <p className="text-sm text-gray-300">
              Explore places with real data, not just photos.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            ⚠️ <h3 className="font-semibold mt-2">Safety First</h3>
            <p className="text-sm text-gray-300">
              Earthquake, terrain & hazard insights built-in.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            🧭 <h3 className="font-semibold mt-2">Travel Smarter</h3>
            <p className="text-sm text-gray-300">
              Weather, best seasons & local traditions included.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <Link
            to="/auth"
            className="inline-block px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-full text-lg font-semibold transition"
          >
            Get Started →
          </Link>
        </div>

      </div>
    </div>
  );
}

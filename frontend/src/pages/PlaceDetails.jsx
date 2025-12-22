import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSinglePlace } from "../api/api";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function PlaceDetails() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hazards, setHazards] = useState(null);
  const [terrain, setTerrain] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getSinglePlace(id).then((data) => {
      if (!data) return;

      setPlace(data.place);
      setWeather(data.weather);
      setHazards(data.hazards);
      setTerrain(data.terrain);

      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsSaved(saved.includes(Number(id)));
    });
  }, [id]);

  const toggleWishlist = () => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (saved.includes(Number(id))) {
      localStorage.setItem(
        "wishlist",
        JSON.stringify(saved.filter((x) => x !== Number(id)))
      );
      setIsSaved(false);
    } else {
      saved.push(Number(id));
      localStorage.setItem("wishlist", JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  if (!place) {
    return <div className="p-6 text-lg">Loading place details...</div>;
  }

  return (
    <div className="space-y-8">

      {/* HERO IMAGE */}
      <div className="h-72 w-full rounded-2xl overflow-hidden">
        <img
          src={place.photo_url || "https://via.placeholder.com/800"}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TITLE + ACTION */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{place.name}</h1>
          <p className="text-gray-500 text-lg">
            {place.state} — {place.category}
          </p>
        </div>

        <button
          onClick={toggleWishlist}
          className={`px-5 py-2 rounded-lg text-white ${
            isSaved ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          {isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </div>

      {/* LONG DESCRIPTION */}
      <div>
        <h2 className="text-xl font-semibold mb-2">About this place</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {place.long_description || "No detailed description available."}
        </p>
      </div>

      {/* BEST MONTH TO VISIT */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Best Time to Visit</h2>
        <p className="text-gray-700 dark:text-gray-300">
          {place.best_month || "Not specified"}
        </p>
      </div>

      {/* TRADITIONS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Local Traditions</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {place.traditions || "No traditions information available."}
        </p>
      </div>

      {/* SAFETY RATING */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Safety Rating</h2>
        <span
          onClick={() =>
            alert(`Safety Rating: ${place.safety_rating ?? "N/A"} / 5`)
          }
          className="inline-block px-4 py-2 bg-yellow-200 dark:bg-yellow-700 rounded-lg cursor-pointer hover:scale-105 transition"
        >
          ⭐ {place.safety_rating ?? "N/A"} / 5
        </span>
      </div>

      {/* WEATHER */}
      {weather && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-xl">
            <p>🌡️ Temp: {weather.main?.temp}°C</p>
            <p>🌤️ Condition: {weather.weather?.[0]?.description}</p>
            <p>💧 Humidity: {weather.main?.humidity}%</p>
          </div>
        </div>
      )}

      {/* HAZARDS */}
      {hazards && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Nearby Hazards</h2>
          <div className="p-4 bg-red-50 dark:bg-red-900 rounded-xl">
            <p>⚠ Events detected: {hazards.features?.length ?? 0}</p>
            {hazards.features?.[0] && (
              <p>
                Last event: Magnitude {hazards.features[0].properties.mag} —{" "}
                {hazards.features[0].properties.place}
              </p>
            )}
          </div>
        </div>
      )}

      {/* TERRAIN */}
      {terrain?.results?.[0] && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Terrain</h2>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-xl">
            <p>Altitude: {terrain.results[0].elevation} m</p>
          </div>
        </div>
      )}

      {/* MAP */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Location Map</h2>
        <div className="h-64 w-full rounded-xl overflow-hidden">
          <MapContainer
            center={[place.latitude, place.longitude]}
            zoom={13}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[place.latitude, place.longitude]} />
          </MapContainer>
        </div>
      </div>

    </div>
  );
}

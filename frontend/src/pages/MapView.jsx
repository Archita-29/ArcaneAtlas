import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import { getAllPlaces } from "../api/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Category colors
const categoryColors = {
  mountain: "red",
  spiritual: "purple",
  adventure: "blue",
  waterfall: "cyan",
  forest: "green",
  heritage: "orange",
  all: "gray",
};

const iconByCategory = (category) => {
  return new L.Icon({
    iconUrl: {
      mountain: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      spiritual: "https://cdn-icons-png.flaticon.com/512/1946/1946033.png",
      heritage: "https://cdn-icons-png.flaticon.com/512/3179/3179068.png",
      adventure: "https://cdn-icons-png.flaticon.com/512/1995/1995531.png",
      waterfall: "https://cdn-icons-png.flaticon.com/512/727/727803.png",
      forest: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    }[category] || "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [35, 35],
  });
};

export default function MapView() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getAllPlaces().then((data) => setPlaces(data));
  }, []);

  const center = [22.9734, 78.6569]; // India

  return (
    <div className="h-[80vh] rounded-xl overflow-hidden shadow">
      <MapContainer center={center} zoom={5} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerClusterGroup>
          {places.map((p) =>
            p.latitude && p.longitude ? (
              <Marker key={p.id} position={[p.latitude, p.longitude]}
              icon={iconByCategory(p.category)}>
                <Popup>
                  <div className="w-40">
                    <img
                      src={p.photo_url}
                      className="h-24 w-full object-cover rounded"
                    />
                    <div className="font-bold mt-2">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.state}</div>
                    <Link
                      to={`/place/${p.id}`}
                      className="text-blue-600 mt-2 inline-block text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

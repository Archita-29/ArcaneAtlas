import axios from "axios";

const API_BASE = "http://127.0.0.1:5000"; // Flask backend

// ✔ Fetch all places
export async function getAllPlaces() {
  try {
    const res = await axios.get(`${API_BASE}/api/places`);
    return res.data;
  } catch (err) {
    console.error("Error fetching places:", err);
    return [];
  }
}

// ✔ Fetch a single place with weather + hazard + terrain
export async function getSinglePlace(id) {
  try {
    const res = await axios.get(`${API_BASE}/api/places/${id}/details`);
    return res.data; 
  } catch (err) {
    console.error(`Error fetching place ${id} details:`, err);
    return null;
  }
}

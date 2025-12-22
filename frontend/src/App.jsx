import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import MapView from "./pages/MapView";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";

function Layout({ children }) {
  const location = useLocation();

  // Hide navbar on landing & auth pages
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/auth";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {!hideNavbar && <Navbar />}
      <div className="max-w-6xl mx-auto p-4">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* FRONT PAGE */}
          <Route path="/" element={<Landing />} />

          {/* AUTH */}
          <Route path="/auth" element={<Auth />} />

          {/* MAIN APP */}
          <Route path="/home" element={<Home />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

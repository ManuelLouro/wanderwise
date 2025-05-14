import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.tsx";
import TripsPage from "./pages/Trips.tsx";
import CalendarPage from "./pages/Calendar.tsx";
import TripDetails from "./pages/tripDetails.tsx";
import { useParams } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Profile from "./pages/Profile.tsx";

const domain = "YOUR_AUTH0_DOMAIN";
const clientId = "YOUR_AUTH0_CLIENT_ID";

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }} // Set the redirect URI here
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/trip/:tripId" element={<TripDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

export default App;


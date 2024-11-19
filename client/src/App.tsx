import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.tsx";
import TripsPage from "./pages/Trips.tsx";
import CalendarPage from "./pages/Calendar.tsx";
import TripDetails from "./pages/tripDetails.tsx";
import { useParams } from 'react-router-dom';



const App: React.FC = () => {
  
  function GetTripName() {
    const { tripName } = useParams();
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/trip/:name"  element={<TripDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

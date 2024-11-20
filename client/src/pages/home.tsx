import { NavBar } from "../components/ui/navbar.tsx";
import "../index.css";
import Hamburger from "../components/hamburger.tsx";
import FixedButton from "../components/fixedbutton.tsx";
import Calendar2 from "../components/reactcalendar.tsx";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import Timeline from "../components/ui/timeline.tsx";

type Trip = {
  id: string;
  name: string;
};

type Event = {
  id: string;
  name: string;
  location?: string;
  description?: string;
  date?: string;
};

const HomePage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch trips from the backend
  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:3000/trips");
      const data: Trip[] = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  // Fetch events for the selected trip
  const fetchEvents = async (tripId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/trips/${tripId}/events`);
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // Fetch events when a trip is selected
  useEffect(() => {
    if (selectedTrip) {
      fetchEvents(selectedTrip);
    }
  }, [selectedTrip]);

  const handleTripChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tripId = event.target.value;
    setSelectedTrip(tripId);
  };

  const handleClick = () => {
    console.log("Hamburger button clicked");
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <h1 className="ml-1 font-semibold text-customBlue text-xl">Choose your Trip</h1>

      <select
        value={selectedTrip}
        onChange={handleTripChange}
        className="border p-2 rounded ml-1 font-bold text-customBlue"
      >
        <option value="">Select a trip</option>
        {trips.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.name}
          </option>
        ))}
      </select>

      {/* Pass the events to the Timeline component */}
      <Timeline events={events} />

      <FixedButton onClick={handleClick} />
    </>
  );
};

export default HomePage;

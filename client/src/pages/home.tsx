import { NavBar } from "../components/ui/navbar.tsx";
import "../index.css";
import Hamburger from "../components/hamburger.tsx";
import FixedButton from "../components/fixedbutton.tsx";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import Timeline from "../components/ui/timeline.tsx";
import { useNavigate } from "react-router-dom"; 

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
  const navigate = useNavigate(); 

  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:3000/trips");
      const data: Trip[] = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const fetchEvents = async (tripId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/trips/${tripId}/events`
      );
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

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

  const goToTripsPage = () => {
    navigate("/trips"); // Navigate to trips page
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="bg-gradient-to-r from-customTeal to-grey-500 h-screen p-1">
        <h1 className="ml-1 font-semibold text-customBlue text-xl">
          Choose your Trip
        </h1>

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

        <div className="flex justify-center mt-6">
          <button
            onClick={goToTripsPage}
            className="bg-customBlue text-white font-bold py-2 px-4 rounded"
          >
            Go to Trips
          </button>
        </div>

        <Timeline events={events} />

        <FixedButton onClick={handleClick} />
      </div>
    </>
  );
};

export default HomePage;

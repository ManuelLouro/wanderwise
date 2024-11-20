import { NavBar } from "../components/ui/navbar.tsx";
import FixedButton from "../components/fixedbutton.tsx";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

type Trip = {
  id: string;
  name: string;
};

const handleClick = () => {
  console.log("Hamburger button clicked");
};
const TripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTripName, setNewTripName] = useState("");

  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:3000/trips");
      const data: Trip[] = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const addTrip = async () => {
    try {
      const response = await fetch("http://localhost:3000/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTripName }),
      });

      if (response.ok) {
        setNewTripName("");
        fetchTrips();
      } else {
        console.error("Failed to add trip");
      }
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };
  useEffect(() => {
    fetchTrips();
  }, []);

  console.log(trips);

  return (
    <div>
      <NavBar></NavBar>
      <h1 className="text-2xl font-bold mb-4 text-customBlue ml-1">My Trips</h1>
      <div className="space-y-2">
        {trips.map((trip, index) => (
          <Link
          key={trip.id}
          to={`/trip/${trip.id}`} // Pass tripId instead of name
          className="block bg-gradient-to-r from-green-300 to-customTeal px-4 py-2 rounded w-1/3 ml-1 text-customBlue font-bold"
        >
          {trip.name}
        </Link>
        
        ))}
      </div>
      {isAdding ? (
        <div className="mt-4">
          <input
            type="text"
            value={newTripName}
            onChange={(e) => setNewTripName(e.target.value)}
            placeholder="Enter trip name"
            className="border p-2 rounded mr-2 shadow-xl ml-1"
          />
          <button
            onClick={addTrip}
            className="bg-green-300 text-customBlue px-4 py-2 rounded font-semibold shadow-xl"
          >
            Add
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 bg-customTeal text-customBlue px-4 py-2 rounded-xl ml-1 font-semibold"
        >
          Add Trip
        </button>
      )}
      <FixedButton onClick={handleClick}></FixedButton>
    </div>
  );
};

export default TripsPage;

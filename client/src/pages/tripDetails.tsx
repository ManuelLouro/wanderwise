import { useEffect, useState } from "react";
import FixedButton from "../components/fixedbutton.tsx";
import { NavBar } from "../components/ui/navbar.tsx";
import { useNavigate } from "react-router-dom";

type Event = {
  id: string;
  name: string;
  time: string;
  date: string;
  location: string;
};

const TripDetails: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEventName, setNewEventName] = useState("");

  const handleClick = () => {
    console.log("Hamburger button clicked");
  };

  const navigate = useNavigate();
  const tripName = decodeURIComponent(
    window.location.pathname.split("/").pop() || ""
  );

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async () => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newEventName }),
      });

      if (response.ok) {
        setNewEventName("");
        fetchEvents();
      } else {
        console.error("Failed to add event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div>
        <input></input>
      </div>
      <FixedButton onClick={handleClick}> </FixedButton>
    </div>
  );
};

export default TripDetails;

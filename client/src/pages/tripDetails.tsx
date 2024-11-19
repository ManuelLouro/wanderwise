import { useEffect, useState } from "react";
import FixedButton from "../components/fixedbutton.tsx";
import { NavBar } from "../components/ui/navbar.tsx";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@/components/ui/datepicker.tsx";

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
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventLocation, setNewEventLocation] = useState("")

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
        body: JSON.stringify({ name: newEventName, description:newEventDescription,location:newEventLocation }),
      });

      if (response.ok) {
        setNewEventName("");
        setNewEventDescription("");
        setNewEventLocation("");
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
      <h1 className="text-2xl font-bold mb-4 text-customBlue ml-1">Events</h1>
      <div className="space-y-2">
        events.map((event, index)  )
      </div>
      {isAdding ? (
        <div className="mt-4">
          <input
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="Enter trip name"
            className="border p-2 rounded mr-2 shadow-xl ml-1"
          />
          <input
            type="text"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            placeholder="Enter event description"
            className="border p-2 rounded mr-2 shadow-xl mb-16"
          />
          <input
            type="text"
            value={newEventLocation}
            onChange={(e) => setNewEventLocation(e.target.value)}
            placeholder="Enter event location"
            className="border p-2 rounded mr-2 shadow-xl mb-16"
          />
          <h2> add date</h2>
          <DatePicker></DatePicker>
          <button
            onClick={addEvent}
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
          Add Event
        </button>
      )}
      <FixedButton onClick={handleClick}></FixedButton>
    </div>
  );
};

export default TripDetails;

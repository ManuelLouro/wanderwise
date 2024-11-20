import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FixedButton from "../components/fixedbutton.tsx";
import { NavBar } from "../components/ui/navbar.tsx";
import { DatePicker } from "@/components/ui/datepicker.tsx";

type Event = {
  id: string;
  name: string;
  description: string;
  time: string;
  location: string;
  date: string;
  tripId: string;
};

const TripDetails: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [date, setDate] = useState("");
  const location = useLocation(); 

  
  const currentTripId = location.pathname.split("/").filter(Boolean).pop() || "";

  const fetchEvents = async () => {
    if (!currentTripId) {
      console.error("No trip ID found in the URL");
      return;
    }

    try {
      console.log("Fetching events for tripId:", currentTripId);

      
      const response = await fetch(`http://localhost:3000/events?tripId=${currentTripId}`);

      if (!response.ok) {
        console.error("Failed to fetch events:", response.statusText);
        return;
      }

      const data: Event[] = await response.json();
      setEvents(data);
      console.log("Fetched events:", data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async () => {
    if (!currentTripId) {
      console.error("No trip ID found in the URL");
      return;
    }

    try {
      const eventData = {
        name: newEventName,
        description: newEventDescription,
        location: newEventLocation,
        date: date,
        tripId: currentTripId,
      };

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        console.error("Failed to add event:", response.statusText);
        return;
      }

      console.log("Event added successfully");
      setNewEventName("");
      setNewEventDescription("");
      setNewEventLocation("");
      setDate("");
      fetchEvents(); 
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  useEffect(() => {
    fetchEvents(); 
  }, [currentTripId]); 

  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-bold mb-4 text-customBlue ml-1">
        Events for Trip ID: {currentTripId}
      </h1>
      <div className="space-y-2 flex flex-col">
        {events.map((event) => (
          <div key={event.id} className="border p-2 rounded shadow">
            <h2 className="font-semibold">{event.name}</h2>
            <p>{event.description}</p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
          </div>
        ))}
      </div>
      {isAdding ? (
        <div className="mt-4 flex flex-col">
          <input
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="Enter event name"
            className="border p-2 rounded mr-2 shadow-xl ml-1 mb-16 w-64"
          />
          <input
            type="text"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            placeholder="Enter event description"
            className="border p-2 rounded mr-2 shadow-xl mb-16 ml-1 w-64"
          />
          <input
            type="text"
            value={newEventLocation}
            onChange={(e) => setNewEventLocation(e.target.value)}
            placeholder="Enter event location"
            className="border p-2 rounded mr-2 shadow-xl mb-16 ml-1 w-64"
          />
          <DatePicker dateHandler={setDate} />
          <button
            onClick={addEvent}
            className="bg-green-300 text-customBlue px-4 py-2 rounded font-semibold shadow-xl w-[20%] ml-1"
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
      <FixedButton onClick={() => console.log("Hamburger clicked")} />
    </div>
  );
};

export default TripDetails;

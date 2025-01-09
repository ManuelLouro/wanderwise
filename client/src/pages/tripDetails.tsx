import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  pdfUrl?: string; 
};

const TripDetails: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const location = useLocation();

  const currentTripId =
    location.pathname.split("/").filter(Boolean).pop() || "";

    const fetchEvents = async () => {
      if (!currentTripId) {
        console.error("No trip ID found in the URL");
        return;
      }
    
      try {
        const response = await fetch(
          `http://localhost:3000/trips/${currentTripId}/events`
        );
    
        if (!response.ok) {
          console.error("Failed to fetch events:", response.statusText);
          return;
        }
    
        const data: Event[] = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };
    

    const addEvent = async () => {
      if (!currentTripId) {
        console.error("No trip ID found in the URL");
        return;
      }
    
      try {
        const formData = new FormData();
        formData.append("name", newEventName);
        formData.append("description", newEventDescription);
        formData.append("location", newEventLocation);
        formData.append("date", date);
        formData.append("tripId", currentTripId);
        if (file) formData.append("pdf", file);
    
        const response = await fetch("http://localhost:3000/events", {
          method: "POST",
          body: formData,
        });
    
        if (!response.ok) {
          console.error("Failed to add event:", response.statusText);
          return;
        }
    
        console.log("Event added successfully");
    
        // Clear form fields
        setNewEventName("");
        setNewEventDescription("");
        setNewEventLocation("");
        setDate("");
        setFile(null);
    
        // Refetch events and hide the form
        await fetchEvents();
        setIsAdding(false); // Reset isAdding to false
      } catch (error) {
        console.error("Error adding event:", error);
      }
    };

    const deleteEvent = async (eventId: string) => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
          method: "DELETE",
        });
    
        if (!response.ok) {
          console.error("Failed to delete event:", response.statusText);
          return;
        }
    
        console.log("Event deleted successfully");
    
        // Refresh events list
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    };
    
    

  useEffect(() => {
    fetchEvents();
  }, [currentTripId]);

  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-bold mb-4 text-customBlue ml-1">
        Events for Trip
      </h1>
  
      <div className="space-y-2 flex flex-col">
  {events.length > 0 ? (
    events.map((event) => (
      <div key={event.id} className="border p-2 rounded shadow">
        <h2 className="font-semibold">{event.name}</h2>
        <p>{event.description}</p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        {event.pdfUrl && (
          <p>
            <a
              href={event.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View PDF
            </a>
          </p>
        )}
        <button
          onClick={() => deleteEvent(event.id)} 
          className="text-black bg-red-800 mt-2"
        >
          Delete
        </button>
      </div>
    ))
  ) : (
    <p className="text-gray-500 ml-1">No events available.</p>
  )}
</div>

  
      {/* Show the form conditionally */}
      {isAdding && (
        <div className="mt-4 flex flex-col">
          <input
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="Enter event name"
            className="border p-2 rounded mr-2 shadow-xl ml-1 mb-2 w-64"
          />
          <input
            type="text"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            placeholder="Enter event description"
            className="border p-2 rounded mr-2 shadow-xl ml-1 mb-2 w-64"
          />
          <input
            type="text"
            value={newEventLocation}
            onChange={(e) => setNewEventLocation(e.target.value)}
            placeholder="Enter event location"
            className="border p-2 rounded mr-2 shadow-xl ml-1 mb-2 w-64"
          />
          <DatePicker dateHandler={setDate} />
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border p-2 rounded mr-2 shadow-xl ml-1 mb-4 w-64"
          />
          <button
            onClick={addEvent}
            className="bg-green-300 text-customBlue px-4 py-2 rounded font-semibold shadow-xl w-[20%] ml-1"
          >
            Add
          </button>
          <button
            onClick={() => setIsAdding(false)} // Cancel button to return to the event list
            className="bg-red-300 text-customBlue px-4 py-2 rounded font-semibold shadow-xl w-[20%] ml-1 mt-2"
          >
            Cancel
          </button>
        </div>
      )}
  
      {/* Toggle add event form */}
      {!isAdding && (
        <button
        onClick={() => setIsAdding(true)}
        className="mt-4 mb-2 bg-customTeal text-customBlue px-4 py-2 rounded-full font-bold shadow-xl mx-auto block"
      >
        Add Event
      </button>
      
      )}
  
      <FixedButton onClick={() => console.log("Hamburger clicked")} />
    </div>
  );
  
  
};

export default TripDetails;

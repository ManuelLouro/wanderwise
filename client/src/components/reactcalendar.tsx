import { useState } from "react";
import { addDays, format } from "date-fns"; // Optional: date-fns for date manipulation

function Calendar2() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  // Get today's date
  const today = format(currentDate, "yyyy-MM-dd");
  const currentDay = currentDate.getDate();

  // Function to generate a simple calendar grid
  const generateCalendarDays = () => {
    const startOfWeek = currentDate.getDate() - currentDay; // Get the start of the current week
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(startOfWeek + i); // Calculate the date for the current day of the week
      days.push(date);
    }

    return days;
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Today's Activities</h2>
        <button
          onClick={handleNextDay}
          className="bg-customTeal text-white p-2 rounded-full"
        >
          &rarr; {/* Right arrow icon */}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {generateCalendarDays().map((date, index) => (
          <div
            key={index}
            className={`p-4 text-center rounded-lg ${format(date, "yyyy-MM-dd") === today ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar2;

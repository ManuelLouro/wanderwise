import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, add, sub, eachDayOfInterval } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(sub(currentDate, { months: 1 }))} className="px-2 py-1 bg-gray-200 rounded">◀</button>
        <h2 className="text-lg font-bold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(add(currentDate, { months: 1 }))} className="px-2 py-1 bg-gray-200 rounded">▶</button>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div
            key={day.toString()}
            className={`p-2 text-center rounded-lg ${format(day, "MM") !== format(currentDate, "MM") ? "text-gray-400" : "bg-blue-100"}`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;




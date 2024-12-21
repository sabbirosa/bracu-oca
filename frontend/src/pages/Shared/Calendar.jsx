// export default function Calendar() {
//   return (
//     <div>Calendar</div>
//   )
// }

import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const Calendar = () => {
  const events = [
    { date: "2024-11-10", title: "This Event", club: "BIZBEE" },
    { date: "2024-11-17", title: "Ent. Talk", club: "BUED Theatre" },
    { date: "2024-11-28", title: "Speech Competition", club: "BIZBEE Theatre" },
  ];

  const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          <FaCalendarAlt /> Central Calendar
        </h1>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Today
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2 bg-blue-50 p-4 rounded-lg">
          <div className="grid grid-cols-7 gap-2 text-center text-blue-800 font-semibold mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, index) => {
              const day = index + 1;
              const fullDate = `2024-11-${String(day).padStart(2, "0")}`;
              const event = events.find((e) => e.date === fullDate);

              return (
                <div
                  key={index}
                  className={`h-20 border rounded-lg flex flex-col items-center justify-center ${
                    fullDate === currentDate
                      ? "bg-orange-200 border-orange-400"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      fullDate === currentDate ? "text-orange-700" : "text-blue-800"
                    }`}
                  >
                    {day}
                  </span>
                  {event && (
                    <div className="mt-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {event.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="bg-blue-800 text-white p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li
                key={index}
                className="bg-white text-blue-800 p-3 rounded-lg shadow-sm"
              >
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm">{event.date}</p>
                <p className="text-xs text-gray-500">{event.club}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calendar;


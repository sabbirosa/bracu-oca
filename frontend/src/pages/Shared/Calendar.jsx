import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BsCalendarEvent } from "react-icons/bs";

const Calendar = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["acceptedEvents"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/accepted-events`)
        .then((res) => res.data),
  });

  const upcomingEvents = events
    .filter((event) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(event?.date) >= today;
    })
    .slice(0, 3);

  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    return (
      <div className="px-2 py-1">
        <div className="font-medium text-xs truncate">{event?.title}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[10px] font-medium text-gray-600">
            {event?.extendedProps?.club}
          </span>
          {event?.extendedProps?.room && (
            <span className="text-[10px] bg-blue-100 text-blue-600 px-1 rounded">
              {event?.extendedProps?.room}
            </span>
          )}
        </div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="loading loading-spinner text-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-blue-800">Central Calendar</h1>
            <div className="flex items-center gap-4">
              <div className="avatar">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW710hPlb48q-g88rWvxavK9XmOeFOXU1ZMA&s"
                  alt="User Avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth",
              }}
              events={events}
              eventContent={renderEventContent}
              eventClassNames="bg-blue-600 text-white border-0 rounded-md shadow-sm"
              dayMaxEvents={true}
              height="auto"
              dayHeaderFormat={{ weekday: "short" }}
              firstDay={0}
              dayCellClassNames={(info) =>
                info.isToday ? "bg-blue-50 rounded-lg" : ""
              }
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Indicators */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-lg font-bold text-blue-800 mb-4">
                Event Indicators
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Scheduled Events</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Today</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-lg font-bold text-blue-800 mb-4">
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                    >
                      <div className="flex items-start gap-4">
                        <BsCalendarEvent className="text-blue-600 text-xl" />
                        <div>
                          <h3 className="font-bold text-blue-800">
                            {event?.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(event?.date)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {event?.extendedProps?.club}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming events</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
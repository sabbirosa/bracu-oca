import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { BsCalendarEvent } from "react-icons/bs";
import Swal from "sweetalert2"; // Import SweetAlert2
import Loading from "../../components/Loading";

const Calendar = () => {
  const formatEvents = (events) => {
    if (!Array.isArray(events)) {
      console.error("Events is not an array:", events);
      return [];
    }

    return events
      .map((event) => {
        console.log("Raw event data:", event);

        if (!event._id || !event.title || !event.date) {
          console.error("Invalid event data:", event);
          return null;
        }

        return {
          id: event._id,
          title: event.title,
          start: new Date(event.date),
          end: new Date(event.date),
          allDay: true,
          extendedProps: {
            club: event.clubMail?.split("@")[0]?.toUpperCase() || "No Club",
            room: event.roomNumber || "No Venue",
            description: event.description || "No description available",
            budget: event.budget || "Not specified",
            status: event.status || "Unknown",
            response: event.response || "Pending",
            feedback: event.feedback || "No feedback",
          },
        };
      })
      .filter(Boolean);
  };

  const { data: rawEvents = [], isLoading } = useQuery({
    queryKey: ["acceptedEvents"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/accepted-events`
        );
        console.log("API Response:", response.data); // Debug log
        return response.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        return [];
      }
    },
  });

  const events = formatEvents(rawEvents);

  const upcomingEvents = events
    .filter((event) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return event.start >= today;
    })
    .sort((a, b) => a.start - b.start)
    .slice(0, 3);

  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    return (
      <div className="px-2 py-1">
        <div className="font-medium text-xs truncate">{event.title}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[10px] font-medium text-blue-600">
            {event.extendedProps.club}
          </span>
          {event.extendedProps.room && (
            <span className="text-[10px] bg-blue-200 text-blue-800 px-1 rounded">
              {event.extendedProps.room}
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

  useEffect(() => {
    console.log("Raw events:", rawEvents);
    console.log("Formatted events:", events);
  }, [rawEvents]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-blue-800">Central Calendar</h1>
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
              eventDisplay="block"
              eventDidMount={(info) => {
                console.log("Event mounted:", {
                  id: info.event.id,
                  title: info.event.title,
                  start: info.event.start,
                  end: info.event.end,
                  extendedProps: info.event.extendedProps,
                });
              }}
              eventClassNames={(info) => {
                const status = info.event.extendedProps.response;
                return [
                  status === "Accepted" ? "bg-blue-600" : "bg-gray-500",
                  "text-white",
                  "border-0",
                  "rounded-md",
                  "shadow-sm",
                  "cursor-pointer",
                  "p-1",
                ];
              }}
              dayMaxEvents={true}
              height="auto"
              dayHeaderFormat={{ weekday: "short" }}
              firstDay={0}
              dayCellClassNames={(info) =>
                info.isToday ? "bg-blue-100 rounded-lg" : ""
              }
              eventClick={(info) => {
                const event = info.event;
                const props = event.extendedProps;

                const formattedBudget = props.budget
                  ? `BDT ${props.budget.toLocaleString()}`
                  : "Not specified";

                Swal.fire({
                  title: event.title,
                  html: `
                    <p><strong>Club:</strong> ${props.club}</p>
                    <p><strong>Venue:</strong> ${props.room}</p>
                    <p><strong>Description:</strong> ${props.description}</p>
                    <p><strong>Budget:</strong> ${formattedBudget}</p>
                    <p><strong>Status:</strong> ${props.status}</p>
                    <p><strong>Response:</strong> ${props.response}</p>
                    ${
                      props.feedback
                        ? `<p><strong>Feedback:</strong> ${props.feedback}</p>`
                        : ""
                    }
                  `,
                  confirmButtonText: "Close",
                  confirmButtonColor: "blue",
                  showCloseButton: true,
                });
              }}
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
                  <span className="text-sm text-blue-700">Scheduled Events</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                  <span className="text-sm text-blue-700">Today</span>
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
                            {event.title}
                          </h3>
                          <p className="text-sm text-blue-600">
                            {formatDate(event.start)}
                          </p>
                          <p className="text-sm text-blue-500">
                            {event.extendedProps.club}
                          </p>
                          <p className="text-sm text-blue-400">
                            {event.extendedProps.room}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-blue-500 text-sm">No upcoming events</p>
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

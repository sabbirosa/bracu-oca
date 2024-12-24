import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventPlanner = () => {
  const { user } = useContext(AuthContext);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title: eventName,
      date: eventDate,
      clubMail: user?.email, // Use logged-in user's email
      response: "Accepted", // Automatically set as accepted
    };

    try {
      await axios.post("/api/events", newEvent);
      alert("Event added successfully!");
      navigate("/dashboard/calendar");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Plan New Event
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="eventName" className="block font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label htmlFor="eventDate" className="block font-medium text-gray-700">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventPlanner;

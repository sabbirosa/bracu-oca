import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuthContext } from "../../Context/AuthProvider";
import useAllClubs from "../../Hooks/useAllClubs";
import useAllEvents from "../../Hooks/useAllEvents";
import useCurrentUser from "../../Hooks/useCurrentUser";
import Announcements from "../Shared/Announcement";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [allClubs] = useAllClubs();
  const [allEvents] = useAllEvents();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    eventStats: [],
    budgetDistribution: [],
    clubStats: {},
  });
  const [clubAnalytics, setClubAnalytics] = useState({});
  const [currentUser] = useCurrentUser();
  const isOCA = currentUser?.role === "oca";

  const COLORS = ["#3A82F6", "#F97316", "#1D4ED8", "#FACC15", "#10B981"];

  // Fetch dashboard data
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/dashboard-info/${user.email}`)
        .then((res) => setData(res.data))
        .catch((err) => console.error("Error fetching dashboard info:", err));
    }
  }, [user?.email]);

  // Fetch upcoming events
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dashboard-events`)
      .then((res) => {
        const sortedEvents = res.data
          .filter((event) => new Date(event.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5);
        setUpcomingEvents(sortedEvents);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, [ user?.email]);

  // Analytics processing
  useEffect(() => {
    if (allEvents && allClubs) {
      try {
        const eventsByMonth = {};
        const budgetByClub = {};
        allEvents.forEach((event) => {
          const month = new Date(event.date).toLocaleString("default", { month: "short" });
          eventsByMonth[month] = (eventsByMonth[month] || 0) + 1;
          if (event.budget) {
            const clubName = event.clubMail.split("@")[0].toUpperCase();
            budgetByClub[clubName] = (budgetByClub[clubName] || 0) + Number(event.budget);
          }
        });

        const eventStats = Object.entries(eventsByMonth).map(([month, count]) => ({
          month,
          events: count,
        }));
        const budgetDistribution = Object.entries(budgetByClub)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        setAnalyticsData({
          eventStats,
          budgetDistribution,
        });
      } catch (error) {
        console.error("Error processing analytics:", error);
      }
    }
  }, [allEvents, allClubs]);

  // Custom tooltip for budget chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Budget: ৳{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Dashboard</h1>
        <div className="flex items-center">
          <NavLink to={`/dashboard/club-info/${data?._id}`} className="relative">
            <img
              src={data?.photo_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-300"
            />
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-2 space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex gap-4 items-center">
              <img
                src={data?.photo_url}
                alt={data?.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-blue-800">{data?.name}</h2>
                <p className="text-gray-500">{data?.email}</p>
                <p className="text-sm text-blue-600">{data?.fullName}</p>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-blue-800 mb-4">Event Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.eventStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="events" fill="#3A82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-blue-800 mb-4">Budget Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.budgetDistribution}
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {analyticsData.budgetDistribution.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Section - Announcements */}
        <div className="col-span-1">
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

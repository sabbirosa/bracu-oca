import { useContext } from "react";
import { BiCalendar, BiChat } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import { CgEventbrite, CgLogOut } from "react-icons/cg";
import { FaCalendar, FaHome } from "react-icons/fa";
import { MdAnalytics, MdChat, MdEvent } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useCurrUser from "../hooks/useCurrUser";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const role = user?.email === "oca@bracu.ac.bd" ? "oca" : "club";
  const email = user?.email;
  const username = email.split("@")[0];
  const uppercaseUsername = username.toUpperCase();

  const [currUser] = useCurrUser();

  const navItems = {
    oca: [
      { to: "/dashboard", icon: <FaHome className="text-2xl" />, label: "Dashboard" },
      { to: "/dashboard/approval", icon: <CgEventbrite className="text-2xl" />, label: "Approval" },
      { to: "/dashboard/calendar", icon: <BiCalendar className="text-2xl" />, label: "Calendar" },
      { to: "/dashboard/club-info", icon: <BsInfo className="text-2xl" />, label: "Club Info" },
      { to: "/dashboard/oca-chat", icon: <BiChat className="text-2xl" />, label: "Chat" },
    ],
    club: [
      { to: "/dashboard", icon: <FaHome className="text-xl" />, label: "Dashboard" },
      { to: "/dashboard/event-planner", icon: <MdEvent className="text-2xl" />, label: "Event Planner" },
      { to: "/dashboard/calendar", icon: <FaCalendar className="text-2xl" />, label: "Calendar" },
      { to: "/dashboard/club-analytics", icon: <MdAnalytics className="text-2xl" />, label: "Transactions" },
      { to: "/dashboard/chat", icon: <MdChat className="text-2xl" />, label: "Chat" },
      { to: `/dashboard/club-info/${currUser._id}`, icon: <BsInfo className="text-2xl" />, label: "Club Info" },
    ],
  };

  const commonItems = [
    { to: "/", icon: <FaHome className="text-xl" />, label: "Home" },
    { to: "/login", icon: <CgLogOut className="text-xl" />, label: "Logout", action: logOut },
  ];

  return (
    <div className="flex font-poppins">
      <div className="bg-blue-800 w-[250px] min-h-screen">
        <ul className="menu space-y-5 mt-2 p-4 text-base text-blue-200 font-medium">
          {/* Role-specific navbar */}
          {role === "oca" && (
            <li className="text-center text-4xl font-semibold text-white">OCA</li>
          )}
          {role === "club" && (
            <li className="text-center text-2xl font-semibold text-white">
              {uppercaseUsername}
            </li>
          )}

          {(navItems[role] || []).map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 ${isActive ? "bg-white text-blue-800 hover:bg-blue-700 hover:text-white" : "text-blue-200"}`
                }
              >
                {item.icon}
                <span className="text-base">{item.label}</span>
              </NavLink>
            </li>
          ))}

          <div className="border-t border-blue-400/20 my-4"></div>

          {commonItems.map((item, index) => (
            <li key={index} onClick={item.action || (() => {})}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 ${isActive ? "bg-white text-blue-800" : "text-blue-200"}`
                }
              >
                {item.icon}
                <span className="text-base">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-8 bg-blue-50 w-full font-poppins">
        <div className="w-full min-h-screen bg-blue-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

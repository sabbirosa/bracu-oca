import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { BiTime } from "react-icons/bi";
import { BsBuilding, BsCalendarEvent, BsPeople } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { MdApproval } from "react-icons/md";
import { Link } from "react-router-dom";


const features = [
  {
    icon: BsCalendarEvent,
    title: "Event Planning",
    description:
      "Plan and manage events effortlessly with integrated tools for scheduling, registration, and updates.",
  },
  {
    icon: MdApproval,
    title: "Efficient Approvals",
    description:
      "Simplify the approval process for club activities and get quick feedback from university authorities.",
  },
  {
    icon: BsBuilding,
    title: "Room Booking",
    description:
      "Seamlessly reserve rooms for events with real-time availability and instant confirmations.",
  },
  {
    icon: BiTime,
    title: "Instant Notifications",
    description:
      "Stay updated with real-time alerts about approvals, event changes, and important announcements.",
  },
  {
    icon: BsPeople,
    title: "Member Management",
    description:
      "Keep track of members, roles, and responsibilities with a streamlined management interface.",
  },
  {
    icon: BsCalendarEvent,
    title: "Unified Calendar",
    description:
      "Access a centralized calendar for all club activities and events to stay organized.",
  },
];

const socialMedia = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    link: "https://twitter.com",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    link: "https://linkedin.com",
  },
]

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-bold text-blue-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | BRACUOca</title>
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="min-h-screen bg-blue-50">
        {/* Navbar */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-800">BRACUOca</span>
              </div>
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col items-center text-center py-32">
              <div className="text-white max-w-3xl">
                <div className="inline-block px-4 py-1 bg-white/10 rounded-full mb-6">
                  <span className="text-white text-sm font-medium">Simplify Club Management</span>
                </div>
                <h1 className="text-6xl font-bold leading-tight mb-6">
                  Empower Your <span className="text-yellow-400">Club Operations</span>
                </h1>
                <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                  BRACUOca offers tools to streamline event planning, manage members, and enhance collaboration with university offices.
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  <Link
                    to="/login"
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all font-medium text-lg shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                  <a
                    href="#features"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-medium text-lg"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Comprehensive Club Management
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform equips you with everything needed to efficiently manage your university club.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">BRACUOca</h3>
                <p className="text-gray-300 text-sm">
                  Simplifying university club management and event organization.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/login" className="hover:text-yellow-400 transition-colors">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <a href="#features" className="hover:text-yellow-400 transition-colors">
                      Features
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li>Email: support@bracuoca.com</li>
                  <li>Phone: (123) 456-7890</li>
                </ul>
              </div>
              <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="text-white hover:text-yellow-400 transition-colors"
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
              © 2024 BRACUOca. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

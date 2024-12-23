import { useState, useEffect, useContext } from "react";
import { MdAdd, MdDelete, MdClose } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useCurrentUser from "../../hooks/useCurrentUser";

// Helper function to format dates
const formatDate = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMilliseconds = targetDate - now;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays > 0) {
    return diffInDays === 1 ? "tomorrow" : `in ${diffInDays} days`;
  }
  if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} days ago`;
  }
  return "today";
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [currentUser] = useCurrentUser();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Fetch announcements from API
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/announcements`);
      const sortedAnnouncements = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setAnnouncements(sortedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Handle adding a new announcement
  const handleAdd = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/add-announcement`, {
        ...formData,
        date: new Date(),
        posterEmail: user.email,
      });
      if (response.data.insertedId) {
        fetchAnnouncements();
        setShowAddModal(false);
        Swal.fire({
          icon: "success",
          title: "Announcement Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Adding Announcement",
        text: error.message,
      });
    }
  };

  // Handle deleting an announcement
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/delete-announcement/${id}`);
        fetchAnnouncements();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Announcement has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  // Filter announcements based on the active tab
  const filteredAnnouncements = announcements.filter((announcement) =>
    activeTab === "all" ? true : announcement.posterEmail === user.email
  );

  // Check if the user can delete an announcement
  const canDelete = (announcement) =>
    currentUser?.role === "oca" || announcement.posterEmail === user.email;

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-blue-800">Announcements</h2>
          {(currentUser?.role === "oca" || currentUser?.role === "club") && (
            <button
              onClick={() => setShowAddModal(true)}
              className="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
            >
              <MdAdd size={24} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "all" ? "bg-blue-800 text-white" : "text-gray-600 hover:bg-blue-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("our")}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "our" ? "bg-blue-800 text-white" : "text-gray-600 hover:bg-blue-100"
            }`}
          >
            Ours
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="px-6 pb-6 max-h-[calc(100vh-20rem)] overflow-y-auto space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-blue-800">{announcement.title}</h3>
                  <p className="text-gray-600 mt-2">{announcement.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <BsPerson />
                      <span>{announcement.posterEmail.split("@")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BiTime />
                      <span>{formatDate(announcement.date)}</span>
                    </div>
                  </div>
                </div>
                {canDelete(announcement) && (
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <MdDelete size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No announcements found</div>
        )}
      </div>

      {/* Add Announcement Modal */}
      {showAddModal && (
        <AddAnnouncementModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
        />
      )}
    </div>
  );
};

const AddAnnouncementModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields",
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-blue-800">New Announcement</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
          >
            <MdClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              placeholder="Enter description"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700"
            >
              Add Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Announcements;
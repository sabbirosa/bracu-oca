import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsShieldLock } from "react-icons/bs";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, setLoading } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(async () => {
        navigate("/dashboard");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: `${error}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const { data: clubs, isLoading } = useQuery({
    queryKey: ["clubInfo"],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_API_URL}/club-list`).then((res) => res.data),});

  if (isLoading) {
    return <Loading />;
  }

  const handleClubSelect = (club) => {
    setSelectedClub(club);
    setValue("email", club.email);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800">BRACUOca</h1>
          <p className="text-blue-600 mt-2">Streamline your club management</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Welcome Back!</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-blue-800 font-medium text-sm mb-2">
                Select Your Organization
              </label>
              <div className="relative">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <FaUserCircle className="h-5 w-5 text-blue-800 absolute left-3" />
                    <span
                      className={
                        selectedClub ? "text-blue-900" : "text-blue-400"
                      }
                    >
                      {selectedClub ? selectedClub.name : "Choose your Role"}
                    </span>
                  </div>
                  <FaChevronDown
                    className={`h-4 w-4 text-blue-800 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-blue-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                      {clubs.map((club) => (
                        <div
                          key={club.name}
                          onClick={() => handleClubSelect(club)}
                          className={`flex items-center px-4 py-2 cursor-pointer rounded-lg transition-colors ${
                            club.name === "OCA"
                              ? "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                              : "hover:bg-blue-100"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              club.name === "OCA"
                                ? "bg-blue-200"
                                : "bg-blue-100"
                            }`}
                          >
                            {club.name === "OCA" ? (
                              <BsShieldLock className="h-4 w-4 text-blue-800" />
                            ) : (
                              <FaUserCircle className="h-4 w-4 text-blue-800" />
                            )}
                          </div>
                          <div>
                            <div
                              className={`text-sm font-medium ${
                                club.name === "OCA"
                                  ? "text-blue-800"
                                  : "text-blue-900"
                              }`}
                            >
                              {club.name}
                            </div>
                            <div
                              className={`text-xs ${
                                club.name === "OCA"
                                  ? "text-blue-700"
                                  : "text-blue-500"
                              }`}
                            >
                              {club.email}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <input type="hidden" {...register("email")} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-blue-800 font-medium text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="h-5 w-5 text-blue-800" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <div
              className="mt-6 text-center text-sm tooltip hover:tooltip-open"
              data-tip="mail us at: admin@bracuoca.com"
            >
              <a
                href="#"
                className="text-blue-800 hover:underline w-full text-center"
              >
                Need help?
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-blue-600 text-sm">
          © 2024 BRACUOca. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
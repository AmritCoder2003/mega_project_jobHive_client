import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const Profile = () => {
  // Accessing user data from Redux store

  const user = useSelector((state) => state.user || {});
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [showResumeModal, setShowResumeModal] = useState(false);

  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
  // Initial states for experience and education
  const [profileData, setProfileData] = useState({
    bio: "",
    skills: "",
    social: { twitter: "", linkedin: "", github: "", leetcode: "" },
    resume: null
  });
  useEffect(() => {
    const getCurrentProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8050/api/v1/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data.profile);
        if (response.status === 200) {
          setProfileData(prevData => ({
            ...prevData,
            bio: response.data.profile.bio || "",
            skills: response.data.profile.skills || "",
            social: response.data.profile.social || {},
            resume: response.data.profile.resume || null
          }));
          setLoading(false);
          toast.success("Profile fetched successfully");
        } else {
          setProfileData(prevData => ({
            ...prevData,
            bio:  "",
            skills:  "",
            social: {}
          }));
          setLoading(false);
          toast.error("Failed to fetch profile");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch profile");
        console.error("Error fetching current profile", error);
      }
    };
    getCurrentProfile();
  }, []);
  const navigate = useNavigate();

  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-16 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center space-x-4">
          <img
            className="w-20 h-20 rounded-full"
            src={user.user.avatar}
            alt={`${user.user.name}'s avatar`}
          />
          <div>
            <h2 className="text-xl font-semibold">{user.user.name}</h2>
            <p className="text-gray-600">{user.user.role}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">Email:</span> {user.user.email}
          </p>
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">Phone:</span> {user.user.phone}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">Bio:</span> {profileData.bio}
          </p>
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">Skills:</span> {profileData.skills}
          </p>
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">Twitter:</span>{" "}
            <a href={profileData.social.twitter} target="_blank" className="text-blue-500"> Link </a>
          </p>
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">LinkedIn:</span>{" "}
            <a href={profileData.social.linkedin} target="_blank" className="text-blue-500"> Link </a>
          </p>
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">Github:</span>{" "}
            <a href={profileData.social.github} target="_blank" className="text-blue-500"> Link </a>
          </p>
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">LeetCode:</span>{" "}
            <a href={profileData.social.leetcode}  target="_blank" className="text-blue-500"> Link </a>
          </p>
        </div>
        {profileData?.resume && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">View Submitted Resume:</label>
              <a href={profileData.resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Resume
              </a>
            </div>
          )}
        <button onClick={()=>{navigate("/profile/edit")}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
        Edit Profile
      </button>
      </div>
      
    </div>
  );
};

export default Profile;
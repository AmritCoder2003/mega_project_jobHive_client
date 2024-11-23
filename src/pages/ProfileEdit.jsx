import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import ResumeModal from "./ResumeModal";

const ProfileEdit = () => {

  const [showResumeModal, setShowResumeModal] = useState(false);

  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
  // Initial states for experience and education
  const [profileData, setProfileData] = useState({
    bio: "",
    skills: "",
    social: { twitter: "", linkedin: "", github: "", leetcode: "" },
    resume: null
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
   if(file){
    setProfileData({ ...profileData, resume: file });
    const previewUrl=URL.createObjectURL(file);
    //console.log(previewUrl);
    setResumePreviewUrl(previewUrl);
   }
  };
  const handleResumePreview=()=>{
    setShowResumeModal(true);
  }

  // Function to update state for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in profileData.social) {
      // Handle changes for social links
      setProfileData({
        ...profileData,
        social: {
          ...profileData.social,
          [name]: value
        }
      });
    } else {
      // Handle changes for other fields
      setProfileData({
        ...profileData,
        [name]: value
      });
    }
  };

  // Handle experience and education input changes
  

  // Add new experience or education entry
 
  // Remove experience or education entry
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("bio", profileData.bio);
      formData.append("skills", profileData.skills);
      formData.append("userId", profileData.userId);
      
      // Append social links
      formData.append("social[twitter]", profileData.social.twitter);
      formData.append("social[linkedin]", profileData.social.linkedin);
      formData.append("social[github]", profileData.social.github);
      formData.append("social[leetcode]", profileData.social.leetcode);
  
      // Append resume file if it exists
      if (profileData.resume) {
        formData.append("resume", profileData.resume);
      }

      console.log(formData);
  
      const response = await axios.post("http://localhost:8050/api/v1/profile/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        }
      });
  
      setLoading(false);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        navigate("/profile");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating/updating profile", error);
      toast.error("Failed to update profile");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Bio Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Skills Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Skills</label>
            <input
              type="text"
              name="skills"
              value={profileData.skills}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Social Links Section */}
          <h3 className="text-xl font-semibold mb-4">Social Links</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={profileData.social.twitter}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={profileData.social.linkedin}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">GitHub</label>
            <input
              type="text"
              name="github"
              value={profileData.social.github}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">LeetCode</label>
            <input
              type="text"
              name="leetcode"
              value={profileData.social.leetcode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Add more social links as needed */}
          {profileData?.resume && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">View Submitted Resume:</label>
              <a href={profileData.resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Resume
              </a>
            </div>
          )}

          <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="resume">Upload Upgraded Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={handleResumeUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          
        </div>
        {resumePreviewUrl && (
          <button type="button"
          className="mt-2 mr-4 text-blue-500 underline"
          onClick={handleResumePreview}
          >
            Preview Resume
          </button>
        )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Submit Profile
          </button>

        </form>
      </div>
       {/* Modal for Resume Preview */}
    {showResumeModal && <ResumeModal imageUrl={resumePreviewUrl} onClose={() => setShowResumeModal(false)} />}
    </div>
  );
};

export default ProfileEdit;

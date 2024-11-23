import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InterviewExpCom = () => {
  const { companyName } = useParams();

  const [companyExperiences, setCompanyExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyReview = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8050/api/v1/interviews/interview-experience/${companyName}`);
        if (response.status === 200) {
          setCompanyExperiences(response.data.experiences);
          toast.success("Company experience fetched successfully");
        } else {
          toast.error("Error fetching company experience");
        }
      } catch (err) {
        toast.error("Error fetching company experience");
        console.error("Error fetching company experience:", err);
      } finally {
        setLoading(false);
      }
    };

    if (companyName) fetchCompanyReview();
  }, [companyName]);

  const handleLike = async (experienceId) => {
    try {
      const response = await axios.patch(`http://localhost:8050/api/v1/interviews/interview-like/${experienceId}`);
      if (response.status === 200) {
        // Update the experience with new like count
        setCompanyExperiences(prev =>
          prev.map(experience =>
            experience._id === experienceId
              ? { ...experience, likes: response.data.experience.likes }
              : experience
          )
        );
        toast.success("Liked!");
      } else {
        toast.error("Failed to like the experience");
      }
    } catch (err) {
      toast.error("Error liking the experience");
      console.error("Error liking the experience:", err);
    }
  };

  const handleDislike = async (experienceId) => {
    try {
      const response = await axios.patch(`http://localhost:8050/api/v1/interviews/interview-dislike/${experienceId}`);
      if (response.status === 200) {
        // Update the experience with new dislike count
        setCompanyExperiences(prev =>
          prev.map(experience =>
            experience._id === experienceId
              ? { ...experience, dislikes: response.data.experience.dislikes }
              : experience
          )
        );
        toast.success("Disliked!");
      } else {
        toast.error("Failed to dislike the experience");
      }
    } catch (err) {
      toast.error("Error disliking the experience");
      console.error("Error disliking the experience:", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-6 p-6 bg-gradient-to-b from-gray-100 to-gray-300">
      <h2 className="text-3xl font-bold mb-8 text-blue-700">{companyName} Interview Experiences</h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {companyExperiences.length > 0 ? (
            companyExperiences.map((experience) => (
              <div
                key={experience._id}
                className="p-6 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  <span className="text-blue-600">Position:</span> {experience.position}
                </h3>
                <p className="text-gray-600 mb-1"><strong>Status:</strong> {experience.status}</p>
                <p className="text-gray-600 mb-1"><strong>Location:</strong> {experience.location}</p>
                <p className="text-gray-600 mb-1"><strong>Date:</strong> {experience.date}</p>

                <div className="mt-4">
                  <p className="text-gray-600 mb-1"><strong>Experience:</strong> {experience.experience}</p>
                </div>

                {/* Like and Dislike Buttons */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleLike(experience._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Like ({experience.likes || 0})
                  </button>
                  <button
                    onClick={() => handleDislike(experience._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Dislike ({experience.dislikes || 0})
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No interview experiences found for {companyName}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewExpCom;

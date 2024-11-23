import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';

const ReviewApplication = () => {
  const { applicationId } = useParams(); 
  console.log(applicationId);
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        if (!applicationId) {
          toast.error("Invalid application ID");
          navigate('/job/me'); 
          return;
        }
        setIsLoading(true);

        const response = await axios.get(`http://localhost:8050/api/v1/applications/get/${applicationId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log('Response:', response); // Debugging output
        setIsLoading(false);
        if(response.status === 200) {
          setApplicationData(response.data.application);
          toast.success("Application details fetched successfully");
        }else{
          toast.error("Failed to fetch application details");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to fetch application details");
      }
    };

    fetchApplicationData();
  }, [applicationId]);

  useEffect(() => {
    if(isLoading) {
      console.log("Loading...");
    }
  })

  // Handle editing of the application
  const handleEdit = () => {
    navigate(`/editApplication/${applicationId}`);
  };

  // Handle deletion of the application
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8050/api/v1/applications/delete/${applicationId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Application deleted successfully");
      setTimeout(() => navigate('/job/me'), 2000); // Redirect to the My Jobs page after deletion
    } catch (error) {
      toast.error("Failed to delete application");
    }
  };

  

 
 
  return (
    <>
    {isLoading && <Spinner /> }
    {!isLoading && <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Review Application</h2>
      <div className="bg-white w-1/2 mx-auto shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <p className="text-lg">{applicationData.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <p className="text-lg">{applicationData.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Cover Letter:</label>
          <p className="text-lg">{applicationData.coverLetter}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
          <p className="text-lg">{applicationData.phone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Resume:</label>
          <a href={applicationData.resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            View Resume
          </a>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
      
    </div>}
    
    </>
  );
};

export default ReviewApplication;

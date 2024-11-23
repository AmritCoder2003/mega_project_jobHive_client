import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
const MyJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8050/api/v1/applications/jobseeker`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        setLoading(false);
        if (response.status === 200) {
          setAppliedJobs(response.data.applications);
          console.log(response.data);
          toast.success("Applied jobs fetched successfully");
        } else {
          setAppliedJobs([]);
          toast.error("No applied jobs found");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching applied jobs");
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold  text-center text-gray-800 mb-6">My Applied Jobs</h2>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Profile</th>
              <th className="p-4 text-left">Applied On</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Employment Type</th>
              <th className="p-4 text-left">Workstation</th>
              <th className="p-4 text-left">Review Application</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job) => (
              <tr key={job.applicationId} className="border-t">
                <td className="p-4">{job.company}</td>
                <td className="p-4">{job.jobTitle}</td>
                <td className="p-4">
                  {/* Log the date to inspect */}
                 
                  {job.date ? (
                    format(new Date(job.date), 'dd-MM-yyyy')
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="p-4">{job.category}</td>
                <td className="p-4">{job.type}</td>
                <td className="p-4">{job.workstation}</td>
                <td className="p-4">
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>navigate(`/reviewApplication/${job.applicationId}`)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </>
  );
};

export default MyJobs;

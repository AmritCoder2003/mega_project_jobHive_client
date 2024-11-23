import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Myapplication = () => {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [noofapplications, setNoofapplications] = useState(0);

  useEffect(() => {
    const fetchJobs=async()=>{
      setLoading(true);
      try{
        const response = await axios.get("http://localhost:8050/api/v1/applications/noofapplications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })

        setLoading(false);
        if (response.status === 200) {
          setJobs(response.data.jobs);
          setNoofapplications(response.data.noofapplications);
          toast.success("Jobs fetched successfully");
        } else {
          setJobs([]);
          toast.error("No jobs found");
        }
      }catch(error){
        setLoading(false);
        console.error("Error fetching jobs:", error);
        toast.error("Error fetching jobs");
      }
    }

    fetchJobs();
  }, []);
 
  const handleSeeApplications = (id) => {
    navigate(`/jobs/ListofApplications/${id}`);
  };

  return (
   <>
      {isLoading && <Spinner />}
      <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">My Posted Jobs</h1>
            <ul className="space-y-4">
                {jobs.map(job => (
                    <li key={job._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-2">{job.title}</h2>
                            <p className="text-gray-600 mt-2">Category: {job.category}</p>
                            <p className="text-gray-600 mt-2">Posted: {job.createdAt.split('T')[0]}</p>
                           
                            <p className="text-gray-600 mt-2">Applications Received: {noofapplications || 0}</p>
                        </div>
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            onClick={() => handleSeeApplications(job._id)}
                        >
                            See Applications
                        </button>
                    </li>
                ))}
            </ul>
        </div>
   </>
  )
}

export default Myapplication

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchProfile, setSearchProfile] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchWorkFromHome, setSearchWorkFromHome] = useState(false);
  const [searchPartTime, setSearchPartTime] = useState(false);
  const [searchSalary, setSearchSalary] = useState([0, 10]); 
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8050/api/v1/jobs/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
           // Initialize filtered jobs with all jobs
          const sortedJobs= response.data.jobs.sort((a,b)=>{
            return new Date(b.createdAt)-new Date(a.createdAt)
          })
          setJobs(sortedJobs);
          setFilteredJobs(sortedJobs);
          toast.success("Jobs fetched successfully");
        } else {
          setJobs([]);
          toast.error("No jobs found");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    const filtered = jobs.filter((job) => {
      const profileMatch = searchProfile
        ? job.title.toLowerCase().includes(searchProfile.toLowerCase())
        : true;
      const locationMatch = searchLocation
        ? job.city.toLowerCase().includes(searchLocation.toLowerCase())
        : true;
      const workFromHomeMatch = searchWorkFromHome
        ? job.workstation?.toLowerCase() === "remote"
        : true;
      const partTimeMatch = searchPartTime
        ? job.type?.toLowerCase() === "parttime"
        : true;
      const salaryMatch =
        job.salaryFrom >= searchSalary[0] * 100000 &&
        job.salaryTo <= searchSalary[1] * 100000;
     

      return (
        profileMatch &&
        locationMatch &&
        workFromHomeMatch &&
        partTimeMatch &&
        salaryMatch 
      );
    });
    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setSearchProfile("");
    setSearchLocation("");
    setSearchWorkFromHome(false);
    setSearchPartTime(false);
    setSearchSalary([0, 10]);
    setFilteredJobs(jobs);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className=" flex">
        {/* Filter Sidebar */}
        <div className="w-1/4 bg-white p-6 fixed h-full shadow-lg">
          <h2 className="text-xl font-bold mb-6">Filters</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Profile</label>
            <input
              type="text"
              placeholder="e.g. Marketing"
              value={searchProfile}
              onChange={(e) => setSearchProfile(e.target.value)}
              className="p-2 mt-1 rounded-md w-full border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              placeholder="e.g. New York"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="p-2 mt-1 rounded-md w-full border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Work from home
            </label>
            <input
              type="checkbox"
              checked={searchWorkFromHome}
              onChange={(e) => setSearchWorkFromHome(e.target.checked)}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Part-time</label>
            <input
              type="checkbox"
              checked={searchPartTime}
              onChange={(e) => setSearchPartTime(e.target.checked)}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Annual salary (in dollars)
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={searchSalary[1]}
              onChange={(e) => setSearchSalary([0, e.target.value])}
              className="mt-1 w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>0</span>
              <span>2</span>
              <span>4</span>
              <span>6</span>
              <span>8</span>
              <span>10</span>
            </div>
          </div>
          
          <button
            className="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-500"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-gray-400"
            onClick={clearFilters}
          >
            Clear all
          </button>
        </div>

        {/* Job Listings */}
        <div className="ml-[25%] w-3/4 bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h1 className="text-4xl font-bold mb-10 text-center text-white">
            Available Jobs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
                >
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-gray-500 mt-2">{job.company}</p>
                  <p className="text-gray-600 mt-2">
                    <strong>Salary:</strong> ${job.salaryFrom} - ${job.salaryTo}{" "}
                    {job.salaryPeriod}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Category:</strong> {job.category}
                  </p>
                  <p className="text-gray-600 mt-4">
                    {job.city}, {job.country}
                  </p>
                  <p className="text-gray-600 mt-4">
                    <strong>Work Environment:</strong> {job.workstation}
                  </p>
                  <p className="text-gray-600 mt-4">
                    <strong>Job Type:</strong> {job.type}
                  </p>
                  <button
                    className="bg-pink-700 text-white px-4 py-2 mt-4 rounded hover:bg-pink-600"
                    onClick={() => navigate(`/jobs/${job._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-white text-xl">
                No jobs available at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllJobs;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const InterviewExperience = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const allinterviewexp = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8050/api/v1/interviews/interview-experience");
        if (response.status === 200) {
          setCompanies(response.data.experiences);
          setFilteredCompanies(response.data.experiences);
        } else {
          toast.error("Error fetching company reviews");
        }
      } catch (err) {
        toast.error("Error fetching company reviews");
        console.error("Error fetching company reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    allinterviewexp();
  }, []);

  useEffect(() => {
    const results = companies?.filter(company =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(results);
  }, [searchTerm, companies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-6 p-4 bg-gray-50">
      

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by company name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 p-3 rounded-md w-full max-w-xl mb-6"
      />

      {/* Company List */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="company-list w-full max-w-3xl space-y-4">
          {filteredCompanies?.length > 0 ? (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="company-item border flex justify-between items-center p-4 rounded-md shadow-md bg-white"
              >
                <h3 className="text-xl font-bold">{company.companyName}</h3>
                
                <button
                  type="submit"
                  onClick={() => navigate(`/interview/${company.companyName}`)}
                  className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View
                </button>
              </div>
            ))
          ) : companies?.length > 0 ? (
            companies.map((company) => (
              <div
                key={company.id}
                className="company-item border flex justify-between items-center p-4 rounded-md shadow-md bg-white"
              >
                <h3 className="text-xl font-bold">{company.companyName}</h3>
                <button
                  type="submit"
                  onClick={() => navigate(`/interview/${company.companyName}`)}
                  className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No experiences found.</p>
          )}
        </div>
      )}


      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => navigate('/interview/experience/add')}
          className="btn btn-primary px-6 py-3 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          Share your experience
        </button>
      </div>
    </div>
  
  );
};

export default InterviewExperience;

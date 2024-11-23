import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanywiseReview = () => {
  const { companyName } = useParams();
  
  const [companyReviews, setCompanyReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyReview = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8050/api/v1/reviews/company/${companyName}`);
        if (response.status === 200) {
          setCompanyReviews(response.data.reviews);
          console.log(response.data.reviews);
          toast.success("Company reviews fetched successfully");
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

    if (companyName) fetchCompanyReview();
  }, [companyName]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-6 p-6 bg-gradient-to-b from-gray-100 to-gray-300">
      <h2 className="text-3xl font-bold mb-8 text-blue-700">{companyName} Reviews</h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {companyReviews.length > 0 ? (
            companyReviews.map((review) => (
              <div
                key={review._id}
                className="p-6 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  <span className="text-blue-600">Designation:</span> {review.designation}
                </h3>
                <p className="text-gray-600 mb-1"><strong>Department:</strong> {review.department}</p>
                <p className="text-gray-600 mb-1"><strong>Employment Type:</strong> {review.employmentType}</p>
                <p className="text-gray-600 mb-1"><strong>Current Employee:</strong> {review.currentEmployee}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <p className="text-gray-700"><strong>Overall Rating:</strong> {review.overallRating}/5</p>
                  <p className="text-gray-700"><strong>Work-Life Balance:</strong> {review.workLifeBalance}/5</p>
                  <p className="text-gray-700"><strong>Salary & Benefits:</strong> {review.salaryBenefits}/5</p>
                  <p className="text-gray-700"><strong>Promotions:</strong> {review.promotions}/5</p>
                  <p className="text-gray-700"><strong>Job Security:</strong> {review.jobSecurity}/5</p>
                  <p className="text-gray-700"><strong>Skill Development:</strong> {review.skillDevelopment}/5</p>
                  <p className="text-gray-700"><strong>Work Satisfaction:</strong> {review.workSatisfaction}/5</p>
                  <p className="text-gray-700"><strong>Company Culture:</strong> {review.companyCulture}/5</p>
                </div>

                <div className="mt-6">
                  <p className="text-gray-600 mb-1"><strong>Likes:</strong> {review.likes}</p>
                  <p className="text-gray-600 mb-1"><strong>Dislikes:</strong> {review.dislikes}</p>
                  <p className="text-gray-600"><strong>Work Policy:</strong> {review.workPolicy}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No reviews found for {companyName}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanywiseReview;

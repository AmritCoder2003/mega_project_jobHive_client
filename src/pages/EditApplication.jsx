import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ResumeModal from './ResumeModal';

const EditApplication = () => {
  const { applicationId } = useParams(); 
  const navigate = useNavigate();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [applicationData, setApplicationData] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);

  const formik = useFormik({
    initialValues: {
      resume: null,
      coverLetter: '',
    },
    validationSchema: Yup.object({
      resume: Yup.mixed().required('Resume is required'),  
      coverLetter: Yup.string().required('Cover Letter is required'),  
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('resume', values.resume);
        formData.append('coverLetter', values.coverLetter);

        const response = await axios.patch(`http://localhost:8050/api/v1/applications/edit/${applicationId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setIsLoading(false);

        if (response.status === 200) {
          toast.success('Updated successfully');
          setTimeout(() => {
            navigate(`/reviewApplication/${applicationId}`);
          }, 3000);
        } else {
          toast.error('Failed to apply');
        }
      } catch (error) {
        setIsLoading(false);
        toast.error('Failed to Edit');
      }
    },
  });

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        if (!applicationId) {
          toast.error('Invalid application ID');
          navigate('/job/me'); 
          return;
        }

        setIsLoading(true);

        const response = await axios.get(`http://localhost:8050/api/v1/applications/get/${applicationId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setIsLoading(false);

        if (response.status === 200) {
          setApplicationData(response.data.application);
          formik.setFieldValue('coverLetter', response.data.application.coverLetter);
          setResumePreviewUrl(response.data.application.resume);
          toast.success('Application details fetched successfully');
        } else {
          toast.error('Failed to fetch application details');
        }
      } catch (error) {
        setIsLoading(false);
        toast.error('Failed to fetch application details');
      }
    };

    fetchApplicationData();
  }, [applicationId]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('resume', file);
      const previewUrl = URL.createObjectURL(file);
      setResumePreviewUrl(previewUrl);
    }
  };

  const handleResumePreview = () => {
    setShowResumeModal(true);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">Apply for the Job</h2>
        <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverLetter">
              Cover Letter
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="coverLetter"
              name="coverLetter"
              value={formik.values.coverLetter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter cover letter"
            />
            {formik.touched.coverLetter && formik.errors.coverLetter && (
              <p className="text-red-500 text-xs italic">{formik.errors.coverLetter}</p>
            )}
          </div>

          {applicationData?.resume && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">View Submitted Resume:</label>
              <a href={applicationData.resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Resume
              </a>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="resume">Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".png, .jpg, .jpeg, .webp"
              onChange={handleResumeUpload}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formik.touched.resume && formik.errors.resume ? (
              <div className='text-red-500'>{formik.errors.resume}</div>
            ) : null}
          </div>

          {resumePreviewUrl && (
            <button
              type="button"
              className="mt-2 mr-4 text-blue-500 underline"
              onClick={handleResumePreview}
            >
              Preview Resume
            </button>
          )}

          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Submit Application
          </button>
        </form>
      </div>

      {showResumeModal && (
        <ResumeModal
          imageUrl={resumePreviewUrl}
          onClose={() => setShowResumeModal(false)}
        />
      )}
    </>
  );
};

export default EditApplication;

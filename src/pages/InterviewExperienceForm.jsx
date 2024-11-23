import React , {useState} from "react";
import {useFormik} from 'formik'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup"
import axios from "axios"
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const InterviewExperienceForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
           companyName: "",
           status: "",
           position: "",
           location: "",
           date: "",
           experience: ""
        },
        validationSchema: Yup.object({
            companyName: Yup.string().required("Company name is required"),
            status: Yup.string().required("Status is required"),
            position: Yup.string().required("Position is required"),
            location: Yup.string().required("Location is required"),
            date: Yup.string().required("Date is required"),
            experience: Yup.string().required("Experience is required"),
        }),
        onSubmit:async(values,{resetForm}) => {
            
            try{
                setLoading(true);
                const response=await axios.post("http://localhost:8050/api/v1/interviews/interview-experience",values);
                setLoading(false);
                if(response.status===200){
                    toast.success("Interview experience added successfully");
                    resetForm();
                    navigate("/interview/experience");
                }
                else{
                    toast.error("Error submitting interview experience");

                }
            }catch(err){
                setLoading(false);
                toast.error("Error submitting interview experience");
            }
        }
    })

    return (
        <>
        {loading && <Spinner/>}


        <div className="p-4 max-w-2xl w-full mt-10 mb-10 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4 text-pink-700 text-center ">Submit Your Interview Experience</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6 sm:p-4 md:p-6 lg:p-8 w-full ">

          <div>
            <label className="block text-md mb-3 text-pink-700 font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              values={formik.values.companyName}
              placeholder="Company Name"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <p className="text-red-500 text-md mb-3 text-pink-700">{formik.errors.companyName}</p>
            ) : null}
          </div>
          <div>

            <label className="block text-md mb-3 text-pink-700 font-medium text-gray-700">Status</label>
            <input
              type="text"
              id="status"
               name="status"
               values={formik.values.status}
               placeholder="Status"
               className="w-full p-2 border border-gray-300 rounded"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}

            />
            {formik.touched.status && formik.errors.status ? (
              <p className="text-red-500 text-md mb-3 text-pink-700">{formik.errors.status}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-md mb-3 text-pink-700 font-medium text-gray-700">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              values={formik.values.position}
              placeholder="Position"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.position && formik.errors.position ? (
              <p className="text-red-500 text-md mb-3 text-pink-700">{formik.errors.position}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-md mb-3 text-pink-700 font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              values={formik.values.location}
              placeholder="Location"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.location && formik.errors.location ? (
              <p className="text-red-500 text-md mb-3 text-pink-700">{formik.errors.location}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-md mb-3 text-pink-700 font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              values={formik.values.date}
              placeholder="Date"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.date && formik.errors.date ? (
              <p className="text-red-500 text-md mb-3 text-pink-700">{formik.errors.date}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-md mb-3 text-pink-700 font-medium text-gray-700">Experience</label>
            <textarea
              id="experience"
              name="experience"
              rows="6"
              values={formik.values.experience}
              placeholder="Experience"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.experience && formik.errors.experience ? (
              <p className="text-red-500 text-md mb-3 text-pink-700">{formik.errors.experience}</p>
            ) : null}
          </div>
          <button
            type="submit" 
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          >
            Submit
          </button>
        </form>
      </div>

        </>
    )

}


export default InterviewExperienceForm

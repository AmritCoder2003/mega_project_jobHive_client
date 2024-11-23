import React,{useEffect,useState} from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Title Required";
  }else if(values.title.length < 5){
    errors.title="Title must be at least 5 characters";
  }

  if(!values.description){
    errors.description = "Description Required";
  }else if(values.description.length < 10){
    errors.description = "Description must be at least 10 characters";
  }

 
  if(!values.category){
    errors.category = "Category Required";
  }

  if(!values.country){
    errors.country = "Country Required";
  }
  
  if(!values.city){
    errors.city="City Required";
  }
  if(!values.location){
    errors.location="Location Required";

  }
 
  if(!values.salaryPeriod){
    errors.salaryPeriod="Salary Period Required";
  }
  if(!values.salaryFrom){
    errors.salaryFrom="Salary From Required";
  }else if(values.salaryFrom <= 0){
    errors.salaryFrom="Salary From must be greater than 0";
  }
  if(!values.salaryTo){
    errors.salaryTo="Salary To Required";
  }else if(values.salaryTo <= 0){
    errors.salaryTo="Salary To must be greater than 0";
  }
  else if(values.salaryFrom && values.salaryTo <= values.salaryFrom){
    errors.salaryTo="Salary To must be greater than Salary From";
  }
  return errors;
}

 const countries = ["United States", "Canada", "India", "Australia", "United Kingdom", "Germany", "France", "China", "Japan", "Brazil"];



const EditJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.user);
  const {id}=useParams();
  const [isLoading,setIsLoading]=useState(false);
  const [job,setJob]=useState(null);
  const formik=useFormik({
    initialValues:{
      title:"",
      description:"",
      category:"",
      city:"",
      location:"",
      country:"",
      salaryPeriod:"monthly",
      salaryFrom:'',
      salaryTo:'',
      type:"fulltime",
      workstation:"remote",
      expired:false
      
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      try{
        const response=await axios.patch(
          `http://localhost:8050/api/v1/jobs/update/${id}`,
          values,
        {
          headers: {
            Authorization:`Bearer ${localStorage.getItem('token')}`,
          },
        })
        setIsLoading(false);
        if(response.status === 200){
          toast.success('Job updated successfully!');
          navigate('/ViewYourJobs');
        }else{
          toast.error('Something went wrong! Please try again.');
        }
      }catch(err){
        toast.error("Something went wrong! Please try again.");
        setIsLoading(false);
      }
    }
  })
  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8050/api/v1/jobs/getJob/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIsLoading(false);
        if (response.status === 200) {
          setJob(response.data.job);
          formik.setValues({
            title: response.data.job.title || "",
            description: response.data.job.description || "",
            category: response.data.job.category || "",
            city: response.data.job.city || "",
            location: response.data.job.location || "",
            salaryPeriod: response.data.job.salaryPeriod || "",
            salaryFrom: response.data.job.salaryFrom || "",
            salaryTo: response.data.job.salaryTo || "",
            country: response.data.job.country || "",
            type: response.data.job.type || "",
            workstation: response.data.job.workstation || "",
            expired: response.data.job.expired || false,
          });
        } else {
          toast.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        
      }
    };

    fetchJobDetails();
  }, [id]);
  
// console.log(formik.errors);
// console.log(formik.isValid);
// console.log(formik.isSubmitting);

  return (
    <>
      
      {isLoading && <Spinner />}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Edit Job</h2>

        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Job Title"
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (<div className='text-red-500'>{formik.errors.title}</div>) : null}
            </div>
           
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Category"
                onBlur={formik.handleBlur}
              />
              {formik.touched.category && formik.errors.category ? (<div className='text-red-500'>{formik.errors.category}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                onBlur={formik.handleBlur}
              >
                <option value="" label="Select country" />
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {formik.touched.country && formik.errors.country ? (<div className='text-red-500'>{formik.errors.country}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="City"
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city ? (<div className='text-red-500'>{formik.errors.city}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Location"
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location ? (<div className='text-red-500'>{formik.errors.location}</div>) : null}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Description"
                rows="5"
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (<div className='text-red-500'>{formik.errors.description}</div>) : null}
            </div>
           

            {/* Salary Period Selection */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Salary Period</label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="monthly"
                  name="salaryPeriod"
                  value="monthly"
                  checked={formik.values.salaryPeriod === 'monthly'}
                  onChange={formik.handleChange}
                  className="mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="monthly" className="text-gray-700">Monthly</label>
                <input
                  type="radio"
                  id="annual"
                  name="salaryPeriod"
                  value="annual"
                  checked={formik.values.salaryPeriod === 'annual'}
                  onChange={formik.handleChange}
                  className="ml-6 mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="annual" className="text-gray-700">Annual</label>
              </div>
              {formik.touched.salaryPeriod && formik.errors.salaryPeriod ? (<div className='text-red-500'>{formik.errors.salaryPeriod}</div>) : null}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Employment Type</label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="fulltime"
                  name="type"
                  value="fulltime"
                  checked={formik.values.type === 'fulltime'}
                  onChange={formik.handleChange}
                  className="mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="fulltime" className="text-gray-700">FullTime</label>
                <input
                  type="radio"
                  id="parttime"
                  name="type"
                  value="parttime"
                  checked={formik.values.type === 'parttime'}
                  onChange={formik.handleChange}
                  className="ml-6 mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="parttime" className="text-gray-700">PartTime</label>
                <input
                  type="radio"
                  id="internship"
                  name="type"
                  value="internship"
                  checked={formik.values.type === 'internship'}
                  onChange={formik.handleChange}
                  className="ml-6 mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="internship" className="text-gray-700">Internship</label>
              </div>
              {formik.touched.type && formik.errors.type ? (<div className='text-red-500'>{formik.errors.type}</div>) : null}
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Work Environment</label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="onsite"
                  name="workstation"
                  value="onsite"
                  checked={formik.values.workstation === 'onsite'}
                  onChange={formik.handleChange}
                  className="mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="onsite" className="text-gray-700">Onsite</label>
                <input
                  type="radio"
                  id="remote"
                  name="workstation"
                  value="remote"
                  checked={formik.values.workstation === 'remote'}
                  onChange={formik.handleChange}
                  className="ml-6 mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="remote" className="text-gray-700">Remote</label>
                <input
                  type="radio"
                  id="hybrid"
                  name="workstation"
                  value="hybrid"
                  checked={formik.values.workstation === 'hybrid'}
                  onChange={formik.handleChange}
                  className="ml-6 mr-2"
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="hybrid" className="text-gray-700">Hybrid</label>
              </div>
              {formik.touched.type && formik.errors.type ? (<div className='text-red-500'>{formik.errors.type}</div>) : null}
            </div>

          
              <>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="salaryFrom">Salary From</label>
                  <input
                    type="number"
                    id="salaryFrom"
                    name="salaryFrom"
                    value={formik.values.salaryFrom}
                    onChange={formik.handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g. 40000"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.salaryFrom && formik.errors.salaryFrom ? (<div className='text-red-500'>{formik.errors.salaryFrom}</div>) : null}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="salaryTo">Salary To</label>
                  <input
                    type="number"
                    id="salaryTo"
                    name="salaryTo"
                    value={formik.values.salaryTo}
                    onChange={formik.handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g. 70000"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.salaryTo && formik.errors.salaryTo ? (<div className='text-red-500'>{formik.errors.salaryTo}</div>) : null}
                </div>
                

              </>
              <div className="col-span-2">
  <label className="block text-gray-700 mb-2">Job Status</label>
  <div className="flex items-center mb-4">
    <input
      type="radio"
      id="notExpired"
      name="expired"
      value={false}
      checked={!formik.values.expired}
      onChange={() => formik.setFieldValue('expired', false)}
      className="mr-2"
    />
    <label htmlFor="notExpired" className="text-gray-700">Not Expired</label>
    
    <input
      type="radio"
      id="expired"
      name="expired"
      value={true}
      checked={formik.values.expired}
      onChange={() => formik.setFieldValue('expired', true)}
      className="ml-6 mr-2"
    />
    <label htmlFor="expired" className="text-gray-700">Expired</label>
  </div>
</div>

          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Update Job
          </button>
        </form>
    
      </div>
    </>
  );
}

export default EditJob
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup"
import axios from "axios"
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    companyName:Yup.string().required("Company name is required"),
    designation:Yup.string().required("Designation is required"),
    overallRating:Yup.string().required("Overall rating is required"),
    workLifeBalance:Yup.string().required("Work life balance is required"),
    salaryBenefits:Yup.string().required("Salary benefits is required"),
    promotions:Yup.string().required("Promotions is required"),
    jobSecurity:Yup.string().required("Job security is required"),
    skillDevelopment:Yup.string().required("Skill development is required"),
    workSatisfaction:Yup.string().required("Work satisfaction is required"),
    companyCulture:Yup.string().required("Company culture is required"),
    likes:Yup.string().required("Likes is required"),
    dislikes:Yup.string().required("Dislikes is required"),
    gender:Yup.string().required("Gender is required"),
    workPolicy:Yup.string().required("Work policy is required"),
    currentEmployee:Yup.string().required("Current employee is required"),
    employmentType:Yup.string().required("Employment type is required"),
    department:Yup.string().required("Department is required"),
});

const RateyourCompany = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const initialValues = {
        companyName: "",
        designation: "",
        overallRating: "",
        workLifeBalance: "",
        salaryBenefits: "",
        promotions: "",
        jobSecurity: "",
        skillDevelopment: "",
        workSatisfaction: "",
        companyCulture: "",
        likes: "",
        dislikes: "",
        gender: "",
        workPolicy: "",
        currentEmployee: "",
        employmentType: "",
        department: "",
    }

    const handleSubmit=async(values,{resetForm})=>{
        setLoading(true);
        console.log(values);
        try{
            const response = await axios.post("http://localhost:8050/api/v1/reviews/review",values);
            setLoading(false);
            if(response.status === 200){
                toast.success("Review submitted successfully");
                resetForm();
                navigate("/review/companies");
            }else{
                setLoading(false);
                toast.error("Something went wrong");

            }
        }catch(err){
            setLoading(false);
            toast.error("Something went wrong");

        }

    }

  return (
    <div className=" min-h-screen mt-4 mb-4 w-1/2 md:w-3/4 lg:w-1/2 sm:w-3/4 mx-auto  flex items-center justify-center bg-gray-100 py-2 px-4 sm:px-6 lg:px-8">
    <div className="w-full bg-white mt-4 mb-4 p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">Rate Your Company Anonymously</h2>
      <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form className="space-y-6">
                {/* Company Information */}
                <div>
                    <label className="block text-sm  font-bold text-gray-700">Company Name*</label>
                    <Field name="companyName" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="Company Name" />
                    <ErrorMessage name="companyName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700">Designation/Job Title*</label>
                    <Field name="designation" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="Designation" />
                    <ErrorMessage name="designation" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Ratings Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-bold text-gray-700">Overall Rating*</label>
                    <Field name="overallRating" type="number" min="1" max="5" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="1 to 5" />
                    <ErrorMessage name="overallRating" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-gray-700">Work-Life Balance*</label>
                    <Field name="workLifeBalance" type="number" min="1" max="5" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="1 to 5" />
                    <ErrorMessage name="workLifeBalance" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-bold text-gray-700">Salary & Benefits*</label>
                    <Field name="salaryBenefits" type="number" min="1" max="5" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="1 to 5" />
                    <ErrorMessage name="salaryBenefits" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-gray-700">Promotions/Appraisal*</label>
                    <Field name="promotions" type="number" min="1" max="5" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="1 to 5" />
                    <ErrorMessage name="promotions" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-bold text-gray-700">Job Security*</label>
                    <Field name="jobSecurity" type="number" min="1" max="5" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="1 to 5" />
                    <ErrorMessage name="jobSecurity" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-gray-700">Skill Development*</label>
                    <Field name="skillDevelopment" type="number" min="1" max="5" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="1 to 5" />
                    <ErrorMessage name="skillDevelopment" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-bold text-gray-700">Work Satisfaction*</label>
                    <Field name="workSatisfaction" type="number" min="1" max="5" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="1 to 5" />
                    <ErrorMessage name="workSatisfaction" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-gray-700">Company Culture*</label>
                    <Field name="companyCulture" type="number" min="1" max="5" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="1 to 5" />
                    <ErrorMessage name="companyCulture" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                {/* Opinion Section */}
                <div>
                    <label className="block text-sm font-bold text-gray-700">What do you like about working at your company?*</label>
                    <Field name="likes" as="textarea" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="Likes" />
                    <ErrorMessage name="likes" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700">What do you dislike about working at your company?*</label>
                    <Field name="dislikes" as="textarea" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="Dislikes" />
                    <ErrorMessage name="dislikes" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-bold text-gray-700">Gender*</label>
                    <Field as="select" name="gender" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  ">
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-gray-700">Work Policy*</label>
                    <Field as="select" name="workPolicy" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  ">
                        <option value="">Select Policy</option>
                        <option value="Permanent work from home">Permanent work from home</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                    </Field>
                    <ErrorMessage name="workPolicy" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-bold text-gray-700">Employment Status*</label>
                    <Field as="select" name="currentEmployee" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  ">
                        <option value="">Select Status</option>
                        <option value="Current Employee">Current Employee</option>
                        <option value="Former Employee">Former Employee</option>
                    </Field>
                    <ErrorMessage name="currentEmployee" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-gray-700">Employment Type*</label>
                    <Field as="select" name="employmentType" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  ">
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                    </Field>
                    <ErrorMessage name="employmentType" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700">Department*</label>
                    <Field name="department" className="input-field mt-2 w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring  focus:border-pink-600 text-gray-700  " placeholder="Department" />
                    <ErrorMessage name="department" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-between items-center">
                    <button
                    type="submit"
                    className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    disabled={isSubmitting}
                    >
                    Submit Anonymously
                    </button>
                </div>
                </Form>
            )}
            </Formik>

    </div>
  </div>
  )
}

export default RateyourCompany

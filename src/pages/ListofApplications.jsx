import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
//jobid
const ListofApplications = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);

    const handleChat = (id) => {
        try{
            setLoading(true);
            const response = axios.post("http://localhost:8050/api/v1/messages/add-conversation",{
                applicationId: id
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            if(response.status === 200 || response.status === 201 || response.status === 204){
                setLoading(false);
                toast.success("Conversation created successfully");

                navigate("/chat");
            }else{
                setLoading(false);
                toast.error("Error creating conversation");
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8050/api/v1/applications/allapplications/${id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setLoading(false);
                if(response.status === 200) {
                    setApplications(response.data.applications);
                    console.log(response);
                    toast.success("Applications fetched successfully");
                }else{
                    setApplications([]);
                    toast.error("No applications found");
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error("Error fetching applications");
            }
        }

        fetchApplications();
    }, [id]);
  return (
    <>
     {loading && <Spinner/>}
     <div className="p-4 mt-4 ">
            <h2 className="text-2xl font-bold mb-4 text-center">Applications for Job</h2>
            {applications?.length === 0 ? (
                <p>No applications submitted for this job.</p>
            ) : (
                <ul className="space-y-4">
                    {applications?.map(application => (
                        <li key={application._id} className="border p-4 flex flex-row gap-4 items-center justify-between rounded-md shadow-md">
                            <div>
                            <p><strong>Name:</strong> {application.name}</p>
                            <p><strong>Email:</strong> {application.email}</p>
                            <p><strong>Phone:</strong> {application.phone}</p>
                            <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
                            <a
                                href={application.resume.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Resume
                            </a>
                            </div>
                            <div className="mt-4">
                        
                                <button 
                                    onClick={() => handleChat(application._id)}
                                    className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                                >
                                    Chat with {application.name}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
  )
}

export default ListofApplications

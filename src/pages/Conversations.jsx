import React from 'react';
import Conversation from '../pages/Conversation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try{
        const response = await axios.get("http://localhost:8050/api/v1/messages/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if(response.status === 200){
          setConversations(response.data.conversations);
          console.log(response.data.conversations);
          toast.success("Conversations fetched successfully");
          setLoading(false);
        }
      }catch(err){
        setLoading(false);
        console.log(err);
        toast.error("Error fetching conversations");
      }
      
    }

    getConversations();
  }, [])

  return (
    <div className='py-2 flex flex-col h-full overflow-auto flex-1 p-2'>
    {loading ? (
      <Spinner />
    ) : (
      conversations.map((conversation) => (
        <Conversation
          key={conversation._id} // Unique key for each conversation
          conversation={conversation} 
          conversationId={conversation._id} // Pass the ID explicitly if needed in the component
        />
      ))
    )}
  </div>

  );
};

export default Conversations;

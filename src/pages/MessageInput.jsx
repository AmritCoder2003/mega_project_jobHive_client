import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useConversation from '../zustand/useConversation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const MessageInput = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const [message, setMessage] = useState(""); 

  const sendMessage = async () => {
    try {
      setLoading(true);
      
      // Sending message inside an object
      const res = await axios.post(
        `http://localhost:8050/api/v1/messages/send/${selectedConversation._id}`, 
        { message },  // This is the key change
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Message sent successfully");
        setMessages([...messages, res.data]);
        setMessage("");  // Clear the input after successful message
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data || error.message);
      toast.error("Error sending message");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    sendMessage();  // Call sendMessage if input is valid
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input 
          type="text" 
          placeholder='Send a message' 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' 
        />

        <button 
          type="submit" 
          className='absolute inset-y-0 end-0 flex items-center p-3'
          disabled={loading}  // Disable button while loading
        >
          {loading ? (
            <IoSend className='w-5 h-5 text-white animate-spin' />
          ) : (
            <IoSend className='w-5 h-5 text-white' />
          )}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;

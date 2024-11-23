import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  useConversation  from '../zustand/useConversation';
import { extractTime } from '../util/extractTime';
const Message = ({ message }) => {
  const {user}=useSelector((state)=>state.user);
  //const {selectedConversation}=useConversation();
  const fromMe=message.sender===user._id;
  const chatClassName= fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const bubbleBgColor = fromMe ? "bg-primary" : "bg-secondary";
  const formatTime = extractTime(message.createdAt);
  const shakeClass= message.shouldShake ? "shake" : "";

  return (
    <>
          <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={profilePic}
                />
              </div>
            </div>
            <div className={`chat-bubble text-white bg-pink-500 ${bubbleBgColor}${shakeClass} `}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center ">{formatTime}</div>
          </div>
      <ToastContainer />
    </>
  );
};

export default Message;

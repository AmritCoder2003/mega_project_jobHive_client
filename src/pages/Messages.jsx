import Message from './Message';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import useConversation from '../zustand/useConversation';
import MessageSkeleton from './MessageSkeleton';
//import { useSocketContext } from '../socket/SocketContext';

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  //const { socket } = useSocketContext(); // Destructure socket from the context

  // const useListenMessage = () => {
  //   useEffect(() => {
  //     // Ensure socket exists before attaching the listener
  //     if (socket) {
  //       socket.on('newMessage', (newMessage) => {
  //         newMessage.shouldShake = true; // Custom property for shaking effect
  //         setMessages((prevMessages) => [...prevMessages, newMessage]); // Update state with new message
  //       });

  //       // Clean up event listener on unmount or when socket changes
  //       return () => {
  //         socket.off('newMessage');
  //       };
  //     }
  //   }, [socket, setMessages]); // Only run when socket or setMessages changes
  // };

  // useListenMessage();

   const [lastMessageRef] = useState(React.createRef());

  useEffect(() => {
    setLoading(true);

    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8050/api/v1/messages/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (res.status === 200) {
          setMessages(res.data.messages); 
          setLoading(false);
        } else {
          setLoading(false);
          toast.error('Error fetching messages');
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error('Error fetching messages');
      }
    };

    if (selectedConversation?._id) {
      getMessages(); // Fetch messages only if selectedConversation exists
    }
  }, [selectedConversation?._id, setMessages]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

import React from 'react';
import useConversation from '../zustand/useConversation';
//import { useSocketContext } from '../socket/SocketContext';

const Conversation = ({ conversation, conversationId }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversationId;
  //const { onlineUsers } = useSocketContext();
 // const isOnline = onlineUsers.includes(conversationId);

  // Add checks for conversation and participants
  const participantName = conversation?.participants?.[1]?.name
    ? conversation.participants[1].name.toUpperCase()
    : "Unknown User"; // Fallback to avoid crash

  return (
    <div
      className={`flex gap-6 h-12 items-center p-4 py-1 hover:bg-pink-900 border border-pink-500 rounded-lg cursor-pointer
      ${isSelected ? 'bg-pink-500' : ''}`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-white'>
            {participantName} {/* Safely render participant's name */}
          </p>
        </div>
      </div>
      {/* Render divider only if conversationId is provided */}
      {!conversationId && <div className='divider my-0 py-0 h-1' />}
    </div>
  );
};

export default Conversation;

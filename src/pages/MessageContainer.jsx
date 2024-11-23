import React, { useEffect } from 'react'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from "react-icons/ti";
import useConversation from '../zustand/useConversation';
import { useSelector } from 'react-redux';
const MessageContainer = () => {
  const {selectedConversation,setSelectedConversation} = useConversation();

  useEffect(() => {
    setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className='w-full flex flex-col ' >
      {!selectedConversation ? <NoChatSelected /> : (
        <>
        <div className='bg-white rounded-lg h-10 text-lg flex items-center  p-6 mb-2'  >
        <span className='label-text' >
          To: {selectedConversation?.participants[1].name}
        </span>
        <span className='text-pink-500 font-bold ' >
          {selectedConversation?.name}
        </span>
      </div>
     
      <Messages />
      <MessageInput />
        </>
      )}


    </div>
  )
}



export default MessageContainer

const NoChatSelected = () => {
	//const { authUser } = useAuthContext();
  const user = useSelector((state) => state.user );

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome {user?.name} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
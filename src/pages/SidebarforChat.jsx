import React from 'react';
import Conversations from '../pages/Conversations';

const SidebarforChat = () => {
  return (
    <div className='border-r w-1/5 border-r-2 bg-pink-700 border-white-500 p-4 flex flex-col'>
      <div className='divider px-3 py-2 text-white text-xl flex justify-center items-center bg-pink-700'>
        Recruiters
      </div>
      <Conversations />
    </div>
  );
};

export default SidebarforChat;
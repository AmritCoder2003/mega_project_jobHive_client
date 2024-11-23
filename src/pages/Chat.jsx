import React from 'react'
import SidebarforChat from '../pages/SidebarforChat'
import MessageContainer from '../pages/MessageContainer'
const Chat = () => {
    return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			< SidebarforChat/>
			<MessageContainer />
		</div>
	);
}

export default Chat

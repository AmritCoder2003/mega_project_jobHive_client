// import { createContext, useContext, useState, useEffect } from "react";
// import { io } from 'socket.io-client';
// import { useSelector } from "react-redux";

// const SocketContext = createContext();

// export const useSocketContext = () => {
//     return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const { user } = useSelector((state) => state.user); // Fetch user from Redux state

//     useEffect(() => {
//         // Initialize socket connection only if user exists
//         if (user) {
//             const newSocket = io("http://localhost:8050", {
//                 query: {
//                     userId: user._id,
//                 },
//             });

//             // Set the initialized socket
//             setSocket(newSocket);

//             // Listen for "getOnlineUsers" event
//             newSocket.on("getOnlineUsers", (users) => {
//                 setOnlineUsers(users);
//             });

//             // Cleanup on component unmount or when the user changes
//             return () => {
//                 newSocket.close();
//                 setSocket(null); // Clear socket when closing
//             };
//         }

//         // If there's no user, ensure socket is closed
//         if (!user && socket) {
//             socket.close();
//             setSocket(null);
//         }

//     }, [user]);

//     return (
//         <SocketContext.Provider value={{ socket, onlineUsers }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

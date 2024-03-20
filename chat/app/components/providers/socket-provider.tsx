'use client'
import { io as ClientIO } from "socket.io-client";
import { useContext, useEffect, useState, createContext } from "react";
import { getCookie } from "cookies-next";
import { Toaster } from "@/app/lib/toast";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
})

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_BACKEND_API_URL,{
            query: {
                token: getCookie('accessToken')
            }
        });

        socketInstance.on('connect', () => {
            setIsConnected(true)
        })

        socketInstance.on('disconnect', () => {
            setIsConnected(false)
        })

        socketInstance.on('newChat',(res:any)=>{
            Toaster('success','someone create chat with you')
          })

        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}
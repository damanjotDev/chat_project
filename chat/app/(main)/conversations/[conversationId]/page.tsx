'use client'
import React, { useEffect } from "react";
import ConversationPage from "../../components/conversations/conversation";
import Header from "../../components/conversationId/header";
import Body from "../../components/conversationId/body";
import Form from "../../components/conversationId/form";
import { useSocket } from "@/app/components/providers/socket-provider";
import useMessageStore from "@/app/store/message-store";

interface IParams {
  conversationId: string;
}

function ConversationId({ params }: { params: IParams }) {
  const { socket } = useSocket();
  const { setMesssage, setTyping, setMesssages } = useMessageStore();


  useEffect(() => {

    setTyping(null);

    if (socket) {
      socket.on('typing', (res: any) => {
        setTyping(res?.conversationId)
      })

      socket.on('stopTyping', (res: any) => {
        setTyping(null)
      })

      socket.on('messageReceived', (res: any) => {
        setMesssage(res)
      })

    }

    return () => {
      setMesssages([])
      socket?.off('typing');
      socket?.off('stopTyping');
      socket?.off('messageReceived');
    };

  }, [socket])

  return (
    <div
      className="
      h-full
      flex
      flex-row
    "
    >
      <div className="hidden lg:block ">
        <ConversationPage />
      </div>

      <div
        className="
          h-full
          flex
          flex-col
          w-full
          "
      >
        <Header />
        <Body />
        <Form />

      </div>
    </div>
  );
}

export default ConversationId;

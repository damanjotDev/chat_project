'use client'
import { useSocket } from "@/app/components/providers/socket-provider";
import useConversation from "@/app/hooks/useConversation";
import { Input } from "@/components/ui";
import React, { useRef, useState } from "react";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { createMessage } from "../../lib/conversations/service";
import useMessageStore from "@/app/store/message-store";
import { useConversationUser } from "@/app/hooks/useConversationUser";
import useConversationStore from "@/app/store/conversation-store";
import useUserStore from "@/app/store/user-store";
let id: any = null;
function Form() {

  const [message, setMessage] = useState('')
  const { socket } = useSocket();
  const { conversationId } = useConversation();
  
  const {conversation} = useConversationStore();
  const {user} = useUserStore();
  const {conversationUser} = useConversationUser(conversation,user)
  const { isLoading, setLoading, setMesssage, setIndividualMessage} = useMessageStore();
  
  const [localTyping, setLocalTyping] = useState(false)

  const handleChange = (e: any) => {
    setMessage(e.target.value);

    if (socket) {

      if (!message) {
        setLocalTyping(true)
        socket.emit('typing', {conversationId:conversation?._id,receiverId:conversationUser?._id});
      }

      if (id) clearTimeout(id)

      id = setTimeout(() => {
        socket.emit('stopTyping', {conversationId:conversation?._id,receiverId:conversationUser?._id})
      }, 4000)

    }
  }

  const sendMessage = () => {
    setIndividualMessage(message)
    createMessage(
      { 
        body: message, 
        chatId: conversationId, 
        userIds: conversation?.userIds?.map((item)=>item.userId), 
        video:null,
        image:null,
        file:null
      }, setMesssage, setIndividualMessage, setLoading);
    setMessage('')
  }


  return (
    <div
      className="
      bg-accent
      px-3
      py-3
      border-t-[1px]
      flex
      flex-row
      items-center
      space-x-3
      "
    >
      <HiPhoto size={30} />
      <div
        className="
        flex-1
        "
      >
        <Input
          className="
          bg-background
          rounded-full
          hover:bg-background
          focus:border-gray-500"
          value={message}
          onChange={handleChange}
          disabled={isLoading?true : false}
        />
      </div>
      <div
        className="
        rounded-full 
        p-2 
        bg-background"
        onKeyPress={sendMessage}
        onClick={sendMessage}
        >
        <HiPaperAirplane size={18} />
      </div>
    </div>
  );
}

export default React.memo(Form);

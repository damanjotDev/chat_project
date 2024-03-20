import api from "@/app/axios";
import { Routes } from "@/app/lib/constant";
import { ErrorResponse } from "@/app/lib/error-response-model";
import { SuccessResponse } from "@/app/lib/response-model";
import { Toaster } from "@/app/lib/toast";
import { GetConversationResposeModel } from "./conversation-model";
import { GetMessageResposeModel } from "./message-model";

export const createConversation = async<Payload>(
    payload: Payload,
    setState: Function,
    setLoading: Function,
    navigate: Function
) => {
    try {

        setLoading(true)
        const {data} = await api.post<SuccessResponse<GetConversationResposeModel>>(`/chat/create`,payload);
        
        navigate(`${Routes.Conversations}/${data.data._id}`)
        setState(data.data)
        
        setLoading(false)
        Toaster('success', data.message);
       
    } catch (err) {
        setLoading(false)

        const error = err as ErrorResponse;
         Toaster('error',error?.data?.message || error.message);
    }
};

export const getUserConversations = async<Payload>(
    setState: Function,
    setLoading: Function,
    // navigate: Function
) => {
    try {
        setLoading(true)

        const {data} = await api.get<SuccessResponse<GetConversationResposeModel[]>>(`/chat/chat-by-user-id/${null}`);
        setState(data.data)

        // Toaster('success', data.message);
        setLoading(false)

        // navigate(`${Routes.Conversations}/${data.data._id}`)

    } catch (err) {
        setLoading(false)

        const error = err as ErrorResponse;
         Toaster('error',error?.data?.message || error.message);
    }
};

export const createMessage = async<Payload>(
    payload: Payload,
    setState: Function,
    setLoading: Function,
    // navigate: Function
) => {
    try {

        setLoading('message')
        const {data} = await api.post<SuccessResponse<GetMessageResposeModel>>(`/message/create`,payload);
        
        await setState(data.data)
       
        setLoading(false)
        // navigate(`${Routes.Conversations}/${data.data._id}`)
        
    } catch (err) {
        setLoading(false)

        const error = err as ErrorResponse;
         Toaster('error',error?.data?.message || error.message);
    }
};

export const getMessagesByChatId = async<Payload>(
    chatId: string | any,
    setState: Function,
    setLoading: Function,
    // navigate: Function
) => {
    try {

        setLoading(true)
        const {data} = await api.get<SuccessResponse<GetMessageResposeModel[]>>(`/message/by-chat-id/${chatId}`);
        
        await setState(data.data)
        // Toaster('success', data.message);
       
        setLoading(false)
        // navigate(`${Routes.Conversations}/${data.data._id}`)
        
    } catch (err) {
        setLoading(false)

        const error = err as ErrorResponse;
         Toaster('error',error?.data?.message || error.message);
    }
};
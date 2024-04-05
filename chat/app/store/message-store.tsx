import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { MesssageModal } from '../(main)/lib/conversations/message-model'


interface MesssageState {
    isLoading: boolean | string,
    message: MesssageModal | null,
    messages: MesssageModal[] | null,
    typing: null | string,
    setLoading: (value: boolean) => void,
    setMesssage: (data: MesssageModal) => void,
    setIndividualMessage: (data: any) => void,
    setMesssages: (data: MesssageModal[]) => void,
    setTyping: (Id: null | string) => void,
}

const useMessageStore = create<MesssageState>()(persist(
    (set) => ({
        isLoading: false,
        message: null,
        messages: null,
        typing: null,
        setLoading: (value) => set((state) => ({ isLoading: value })),
        setIndividualMessage: (value) => set((state)=>({message: value})),
        setMesssage: (data) => set((state) => ({ isLoading: false, messages: state.messages ? [...state.messages, data] : [data] })),
        setMesssages: (data) => set((state) => ({ isLoading: false, messages: data })),
        setTyping: (value) => set((state) => ({ typing: value }))
    }),
    {
        name: 'message store'
    }
))

export default useMessageStore
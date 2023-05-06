import {defineStore} from "pinia";

export const useChatStore = defineStore('chatStore', {
    state() {
        return {
            interlocutor: {} as PersonPreview
        }
    },
    getters: {
        getInterlocutor(state):PersonPreview | null {
            if(Object.keys(state.interlocutor).length === 0) return null;
            return state.interlocutor
        },
    },
    actions: {
        setTheInterlocutor(interlocutor: PersonPreview) {
            this.interlocutor = interlocutor;
        }
    }
})

export const socketStore = defineStore('socketStore', {
    state() {
        return {
            activeTemplate: 'messages'
        }
    },
    actions: {
        sendMessage(title: string, message: string, userId: string, typeMessage: string) {
            const {$io} = useNuxtApp();
            const user = useSupabaseUser();

            const data:MessageNotification = {
                title: title,
                userId: userId,
                message: message,
                typeMessage: typeMessage,
                nameUser: useSupabaseUser().value?.user_metadata.name,
                avatarUser: useSupabaseUser().value?.user_metadata.avatars
            }
            $io.emit("message", data)
        }
    }
})
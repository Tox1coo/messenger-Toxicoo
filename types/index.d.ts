import {useSupabaseUser} from "#imports";

declare global {
    interface AuthUser {
        email: string,
        nickname: string,
        password: string,
        repeatPassword: string
    }
    interface LoginUser {
        email: string,
        password: string,
    }
    interface Client {
        sid: string,
        uid: string,
    }

    interface MessageNotification {
        title: string,
        userId: string,
        message: string,
        typeMessage: string,
        nameUser:string,
        avatarUser: string,
    }

    interface PersonPreview {
        id: number,
        name: string,
        userId: string,
        avatar: string,
        statusFriend: string,
        statusOnline: boolean
    }

    interface FriendPreview {
        id: number,
        user_id: string,
        friend_id: string,
        status: string
    }

    interface LinkNavBar {
        icon_name: string,
        link_page: string,
        title: string,

    }

    interface ButtonAction{
        tool_tip: string,
        type: string,
        icon_name: string,
        size: string,
        class_name: string,
    }

    interface BodyFriends {
        status: string,
        user_id?: number,
        friend_id?: number,
        friend_uuid: string,
        user_uuid?: string
    }

    interface DiscussionMessage {
        mid: number,
        sender_id:string,
        content: string,
        time: string,
        type: string,
        read_status: boolean
    }
}

export  default {};
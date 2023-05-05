import {createClient, User} from "@supabase/supabase-js";
import {useDatabaseStore} from "~/store/database/db";
import {useSupabaseClient, useSupabaseUser} from "#imports";
import {$fetch} from "ofetch";

export const userStore = defineStore('user', {
    state() {
        return {
            isAuthorized: false as boolean,
            errorMessage: "Эта электронная почта уже используется" as string,
            correctMessage: "Все прошло успешно!" as string,
            userAvatar: "" as string,
            friendListPreview: [] as Array<FriendPreview>,
            friendList: [] as Array<PersonPreview>,
            friendName: "" as string,
            buttonActions: [
                {
                    type: 'friends',
                    tool_tip: "Удалить из друзей",
                    icon_name:"uil:user-check",
                    size: '20',
                    class_name: 'action__friend--friends',
                },
                {
                    type: 'pending',
                    tool_tip: "Отменить заявку в друзья",
                    icon_name:"mdi:account-alert",
                    size: '20',
                    class_name: 'action__friend--waiting'
                },
                {
                    type: 'strangers',
                    tool_tip: "Добавить в друзья",
                    icon_name:"icomoon-free:user-plus",
                    size: '20',
                    class_name: ''
                },
                {
                    type: 'received',
                    tool_tip: "Принять заявку в друзья",
                    icon_name:"uil:user-arrows",
                    size: '20',
                    class_name: 'action__friend--waiting'
                }
            ] as ButtonAction[],
            messageAction: {
                type: 'message',
                tool_tip: "Отправить сообщение",
                icon_name: 'material-symbols:attach-email-outline',
                class_name: "",
                size: '20'
            } as ButtonAction
        }
    },
    getters: {
        getAllFriends: state => (typeFriend: string = "friends") => {
            return state.friendList.filter((person) => person.statusFriend === typeFriend)
        },
        getButton: state => (typePerson: string = "friends") => {
            return state.buttonActions.filter((button) => button.type === typePerson)[0]
        }
    },
    actions: {
        async signIn(loginUser: LoginUser):Promise<boolean> {
            const client = useSupabaseClient();
            const {data, error} = await client.auth.signInWithPassword({
                email: loginUser.email,
                password: loginUser.password,
            })
            if(error) {
                if (error.status == 400) {
                    this.errorMessage = "Неверные данные для входа";
                }
                return true
            }
            this.correctMessage= 'Вы успешно зашли в аккаунт!';
            const userSupabase = useSupabaseUser();
            setTimeout(() => {
                this.getAvatarUser(userSupabase);
                this.isAuthorized = true;
            }, 500)
            return false
        },
        async signUp(authUser: AuthUser):Promise<boolean> {
            const client = useSupabaseClient()
            const db = useDatabaseStore();
            const dublicateEmail:boolean = await db.checkEmailUser(authUser.email);
            if(!dublicateEmail) {
                const {data: user, error} = await client.auth.signUp({
                    email: authUser.email,
                    password: authUser.password,
                    options: {
                        data: {
                            name: authUser.nickname,
                            avatars: 'default/avatars.jpg',
                        }
                    }
                })
                if(error) {
                    this.errorMessage = error.message;
                    return true
                }
                // @ts-ignore
                const errorUser:boolean = await db.setUserEmail(authUser.email, user.user?.id, authUser.nickname);
                if(errorUser) {
                    this.errorMessage = 'При регистрации возникла неизвестная ошибка, повторите попытку позже!';
                    return true;
                }
            } else {
                this.errorMessage = 'Эта электронная почта уже используется';
                return true;
            }
            return false
        },
        async actionWithFriends(status:string, user_id: number, friendUUID: string):Promise<void> {
            console.log(status, user_id, friendUUID)
            const supabase = useSupabaseClient();
            const {data, error} = await supabase.from('friends').select('id').eq('friend_id', useSupabaseUser().value?.id).eq('user_id', friendUUID)
            console.log(data)
            let errorResponse = null
            let body: BodyFriends;
            if(data?.length) {
                body = {
                    status: status,
                    user_id: user_id,
                    friend_id: data[0].id,
                    friend_uuid: friendUUID,
                    user_uuid: useSupabaseUser().value?.id,
                }
            } else {
                body = {
                    status: status,
                    friend_uuid: friendUUID,
                    user_uuid: useSupabaseUser().value?.id,
                }
            }
            const response = await $fetch('/api/friends', {
                method:"POST",
                body: body
            })
            errorResponse = response.errorResponse;
            console.log(errorResponse)
            if(errorResponse === null) {
                await this.getFriendsUser().finally(async() => {
                    if(status === "sendRequest") {
                        await useDatabaseStore().searchPerson();
                    }
                })

            }
        },
        toAcceptRequestInFriends(friendId: number, friendUUID: string):void {
            console.log(friendId)
        },
        deleteFriend(friendId: number, friendUUID: string):void {
            console.log(friendId)
        },
        sendRequestInFriends(friendId: number, friendUUID: string):void {
            console.log(friendId)
        },
         async getFriendsUser():Promise<void> {
            const user = useSupabaseUser();
            await $fetch('/api/friends',{
                method: "get"
            }).then((response) => {
                this.friendList = response.friends
                console.log(response.friends)
            })

        },
        async getSubscrbires():Promise<void> {
            const supabase = createClient(useRuntimeConfig().public.supabase.url, useRuntimeConfig().public.supabase.key);
            const user = useSupabaseUser();
            const {data, error} = await supabase.from('friends').select().eq('user_id',  user.value?.id).eq('status', 'received');
            console.log(data)
        },
        async logOutUser():Promise<void> {
            const client = useSupabaseClient()
            const {error} = await client.auth.signOut();
            this.userAvatar = '';
            this.isAuthorized = false;
        },

        async getAvatarUser(user:Ref<User | null>):Promise<void> {
            const client = useSupabaseClient()
            const {data} =  client.storage.from('avatars').getPublicUrl(user.value?.user_metadata.avatars, {
                transform: {
                    width: 100,
                    height: 100,
                    quality: 80
                }
            })
            this.userAvatar = data.publicUrl
        }
    }
})
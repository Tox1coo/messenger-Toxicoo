import {createClient} from "@supabase/supabase-js";
import {Client} from "socket.io/dist/client";
import {Socket} from "socket.io-client";
import {userStore} from "~/store/user/user";

export const useDatabaseStore = defineStore('database', {
    state() {
        return {
            personList: [] as Array<PersonPreview>,
            personName: "" as string,
        }
    },
    getters: {
        getPersonList():Array<Object> {
            return this.personList;
        }
    },
     actions: {
        async checkEmailUser(email: string):Promise<boolean> {
            const supabase = createClient(useRuntimeConfig().public.supabase.url, useRuntimeConfig().public.supabase.key);
            const {data, error} = await supabase.from('info_users').select('email').eq('email', email);
            return data?.length !== 0
        },
         async setUserEmail(userEmail:string, userId: string | null, name: string):Promise<boolean> {
             const supabase = createClient(useRuntimeConfig().public.supabase.url, useRuntimeConfig().public.supabase.key);
             const { error } = await supabase
                 .from('info_users')
                 .insert({email: userEmail, uid:userId, avatar: "default/avatars.jpg", name: name })
             if(error) {
                 return true
             }
             return false;
         },
         changeStatusUser(clients: Client<any, any, any>) {

         },
         async searchPerson():Promise<void> {
             const userStoreBase = userStore();
             const personPreview:PersonPreview[] = [];
             const supabase = createClient(useRuntimeConfig().public.supabase.url, useRuntimeConfig().public.supabase.key);
             const user = useSupabaseUser();
             const {data, error} = await supabase.from("info_users").select("id, uid, avatar, name, online").ilike("name", `%${this.personName}%`).neq("uid", user.value?.id);
             if(data?.length) {
                 data?.forEach(person => {
                     let personPreviewItem:PersonPreview = {
                         id: person.id,
                         name: person.name,
                         avatar: person.avatar,
                         userId: person.uid,
                         statusOnline: person.online,
                         statusFriend: "strangers"
                     }
                     console.log(userStoreBase.getAllFriends())
                     userStoreBase.friendList.forEach((friend) => {
                         if(person.uid === friend.userId) {
                             personPreviewItem.statusFriend = friend.statusFriend
                         }
                     })
                     personPreview.push(personPreviewItem);
                 })
             }
             console.log(data)
             this.personList = personPreview;
         },
         async getAvatarUser(avatar: string):Promise<string> {
             const client = useSupabaseClient()
             const {data} =  client.storage.from('avatars').getPublicUrl(avatar)
             return data.publicUrl
         }
     }
})
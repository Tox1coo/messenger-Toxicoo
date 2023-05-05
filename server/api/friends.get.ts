import {serverSupabaseClient, serverSupabaseUser} from "#supabase/server";
import {createClient} from "@supabase/supabase-js";
/*interface friendsResponse {
    status: string,
    info_users: {
        online:boolean,
        uid: string,
        avatar: string,
        name: string,
    }
}*/
export default defineEventHandler(async (event) => {
    const client = createClient(useRuntimeConfig().public.supabase.url, useRuntimeConfig().public.supabase.key)
    const supabase = serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    const friends:PersonPreview[] = []
    if(user !== null) {
        const {data, error} = await supabase.from('friends').select(`
            id,
            status,
            info_users!friends_friend_id_fkey(uid,avatar, name, online)
            `).eq('user_id', user.id);

        if(data !== null) {
            data.forEach((friendItem:any) => {
                    const friend:PersonPreview = {
                        id: friendItem.id,
                        statusFriend: friendItem.status,
                        statusOnline: friendItem.info_users.online,
                        userId: friendItem.info_users?.uid,
                        avatar: friendItem.info_users?.avatar,
                        name: friendItem.info_users?.name,
                    }
                friends.push(friend);
            })
        }
    }

    return {
        friends: friends
    }
})
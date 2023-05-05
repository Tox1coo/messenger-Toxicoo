import {serverSupabaseClient} from "#supabase/server";
import {PostgrestError} from "@supabase/postgrest-js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const supabase = serverSupabaseClient(event)
    console.log(body)
    let errorResponse:PostgrestError | null = null;
    if(body.status === 'acceptRequest') {
        const {error} = await supabase.from('friends').upsert([
            // @ts-ignore
            {id: body.user_id, status: "friends", user_id: body.user_uuid, friend_id: body.friend_uuid},
            // @ts-ignore
            {id: body.friend_id, status: "friends", user_id: body.friend_uuid, friend_id: body.user_uuid},
        ])
        errorResponse = error
    } else if(body.status === 'cancelRequest') {
        const {error} = await supabase.from('friends').delete().in('id', [body.friend_id, body.user_id])
        errorResponse = error
    } else if(body.status === 'deleteFriend') {
        const {error} = await supabase.from('friends').upsert([
            // @ts-ignore
            {id: body.user_id, status: "received", user_id: body.user_uuid, friend_id: body.friend_uuid},
            // @ts-ignore
            {id: body.friend_id, status: "pending", user_id: body.friend_uuid, friend_id: body.user_uuid},
        ])
        errorResponse = error
    } else if(body.status === 'sendRequest') {
        console.log(2)
        const {error} = await supabase.from('friends').insert([
            // @ts-ignore
            {status: "pending", user_id: body.user_uuid, friend_id: body.friend_uuid},
            // @ts-ignore
            {status: "received", user_id: body.friend_uuid, friend_id: body.user_uuid},
        ])
        errorResponse = error
    }
    return {
        errorResponse
    }
})
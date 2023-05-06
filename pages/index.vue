<template>
  <BlockChats/>
  <DiscussionBlock v-if="chatStore.getInterlocutor !== null" :interlocutor="chatStore.getInterlocutor"/>
</template>

<script setup lang="ts">

import {useChatStore} from "~/store/chat/chat";

const { $io } = useNuxtApp();
const user = useSupabaseUser();
const chatStore = useChatStore()
useHead({
  title: "Сообщения"
})

onMounted(() => {
  $io.emit("userConnected", user.value?.id)
  chatStore.setTheInterlocutor({
    name: "Toxicoo",
    statusOnline: false,
    statusFriend: "received",
    userId: "dasdasdasdsa",
    avatar: 'default/avatars.jpg',
    id: 1
  })
})

/*const sendMessage = () => {
  console.log('Click');
  $io.emit("message", "new message sent");
  $io.on("message", (mes:string) => {
    console.log(mes)
  });
  $io.emit('sendMessage', () => console.log("log"));


};*/


</script>

<style lang="scss" scoped>

</style>
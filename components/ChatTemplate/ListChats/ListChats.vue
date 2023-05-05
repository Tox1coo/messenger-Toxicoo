<template>
<div class="chats-list">
  <h2 class="subtitle">Сообщения</h2>

  <ChatPreview v-for="chat in arrayChats" :key="chat.id" :chat-info="chat"/>
</div>
</template>

<script lang="ts" setup>
const arrayChats = [
  {
    id: 1,
    avatar: "default/avatars.jpg",
    lastMessage: "Привет, как дела?",
    isRead: true,
    timeMessage: "10:25",
    nicknameUser: "Юджин"
  },
  {
    id:2,
    avatar: "default/avatars.jpg",
    lastMessage: "Что ты делаешь?",
    isRead: false,
    timeMessage: "15:25",
    nicknameUser: "Lida"
  },
  {
    id:3,
    avatar: "default/avatars.jpg",
    lastMessage: "Hui",
    isRead: true,
    timeMessage: "16:25",
    nicknameUser: "Юджин сагаз"
  },
  {
    id:4,
    avatar: "default/avatars.jpg",
    lastMessage: "Урод ты такой, просто урод, хуесосвфджлвыфловыфовфывфывфвфв",
    isRead: false,
    timeMessage: "23:25",
    nicknameUser: "Лида Юджин"
  },
  {
    id:5,
    avatar: "default/avatars.jpg",
    lastMessage: "а",
    isRead: true,
    timeMessage: "20:25",
    nicknameUser: "Юджин"
  },
]
</script>

<style lang="scss" scoped>
.chats-list {
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 2rem;
  .subtitle {
    margin-bottom: 2rem;
    margin-left: 2rem;
  }
}
</style>
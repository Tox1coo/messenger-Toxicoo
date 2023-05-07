<template>
  <div class="discussion">
    <ProfileInterlocutor :person="interlocutor" />
    <Discussion :message-list="messagesList"/>
    <DiscussionWrite />
  </div>

</template>

<script setup lang="ts">
import {useChatStore} from "~/store/chat/chat";
import {PropType} from "@vue/runtime-core";

const chatStore = useChatStore();
defineProps({
  interlocutor: {
    type: Object as PropType<PersonPreview>
  }
})

const messagesList:DiscussionMessage[] = [
  {
    mid: 1,
    sender_id: "dasdasdasdsa",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Привет, как дела?",
    read_status: true
  },
  {
    mid: 2,
    sender_id: "8a6efc05-2eba-4c99-bab2-9355950685cd",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Привет, да хорошо, а у тебя?",
    read_status: true
  },
  {
    mid: 3,
    sender_id: "dasdasdasdsa",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "У меня тоже все хорошо",
    read_status: true
  },
  {
    mid: 4,
    sender_id: "8a6efc05-2eba-4c99-bab2-9355950685cd",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?",
    read_status: false
  },
  {
    mid: 1,
    sender_id: "dasdasdasdsa",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Привет, как дела?",
    read_status: true
  },
  {
    mid: 2,
    sender_id: "8a6efc05-2eba-4c99-bab2-9355950685cd",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Привет, да хорошо, а у тебя?",
    read_status: true
  },
  {
    mid: 3,
    sender_id: "dasdasdasdsa",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "У меня тоже все хорошо",
    read_status: true
  },
  {
    mid: 4,
    sender_id: "8a6efc05-2eba-4c99-bab2-9355950685cd",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?",
    read_status: false
  },
  {
    mid: 1,
    sender_id: "dasdasdasdsa",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Привет, как дела?",
    read_status: true
  },
  {
    mid: 2,
    sender_id: "8a6efc05-2eba-4c99-bab2-9355950685cd",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Привет, да хорошо, а у тебя?",
    read_status: true
  },
  {
    mid: 3,
    sender_id: "dasdasdasdsa",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "У меня тоже все хорошо",
    read_status: true
  },
  {
    mid: 4,
    sender_id: "8a6efc05-2eba-4c99-bab2-9355950685cd",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?",
    read_status: false
  },
  {
    mid: 1,
    sender_id: "dasdasdasdsa",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Привет, как дела?",
    read_status: true
  },
  {
    mid: 2,
    sender_id: "8a6efc05-2eba-4c99-bab2-9355950685cd",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Привет, да хорошо, а у тебя?",
    read_status: true
  },
  {
    mid: 3,
    sender_id: "dasdasdasdsa",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "У меня тоже все хорошо",
    read_status: true
  },
  {
    mid: 4,
    sender_id: "8a6efc05-2eba-4c99-bab2-9355950685cd",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    type:'message',
    content: "Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?Что делаешь?",
    read_status: false
  },
]
</script>

<style scoped>
.discussion {
  flex: 1 0 70%;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div class="chat">
    <div class="chat-conversation">
      <Message v-for="message in messageList" :key="message.mid" :message="message" :is-received="isReceivedMessage(message.sender_id)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
const user = useSupabaseUser();
const props=defineProps({
  messageList: {
    type: Array as PropType<DiscussionMessage[]>
  }
})
const isReceivedMessage = (id:string):boolean => user.value?.id !== id
</script>

<style lang="scss" scoped>
.chat {
  flex:1;
  width: 100%;
  position: relative;
  background-color: $chat-background;
  &-conversation {
    padding: 0 1.2rem 3rem 1.2rem;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 100%;
  }
}
</style>
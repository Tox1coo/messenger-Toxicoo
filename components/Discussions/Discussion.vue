<template>
  <div class="chat">

  </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

defineProps({
  messageList: {
    type: Array as PropType<DiscussionMessage[]>
  }
})
</script>

<style lang="scss" scoped>
.chat {
  height: 100%;
  width: 100%;
  background-color: $chat-background;
}
</style>
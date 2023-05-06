<template>
  <div class="discussion">
    <ProfileInterlocutor :person="interlocutor" />
    <Discussion />
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
</script>

<style scoped>
.discussion {
  flex: 1 0 70%;
}
</style>
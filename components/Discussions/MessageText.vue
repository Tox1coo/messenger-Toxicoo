<template>
  <div class="message__content">
    {{message.content}}
  </div>

</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

defineProps({
  message: {
    type: Object as PropType<DiscussionMessage>
  }
})
</script>

<style lang="scss" scoped>

</style>
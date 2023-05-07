<template>
  <div :class="{'message-received': isReceived}" class="message">
    <MessageText :message="message"/>
    <div class="message-info">
      <div v-if="!isReceived" class="message-info__read">
        <TheReadStatus  :count="2" :is-read="message.read_status"/>
      </div>
      <div class="message-info__time">
        {{message.time}}
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  message: {
    type: Object as PropType<DiscussionMessage>,
    required:true
  },
  isReceived: {
    type: Boolean,
    default: false
  }
})

// const getTime = computed<number>(() => new Date().getTime(props.message?.time))
</script>

<style lang="scss" scoped>
.message {
  background-color: $send-message-background;
  width: fit-content;
  max-width: 40rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border-top-right-radius: 0;
  position: relative;
  margin-left: auto;
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  &-received {
    background-color: $received-message-background;
    border-top-left-radius: 0;
    border-top-right-radius: 1.5rem;
    margin-right: auto;
    margin-left: 0;
    color: $text-received-color;
    .message-info {
      justify-content: flex-end;
      &__time {
      }
    }
  }
  &-info {
    position: absolute;
    bottom: -2rem;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    &__read {
      display: flex;
      gap: 0.2rem
    }
    &__time {
      color: $text-received-color;
    }
  }
}
</style>
<template>
  <div class="chat-preview">
    <TheAvatar :avatar="chatInfo.avatar"/>
    <div class="chat-preview__info preview-info">
      <div class="preview-info__block preview-info__block--messages">
        <h3 class="preview-info__nickname">{{chatInfo.nicknameUser}}</h3>
        <p class="preview-info__message">{{croppedMessage}}</p>
      </div>
      <div class="preview-info__block preview-info__block--flex">
          <div class="preview-info__status">
            <TheReadStatus :is-read="chatInfo.isRead" :count="2" />
          </div>
          <div class="preview-info__time">
            <span>{{chatInfo.timeMessage}}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheReadStatus from "~/components/UI/TheReadStatus.vue";

const props = defineProps({
  chatInfo: {
    type: Object,
    required:true
  }
})

const croppedMessage = computed<string>(() => {
  return props.chatInfo?.lastMessage.length > 25 ? props.chatInfo?.lastMessage.substring(0,25).concat('...') : props.chatInfo?.lastMessage;
})
</script>

<style lang="scss" scoped>
.chat-preview {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1.5rem 2rem;
  transition: .2s ease background-color;
  &:hover {
    background-color: rgba(#F5F6F8, 0.2);
  }
  .avatar {
    flex: 0 0 20%
  }
  &__info {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-left: 1rem;
  }
}
.preview-info {
  &__block {
    &--flex {
      display: flex;
      align-items: center;
    }
    &--messages {
      flex: 0 1 100%
    }
  }
  &__nickname {
    color: $white;
    font-weight: 400;
    font-size: 1.5rem;
  }
  &__message {
    color: $text-received-color;
    font-size: 1.2rem;
  }
  &__status {
    display: flex;
    gap: 0.2rem;
  }
  &__time {
    color: $text-received-color;
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }
}
</style>
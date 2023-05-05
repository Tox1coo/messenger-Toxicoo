<template>
  <Transition name="notification-effect">
    <div v-if="visible" class="notification">
      <div class="notification__body">
        <Icon id="bell" :name="'ic:round-notifications-active'" :size="'30'"></Icon>
        <TheAvatar :visible-online="false" :avatar="dataNotification?.avatarUser"/>
        <div class="notification__info">
          <p class="notification__title">
            {{dataNotification.title}}
          </p>
          <div class="notification__message">
            {{dataNotification?.message}}
          </div>
        </div>
      </div>
      <audio ref="audio" src="/melodichnyiy-zvuk-prishedshey-sms.mp3"  />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {userStore} from "~/store/user/user";

const {$io} = useNuxtApp();
let visible: boolean = $ref(false);
const audio: Ref<HTMLAudioElement | null> = ref<HTMLAudioElement | null>(null);
const props = defineProps({
  dataNotification: {
    type: Object as PropType<MessageNotification>
  },
})

// let title:string = $ref('Новое сообщение от Toxicoo');
let iconName:string = $ref('');
const playAudio = () => {
 setTimeout(() => {
   console.log(audio)
   if(audio.value !== null) {
     audio.value.volume = 0.4;
     audio.value.play();
   }
 },200)

}
onMounted(() => {
  visible = true;
  console.log(2)
  playAudio()
  setTimeout(() => {
    visible = false
  },4500)
  if(props.dataNotification?.typeMessage === 'friend') {
    userStore().getFriendsUser();
  }
})

</script>

<style lang="scss" scoped>

.notification-effect-enter-active {
  transition: scale 0.5s ease-out;
}
.notification-effect-leave-active {
  transition: scale 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.notification-effect-enter-to {
  scale: 1;
  transform-origin: bottom right;
}
.notification-effect-enter-from,
.notification-effect-leave-to{
  scale: 0;
  transform-origin: right;
}
.notification {
  z-index: 1000;
  min-height: 10rem;
  border-radius: 2rem;
  background-color: $chat-background;
  color: $white;
  &__info {

  }
  &__body {
    display: flex;
    position: relative;
    padding: 2rem 2rem 3rem 2rem;
    gap: 1rem;
    #bell {
      position: absolute;
      left: -10px;
      top: -8px;
    }
  }
  &__title{
    color: $primary-accent;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  &__message {
    font-size: 1.4rem;
  }
}
</style>
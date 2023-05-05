<template>
  <NuxtLink :to="linkBar.link_page">
    <div @click="$emit('changeActiveBar', linkBar)" :title="linkBar.title" class="nav-list__item">
        <Icon :name="linkBar.icon_name" :size="'30'"/>
    </div>
  </NuxtLink>

</template>

<script setup lang="ts">
defineProps({
  linkBar: {
    type: Object as () => LinkNavBar,
    required: true
  }
})
  </script>

<style lang="scss" scoped>
%block-effect {
  content: "";
  display: block;
  background-color: rgba( $send-message-background, 0.5);
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%,-50%) scale(0.7);
  width: 8rem;
  height: 8rem;
  animation-name: scale-effect;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-timing-function: linear;
  opacity: 0;
  transition: opacity 0.5s ease-in;
}
.nav-list__item {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: $send-message-background;
  position: relative;
  cursor: pointer;
  z-index: 2;
  &::before {
   @extend %block-effect;
    animation-delay: 0.2s;
  }
  &::after {
    @extend %block-effect;
    animation-delay: 0.5s;
  }
  &:hover {
    &::before, &::after {
      opacity: 1;
    }
  }
}
svg {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes scale-effect {
  0% {
    transform: translate(-50%,-50%) scale(0.7);
  }
  50% {
    transform: translate(-50%,-50%) scale(1);
  }
  100% {
       transform: translate(-50%,-50%) scale(0.7);
     }
}
</style>
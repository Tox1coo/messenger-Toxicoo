<template>
  <div class="interlocutor">
    <div class="interlocutor-info">
      <div class="interlocutor__avatar">
        <TheAvatar :avatar="person.avatar" :online="person.statusOnline" />
      </div>
      <div class="interlocutor__name">
          <p id="name">{{person.name}}</p>
          <p id="typing">Печатает...</p>
      </div>
    </div>
    <div class="interlocutor-storage">
      <Icon :name="'cil:options'" :size="'20'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

defineProps({
  person: {
    type: Object as PropType<PersonPreview>
  }
})
</script>

<style lang="scss" scoped>
.interlocutor {
  padding: 2rem 4rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #36373f;
  &-info {
    display: flex;
    gap: 1.5rem;
  }
  &__name{
    margin-top: 0.5rem;
    #name {
      color: $white;
      font-weight: 500;
      font-size: 1.8rem;
    }
    #typing {
      color: $primary-accent;
      margin-top: 0.2rem;
    }
  }
  &-storage {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 1px solid $white;
    position: relative;
    cursor: pointer;
    color: $white;
    overflow: hidden;
    transition: background-color 0.3s ease, color 0.1s ease 0.1s ;
    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      transition: rotate 0.5s ease;
    }
    &:hover {
      background-color: $white;
      color: #000;
      svg {
        rotate: 360deg;
        transform-origin: bottom;
      }
    }
  }
}
</style>
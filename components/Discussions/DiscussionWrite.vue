<template>
<div class="discussion-write">
  <Icon :name="'ph:paperclip-bold'" :size="'28'"/>
  <TheInputText :placeholder-input="'Введите сообщение'" v-model="message" :is-invalid="true"/>
  <Icon :name="'arcticons:fly-delta'" :size="'28'"/>
</div>
</template>

<script lang="ts" setup>
let message:string = $ref("");
</script>

<style lang="scss" >
  .discussion-write {
    padding: 2rem;
    display: flex;
    gap: 1.5rem;
    color: $white;
    align-items: center;
    div {
      flex: 1;
    }
    & input {
      border-radius: 1.5rem;
      min-height: 5.5rem !important;
      font-size: 1.5rem !important;
    }
  }
</style>
<template>
  <div class="person-list">
    <PersonPreview v-for="user in userList" :key="user.userId" :person="user" />
  </div>

</template>

<script lang="ts" setup>
import {PropType} from "@vue/runtime-core";

defineProps({
  userList: {
    type: Object as PropType<PersonPreview[]>,
    required: true
  }
})
</script>

<style lang="scss" scoped>

</style>
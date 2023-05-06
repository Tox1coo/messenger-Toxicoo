<template>
  <div class="chats-block">
    <UserProfilePreview />
    <Search v-model:search-var="chat"/>
    <ListChats />
  </div>
</template>

<script setup lang="ts">
import Search from "~/components/Search/Search.vue";

let chat:string = $ref('');

</script>

<style lang="scss" scoped>
.chats-block {
  background-color: $primary-background;
  border-right:1px solid #36373f;
  flex: 0 1 25%;
}
</style>
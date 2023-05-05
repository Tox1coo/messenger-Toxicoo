<template>
  <div class="person-preview">
    <TheAvatar :avatar="person.avatar" :online="person.statusOnline"/>
    <div class="person-preview__nickname subtitle">
      {{person.name}}
    </div>
    <div class="person-preview__actions action">
      <div class="action__item action__message">
        <TheButtonAction :button-action="user.messageAction" :person-u-u-i-d="person.userId"/>
      </div>
      <TheButtonAction :button-action="user.getButton(person.statusFriend)" :person-u-u-i-d="person.userId" :person-id="person.id"/>

    </div>
  </div>
</template>

<script setup lang="ts">
import {userStore} from "~/store/user/user";

const user = userStore();
const props = defineProps({
  person: {
    type: Object as () => PersonPreview,
    required:true
  }
})



</script>

<style lang="scss" scoped>
.person-preview {
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  &__nickname {
    flex: 1;
    margin-left: 2rem;
  }
}

.action {
  display: flex;
  gap: 2rem;
}

</style>
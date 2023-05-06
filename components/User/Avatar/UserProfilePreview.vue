<template>
 <div class="profile-preview">
   <TheAvatar :avatar="getAvatar"/>
   <div class="profile-preview__info">
     <h3 class="profile-preview__nickname">
       {{user?.user_metadata.name}}
     </h3>
     <p class="profile-preview__account">
       Мой аккаунт
     </p>
   </div>
 </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const getAvatar = computed<string>(() => user?.value?.user_metadata.avatars ? user?.value?.user_metadata.avatars : " ");

</script>

<style lang="scss" scoped>
.profile-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: $white;
  cursor: pointer;
  padding: 2rem 2rem;
  border-bottom:1px solid #36373f;
  font-weight: 700;
  &__account {
    color: $text-received-color;
    margin-top: 0.5rem;
  }
}
</style>
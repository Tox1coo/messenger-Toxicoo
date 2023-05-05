<template>
  <nav class="nav">
    <ActiveBar :active-bar="getActiveLink" />
    <div class="nav-list">
      <NavBarElement @changeActiveBar="changeActiveBar" v-for="linkIcon in elementIcons" :key="linkIcon.title" :link-bar="linkIcon"/>
    </div>
    <div class="nav-avatar">
      <TheAvatar :avatar="getAvatar"/>
    </div>
  </nav>
</template>

<script setup lang="ts">

const elementIcons:LinkNavBar[] = [
  {
    icon_name: 'majesticons:messages',
    link_page: "/",
    title: "Сообщения"
  },
  {
    icon_name: 'material-symbols:supervisor-account-sharp',
    link_page: "/friends",
    title: "Друзья"
  },
  {
    icon_name: 'ic:sharp-settings',
    link_page: "/",
    title: "Настройки"
  },
];
const user = useSupabaseUser();
let activeLink: LinkNavBar = $ref({
  icon_name: 'majesticons:messages',
  link_page: "/",
  title: "Сообщения"
});
const getActiveLink = computed<LinkNavBar>(() =>  activeLink);
let changeActiveBar = (linkBar: LinkNavBar):void => {
  activeLink = linkBar;
}
const getAvatar = computed<string>(() => user.value?.user_metadata.avatars ? user.value?.user_metadata.avatars : '')
</script>

<style lang="scss" scoped>
.nav {
  height: 100vh;
  width: 10rem;
  border-right:1px solid #36373f;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  flex-direction: column;
  background-color: $primary-background;

  &-list {
    flex: 1 1 55%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 2rem;
  }
  &-avatar {
    flex: 1 1 70%;
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
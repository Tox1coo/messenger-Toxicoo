<template>
  <div :title="activeBar.title" class="nav-active">
    <NuxtLink :to="activeBar.link_page">
      <Icon :name="activeBar.icon_name" :size="'37'"/>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  activeBar: {
    type: Object as () => LinkNavBar,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.nav-active {
  width: 7rem;
  height: 7rem;
  border: 4px solid #7DB9C2;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  flex-shrink: 0.2;
}
svg {
  color: #0048ff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
<template>
  <div :class="{'online': online, 'offline': !online}" class="read-status"></div>
</template>

<script setup lang="ts">
defineProps({
  online: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.read-status {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 2px;
}

.offline {
  background-color: $read-background;
}
.online{
  background-color: $correct;
}
</style>
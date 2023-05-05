<template>
  <div v-for="item in count" :key="item" :class="{'is-read': isRead, 'not-read': !isRead}" class="read-status"></div>
</template>

<script setup lang="ts">
defineProps({
  count: {
    type: Number,
    default: 1
  },
  isRead: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.read-status {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.not-read {
  background-color: $read-background;
}
.is-read{
  background-color: $unread-background;
}
</style>
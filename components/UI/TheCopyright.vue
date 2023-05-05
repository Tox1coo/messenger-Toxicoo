<template>
  <div class="copyright">
    <p>@ {{$t('copyright.right')}}</p>
    <p>{{$t('copyright.developer')}}</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import "assets/styles/mixins";
  .copyright {
    color: #fff;
    p {
      @include adaptive-font(15,13);
      &:not(:first-child) {
        margin-top: 1rem;
      }
    }
  }
</style>
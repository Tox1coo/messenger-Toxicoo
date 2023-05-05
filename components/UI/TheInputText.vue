<template>
  <div>
    <input :value="modelValue" ref="input" :class="{'input--error': isError, 'input--correct': !isInvalid}" :type="typeInput" @input="$emit('update:modelValue', $event.target.value),$emit('changeValue', $event.target.value)" :placeholder="placeholderInput" class="input">
    <slot />
  </div>
</template>

<script setup lang="ts">

const input = ref<HTMLInputElement | null>(null);
let isVisiblePassword = $ref<boolean>(false)
  defineProps({
    modelValue: {
      type: String,
      required: false,
      default: ''
    },
    typeInput: {
      type: String,
      default: 'text'
    },
    placeholderInput: {
      type: String,
      default: 'Enter the text'
    },
    isError: {
      type: Boolean,
      default: false
    },
    isInvalid: {
      type: Boolean,
      default: false
    }
  })



</script>

<style lang="scss" scoped>
div {
  position: relative;
}
.input {
  width: 100%;
  height: auto;
  min-height: 7rem;
  padding-left: 3rem;
  font-size: 2rem;
  font-family: Roboto sans-serif;
  position: relative;
  color: $white;
  background-color: $received-message-background;
  &:focus {
    outline: transparent;
  }
  &--error {
    border: 2px solid red !important;
    animation-name: shake;
    animation-direction: alternate;
    animation-fill-mode: forwards;
    animation-iteration-count: 2;
    animation-duration: 0.35s;
  }
  &--correct {
    border: 2px solid $correct !important;
  }
}

@keyframes shake  {
  0%{
    transform: translateX(0px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);

  }
}
</style>
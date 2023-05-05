<template>
  <div class="search">
    <TheInputText v-model="search" :placeholder-input="placeholderInput" :is-invalid="true">
      <Icon :size="'20'" :name="'simple-line-icons:magnifier'"/>
    </TheInputText>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  searchVar: {
    type: String,
    required: true
  },
  placeholderInput: {
    type:String,
    default:'Введите никнейм пользователя'
  }
})
let search:string = $ref("");
const emit = defineEmits(['update:searchVar'])
watch(() => search,  (newSearch:string) => {
   emit('update:searchVar', newSearch)
})
</script>

<style lang="scss">
.search {
  border-bottom:1px solid #36373f;
  padding: 3rem 2rem;
  input {
    padding-left: 4rem !important;
    border-radius: 2rem;
    font-size: 1.5rem !important;
  }
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: white;
  }
}
</style>
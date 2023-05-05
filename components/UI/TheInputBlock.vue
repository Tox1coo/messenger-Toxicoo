<template>
  <div class="input-block">
    <label :class="{'required': inputItem?.required}" for="repeat_password">{{placeholderInput}}</label>
    <TheInputText class="input-block__textbox"  :is-invalid="inputItem.$invalid" :is-error="inputItem.$error" name="repeat_password" :type-input="`${typeInput == 'text' ? 'text' : 'password'}`"  :placeholder-input="placeholderInput" v-model="valueInput" @change="inputItem.$touch">
      <Icon size="30" v-if="!inputItem.$invalid || inputItem.$error" class="input-icon" :class="{'is-correct': !inputItem.$invalid, 'not-correct': inputItem.$error}" :name="`heroicons-solid:${!inputItem.$error ? 'check-circle' : 'exclamation'}`"/>
      <Icon class="input-icon__password" @click="showPass" v-if="type == 'password'" size="30" :name="`heroicons:${typeInput === 'password' ? 'eye-20-solid' : 'eye-slash-20-solid'}`"/>
    </TheInputText>

    <span v-if="inputItem.$errors.length" :class="{'not-correct': inputItem.$error}">{{ inputItem.$errors[0].$message}}  {{inputItem.$errors[0]?.$params.min}}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  inputItem: {
    type: Object,
    required: true
  },
  value: {
    type: String,
    required:true
  },
  placeholderInput: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  }
});
let typeInput = $ref<string>(props.type);
let valueInput:string = $ref('');
const emit =  defineEmits( ['update:type-input', 'update:value']);

watch(() => valueInput, () => {
  emit('update:value', valueInput)
})

const showPass = () => {
  typeInput === 'password' ? typeInput = 'text' : typeInput = 'password'
}

</script>

<style lang="scss">
  .input-block {
    label {
      color: $white;
    }
    &__textbox {
      position: relative;
    }
    .input {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
    &:hover {
      .input-icon__password {
        visibility: visible;
        opacity: 1;
      }
      .input-icon {
        visibility: hidden;
        opacity: 0;
      }
    }
  }
  .not-correct {
    display: block;
    margin-bottom: 1rem;
  }
  .input-icon {
    transition: visibility 0.05s ease-in, opacity 0.05s ease-in;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    &__password {
      position: absolute;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0.1s ease-in, opacity 0.1s ease-in;
      cursor: pointer;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  
  .required {
    &::after {
      content: "*";
      display: inline;
      padding-left: 0.5rem;
      color: red;
    }
  }
</style>
<template>
  <div class="error-page animate">
    <div ref="blockGradient" class="error-page__block">
     <p class="error-page__block-status">
       {{error.statusCode}}
     </p>
     <p id="oops">
       Ooooops.
     </p>
     <p class="error-page__block-message">
       {{getErrorMessage}}
     </p>
      <NuxtLink class="btn-gradient" :to="{name: 'index'}"><span>Домой</span></NuxtLink>
   </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['error'])
const blockGradient:Ref<HTMLElement| null> = ref<HTMLElement | null>(null);
onMounted(() => {
  getRandomColor();
  console.log(props.error)
  setInterval(() => {
    getRandomColor();
  },5000)
})
function getRandomColor():void{
  let o = Math.round, r = Math.random, s = 255, deg=360;
  if(blockGradient.value !== null) {
    blockGradient.value.style.boxShadow = `rgb(${o(r()*s)} ${o(r()*s)} ${o(r()*s)} / ${o(r()*100)}%) 0px 1px 100px ${o(r()*100)}px, rgb(${o(r()*s)} ${o(r()*s)} ${o(r()*s)} / ${o(r()*100)}%) 0px 5px 100px ${o(r()*50)}px`
  }
}

const getErrorMessage = computed<string>(() => {
  if(props.error.message.includes('Page not found')) {
    return 'Страница не была найдена';

  }
  return 'Неизвестная ошибка'
})
</script>

<style lang="scss" scoped>
.error-page {
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(#000, 0.75);
  &__block {
    width: 500px;
    height: 500px;
    background-color: rgba(#000, 0.8);
    border-radius: 2rem;
    color: #F1F0FF;
    transition: box-shadow 2s ease;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &-status {
      font-weight: 700;
      font-size: 130px;
      font-family: 'Montserrat', sans-serif;
      background: linear-gradient(180deg, $primary-accent, #f800ff 40%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    #oops {
      font-size: 7rem;
      font-family: 'Caveat', sans-serif;
    }
    &-message {
      margin-top: 1rem;
      font-size: 2rem;
      flex: 1 1 30%;

    }
    .btn-gradient {
      font-size: 2.5rem;
      border: 1px solid #fff;
      position: relative;
      padding: 2rem 3rem;
      overflow: hidden;
      border-radius: 1rem;
      cursor: pointer;
      span {
        font-weight: 700;
        color: transparent;
        -webkit-text-stroke: 1px #fff;
        position: relative;
        z-index: 5;
        letter-spacing: 3px;
      }
      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        border-radius: 90%;
        transform: translate(-50%, -50%) scale3d(0, 0, 0.5);
        background: linear-gradient(45deg, #45728B 30%, #F800FF 90%);
        z-index: 0;
        transition: transform 0.3s ease-in, border-radius 0.2s ease-in 0.2s;
      }
      &:hover {
        &::before {
          transform: translate(-50%, -50%) scale3d(1, 1, 1);
          border-radius: 0;
        }
      }
    }
  }

}

</style>
<template>
  <div class="form-page">
    <div class="form-page__form">
      <div class="form-page__form-title">
        <h2 class="title">Добро пожаловать!</h2>
        <img src="wave-hello.gif" width="50" alt="">

      </div>
      <template v-if="typeForm === 'login'">
        <form @submit.prevent="signIn" class="form">
              <TheInputBlock v-for="inputBlock in inputBlocksLogin" :key="inputBlock.inputItem" :input-item="vLogin$[inputBlock.inputItem]"
                               :placeholder-input="inputBlock.placeholderInput"
                               v-model:value="loginUser[inputBlock.inputItem]"
                               :type="inputBlock.type"/>
            <div class="form-bottom">
              <div class="form-bottom__button">
                <button class="btn">Войти</button>
                <a href="#" class="link">Забыли пароль?</a>
              </div>
              <div class="form-bottom__switcher">
                <p>У вас нет аккаунта? <span @click="typeForm = 'auth'" class="link">Зарегистрироваться</span></p>
              </div>
            </div>
        </form>
      </template>
      <template v-else-if="typeForm === 'auth'">
        <form @submit.prevent="signUp" class="form">
            <TheInputBlock v-for="inputBlock in inputBlocksAuth" :key="inputBlock.inputItem" :input-item="vAuth$[inputBlock.inputItem]"
                             :placeholder-input="inputBlock.placeholderInput"
                             v-model:value="authUser[inputBlock.inputItem]"
                             :type="inputBlock.type"/>
            <div class="form-bottom">
              <div class="form-bottom__button form-bottom__button--center">
                <button class="btn">Зарегистрироваться</button>
              </div>
              <p v-if="isCorrect" class="form-bottom__message is-correct">{{user.correctMessage}}</p>
              <p v-else-if="isError" class="form-bottom__message not-correct">{{user.errorMessage}}</p>
              <div class="form-bottom__switcher">
                <p>У вас есть аккаунт? <span @click="typeForm = 'login'" class="link">Войти</span></p>
              </div>
            </div>
        </form>
      </template>

    </div>
    <img  id="hello-img" src="wave-hello.gif" alt="">
  </div>
</template>

<script setup lang="ts">
const route = useRouter();
definePageMeta({
  middleware: ['protect-login']
})
import {userStore} from "~/store/user/user";

const user = userStore();

let typeForm:string = $ref('login');
import {required, email, minLength, sameAs, helpers, not, numeric, integer, alpha, and} from '@vuelidate/validators';
import useVuelidate from "@vuelidate/core";
const loginUser:LoginUser = $ref({
  email: '',
  password: '',
});

let isError = $ref<boolean>(false);
let isCorrect = $ref<boolean>(false);

const rulesLogin = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Поле обязятальное к заполнению', required),
      email: helpers.withMessage('Неправильный email', email),
    },
    password: {
      required: helpers.withMessage('Поле обязятальное к заполнению', required),
      minLength: helpers.withMessage('Минимальный размер поля 8 символов', minLength(8)),
    },
  }
})
const vLogin$ = useVuelidate(rulesLogin, loginUser);

const authUser:AuthUser = $ref({
  email: '',
  nickname: '',
  repeatPassword: '',
  password: '',
});

const rulesAuth = computed(() => {
  return {
    nickname: {
      required: helpers.withMessage('Поле обязятальное к заполнению', required),
    },
    email: {
      required: helpers.withMessage('Поле обязятальное к заполнению', required),
      email: helpers.withMessage('Неправильный email', email),
    },
    password: {
      required: helpers.withMessage('Поле обязятальное к заполнению', required),
      minLength: helpers.withMessage('Минимальный размер поля 8 символов', minLength(8)),
    },
    repeatPassword: {
      required: helpers.withMessage('Поле обязятальное к заполнению', required),
      sameAs: helpers.withMessage('Поля должны быть одинаковыми', sameAs(authUser.password)),
      minLength: helpers.withMessage('Минимальный размер поля 8 символов', minLength(8)),
    },
  }
})
const vAuth$ = useVuelidate(rulesAuth, authUser);

const inputBlocksAuth = [
  {
    placeholderInput: 'Введите никнейм',
    inputItem: 'nickname',
    type: 'text'
  },
  {
    placeholderInput: 'Введите email',
    inputItem: 'email',
    type: 'text'
  },
  {
    placeholderInput: 'Введите пароль',
    inputItem: 'password',
    type: 'password'
  },
  {
    placeholderInput: 'Повторите пароль',
    inputItem: 'repeatPassword',
    type: 'password'
  }
];
const inputBlocksLogin = [
  {
    placeholderInput: 'Введите email',
    inputItem: 'email',
    type: 'text'
  },
  {
    placeholderInput: 'Введите пароль',
    inputItem: 'password',
    type: 'password'
  },

];
let isLoading:boolean = $ref(false);
const signIn = async ():Promise<void> => {
    isLoading = true;

    const result = await vLogin$.value.$validate()
    if(result) {
      isError = await user.signIn(loginUser)
      if(!isError) {
        isCorrect = true;
        route.push('/');
      }
    } else {
      isLoading = false;
    }
}
const signUp = async ():Promise<void> => {
  isLoading = true;

  const result = await vAuth$.value.$validate()
  if(result) {
    isError = await user.signUp(authUser)
    if(!isError) {
      isCorrect = true;
      setTimeout(() => {
        typeForm = "login"
      },1000)
    }

  } else {
    isLoading = false;
  }
}
</script>

<style lang="scss">
/*.slide-left-enter-active,
.slide-left-leave-active, {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}*/

#hello-img {
  max-width: 40rem;
}
.form-page {
  min-height: 100vh;
  display: flex;
  max-width: 140rem;
  min-width: 140rem;
  margin: 0 auto;
  align-items: center;
  gap: 5rem;
  padding: 3rem 2rem;
  &__form {
    flex: 0 0 55%;
    &-title {
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        margin-right: 1rem;
      }
      img {
        position: relative;
        top: -10px;
        display: none;
      }
    }
    .title {
      margin-bottom: 2rem;
      text-align: center;
    }
    .form {
      border-radius: 3rem;
      padding: 3rem;
      background-color: rgba($secondory-accent, 0.3);
      .input {
        border-radius: 1rem;
      }
      &-bottom {
        color: $white;
        margin-top: 2rem;
        text-align: center;
        &__message {
          margin-top: 1rem;
        }
        &__button{
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          .btn {
            flex: 0 1 60%;
          }
          &--center {
            justify-content: center;
            align-items: center;
          }
        }
        &__switcher {
          margin-top: 1.5rem;

          p {
            text-align: center;

          }
        }
      }
    }
    .link {
      cursor: pointer;
      color: $read-background;
     }

  }
}

</style>
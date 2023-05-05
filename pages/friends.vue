<template>
  <div class="friends">
    <div class="friends-left">
      <TheButton v-for="button in buttonList" :key="button.type" :class="{'btn--active': barFriends === button.type}" @eventClick="barFriends = button.type">
        {{button.text}}
        <div v-if="button.type !== 'strangers'" class="count">
          {{userStorage.getAllFriends(button.type).length}}
        </div>
      </TheButton>

    </div>
    <div class="friends-right">
      <form v-if="barFriends !== 'strangers'" @submit.prevent class="friends-search">
        <Search v-model:search-var="friend" :placeholder-input="'Введите никнейм друга'"/>
      </form>
      <form v-else-if="barFriends === 'strangers'" @submit.prevent class="friends-search">
        <Search v-model:search-var="person"/>
      </form>
      <PersonList v-if="barFriends !== 'strangers'" :user-list="userStorage.getAllFriends(barFriends)"/>
      <PersonList v-else :user-list="db.getPersonList"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {userStore} from "~/store/user/user";
import {useDatabaseStore} from "~/store/database/db";
const { $io } = useNuxtApp();
const user = useSupabaseUser();
const userStorage = userStore();
interface ButtonFriends {
  text: string,
  type: string,
}

const buttonList:ButtonFriends[] = [
  {
    type:'friends',
    text: 'Список друзей',
  },
  {
    type:'pending',
    text: 'Подписки',

  },
  {
    type:'received',
    text: 'Подписчики',
  },
  {
    type:'strangers',
    text: 'Найти друзей',
  },
]
useHead({
  title: "Друзья"
})
let friend:string = $ref("");
let person:string = $ref("");
let barFriends: string = $ref('friends');
const db = useDatabaseStore();

const getFriends = computed(() => {
  return userStorage.getAllFriends(barFriends);
});


onMounted(() => {
  $io.emit("userConnected", user.value?.id)

  $io.on('updateUserStatus', (clients:Client[]) => {
    console.log(clients)
  })
  userStorage.getFriendsUser();

})
watch(() => person, async (personName: string) => {
  db.personName = personName;
   await db.searchPerson();
})
watch(() => barFriends, (newValueState:string) => {
 if(newValueState !== 'strangers') {
    person ="";
  }  else {
    friend = "";
  }
})
/*
const getFriendForType = computed<FriendPreview[]>(() => {

  return userStorage.getSubscribersList
})*/

</script>

<style lang="scss" scoped>
.friends {
  background-color: $primary-background;
  display: flex;
  flex: 1;
  justify-content: space-between;
  &-left {
    flex:1 1 25%;
    padding: 3rem;
    .btn {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }
  &-right {
    flex: 0 1 75%;
    border-left: 1px solid #36373f;
  }
}
</style>
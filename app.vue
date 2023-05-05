<template>
  <main class="main">
    <NavBar v-if="route.name !== 'login'"></NavBar>
    <NuxtPage/>
    <div class="notifications">
      <Notification v-for="notification in getNotifications" :key="notification.nameUser + notification.userId + notification.typeMessage" :data-notification="notification"/>
    </div>
  </main>
</template>

<script lang="ts" setup>
const route = useRoute();
const {$io} = useNuxtApp();
// let title:string = $ref('Новое сообщение от Toxicoo');

// let visible = false

const dataNotification: MessageNotification[] = $ref([]);
$io.on("NotificationMessage", ((data:MessageNotification) => {
  dataNotification.push(data);
  setTimeout(() => {
    dataNotification.splice(0,1);
    console.log(dataNotification)
  },5000)
/*  visible = true;
  setTimeout(() => {
    visible = false
  },1000)*/
  /*if(data.typeMessage === 'message') {
    dataNotification.push();
    // title = `У вас новое сообщение от ${data.nameUser}`;
  } else {
    dataNotification.push();
    // title = `У вас новый запрос в друзья!`;
  }*/


}))
const getNotifications = computed<MessageNotification[]>(() => dataNotification)
</script>


<style lang="scss" scoped>
.notifications {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
</style>
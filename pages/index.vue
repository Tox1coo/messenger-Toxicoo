<template>
  <BlockChats/>
  <TheButton>Клик</TheButton>
</template>

<script setup lang="ts">

const { $io } = useNuxtApp();
const user = useSupabaseUser();

useHead({
  title: "Сообщения"
})

onMounted(() => {
  $io.emit("userConnected", user.value?.id)
})

/*const sendMessage = () => {
  console.log('Click');
  $io.emit("message", "new message sent");
  $io.on("message", (mes:string) => {
    console.log(mes)
  });
  $io.emit('sendMessage', () => console.log("log"));


};*/


</script>

<style lang="scss" scoped>

</style>
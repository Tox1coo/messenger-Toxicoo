<template>
  <div class="avatar-wrapper">
    <div class="avatar">
      <nuxt-img loading="lazy" :src="urlAvatar"/>
    </div>
    <TheOnlineStatus v-if="visibleOnline" :online="online" />
  </div>

</template>

<script setup lang="ts">
import {useDatabaseStore} from "~/store/database/db";

const props = defineProps({
  avatar: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  },
  visibleOnline: {
    type: Boolean,
    default: true
  }
})
const db = useDatabaseStore();
let urlAvatar:string = $ref(' ');
onMounted(async () => {
  urlAvatar = await db.getAvatarUser(props.avatar) || "";
  if(urlAvatar == undefined) {
    urlAvatar = ""
  }
  console.log(urlAvatar)
})
const getAvatar = computed<string>(() => urlAvatar);
</script>

<style lang="scss" scoped>
.avatar {
  width: 70px;
  border-radius: 50%;
  overflow: hidden;
  &-wrapper{
    position: relative;
  }
  img {
    width: 100%;

  }
}

</style>
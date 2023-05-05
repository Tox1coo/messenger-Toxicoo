<template>
  <div @click="setAction" :title="buttonAction.tool_tip" :class="buttonAction.class_name" class="action__item action__friend">
    <Icon :size="buttonAction.size" :name="buttonAction.icon_name"></Icon>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {socketStore} from "~/store/socket/socket";
import {userStore} from "~/store/user/user";
const sockets = socketStore()

const props = defineProps({
  buttonAction: {
    type: Object as PropType<ButtonAction>,
    required: true
  },
  personUUID: {
    type: String,
    required: true
  },
  personId: {
    type: Number,
    default: 0,
  }
})
const user = userStore();
const setAction = async ():Promise<void> => {
  switch (props.buttonAction?.type) {
    case "message": {
      console.log(2)
      break;
    }
    case "friends": {
      await user.actionWithFriends("deleteFriend",props.personId, props.personUUID);
      sockets.sendMessage("Удаление из друзей",`Пользователь ${useSupabaseUser().value?.user_metadata.name} удалил вас из друзей`, props.personUUID, "friend" )
      break
    }
    case "pending": {
      await user.actionWithFriends("cancelRequest",props.personId, props.personUUID);
      sockets.sendMessage("Отмена заявки в друзья",`Пользователь ${useSupabaseUser().value?.user_metadata.name} отменил заявку в ваши друзья`, props.personUUID, "friend")
      break
    }
    case "strangers": {
      await user.actionWithFriends("sendRequest",props.personId, props.personUUID);
      sockets.sendMessage("Запрос в друзья",`Пользователь ${useSupabaseUser().value?.user_metadata.name} хочет вас добавить в друзья`, props.personUUID, "friend" )

      break
    }
    case "received": {
      await user.actionWithFriends("acceptRequest",props.personId, props.personUUID);
      sockets.sendMessage("Принятие заявки",`Пользователь ${useSupabaseUser().value?.user_metadata.name} принял ваш запрос в друзья`, props.personUUID, "friend" )
      break
    }
  }
}
</script>

<style lang="scss" scoped>
.action {

  &__item {
     width: 5rem;
     height: 5rem;
     border: 1px solid $white;
     border-radius: 50%;
     position: relative;
     cursor: pointer;
   }
  svg {
    color: $white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__friend {
    &--friend {
       background-color: rgba($correct, 0.5);
      svg {
        color: $white
      }
    }
      &--waiting {
         background-color: rgba(#E3AA20FF, 0.5);
        svg {
          color: $white
        }
    }
  }
}
</style>
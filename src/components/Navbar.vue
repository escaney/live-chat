<template>
  <nav v-if="user">
    <div class="details">
      <p>Hey there... {{ user.displayName }}</p>
      <p class="email">Currently logged in as... {{ user.email }}</p>
    </div>
    <button @click="handleLogout">Log out</button>
  </nav>
</template>

<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";

import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter()
    const { logout, error } = useLogout()
    const { user } = getUser() 

    const handleLogout = async () => {
      await logout()
      if(!error.value) {
        router.push({ name: 'Welcome' })
      }
    }

    return { error, handleLogout, user, router }
  }
}
</script>

<style lang="scss">
  nav {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center; 

    @media (min-width: 500px) {
      padding: 20px;
    }
  }

    p {
      margin: 2px auto;
      font-size: 16px;
      color: #444;

      &.email {
        font-size: 14px;
        color: #999;
      }
    }
</style>
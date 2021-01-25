<template>
  <form @submit.prevent="handleLogin">
    <input type="email" id="email" placeholder="email" required v-model="email">

    <input type="password" id="password" placeholder="password" required v-model="password">
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from "@/composables/useLogin";

export default {
  setup(props, context) {
    const email = ref('')
    const password = ref('')

    const { error, login } = useLogin()

    const handleLogin = async () => {
      await login(email.value, password.value)

      if(!error.value) {
        context.emit('login')
      }
    }

    return { email, password, handleLogin, error }
  }
}
</script>

<style>

</style>
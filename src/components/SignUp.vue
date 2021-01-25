<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" id="username" placeholder="username" required v-model="username">

    <input type="email" id="email" placeholder="email" required v-model="email">

    <input type="password" id="password" placeholder="password" required v-model="password">
    
    <div class="error">{{ error }}</div>

    <button>Sign Up</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from "@/composables/useSignup";

export default {
  setup(props, context) {
    const username = ref('')
    const email = ref('')
    const password = ref('')

    const { error, signup } = useSignup()

    const handleSubmit = async () => {
      await signup(email.value, password.value, username.value)
      
      if(!error.value) {
        context.emit('signup')
      }
    }

    return { username, email, password, handleSubmit, error }
  }
}
</script>

<style>

</style>
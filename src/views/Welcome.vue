<template>
  <div class="welcome container">
    <p>Welcome</p>
    <div v-if="showLogin">
      <h2>Log in</h2>
      <Login @login="enterChat"/>
      <p>No account yet? <span class="switch-span" @click="showLogin = !showLogin">Sign up</span> instead</p>
    </div>
    <div v-else>
      <h2>Sign up</h2>
      <SignUp @signup="enterChat"/>
      <p>Already registered? <span class="switch-span" @click="showLogin = !showLogin">Log in</span> instead</p>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import { ref } from 'vue';
import { useRouter } from "vue-router";



export default {
  name: 'Home',
  components: { Login, SignUp },

  setup() {
    const router = useRouter()
    const showLogin = ref(true)

    const enterChat = () => {
      router.push({ name: 'Chatroom'})
    }

    return { showLogin, enterChat }
  }
}
</script>

<style>
  .welcome {
    text-align: center;
    padding: 20px 0;
  }

  .switch-span {
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }
</style>

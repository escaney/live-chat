<template>
  <form>
    <textarea
    placeholder="Type a message and hit return"
    v-model="message"
    @keypress.enter.prevent="handleSubmit"
    >
    </textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from "@/firebase/config";

export default {
  setup() {
    const message = ref('')
    const { user } = getUser()
    const { addDoc, error } = useCollection('messages')

    const handleSubmit = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value.trim(),
        createdAt: timestamp()
      }
      
      await addDoc(chat)

      if(!error.value) {
        message.value = ''
      }
    }

    return { message, handleSubmit, user, error }
  }
}
</script>

<style scoped>
  form {
    width: 95%;
    padding: 20px 0;
    margin-top: 0;
  }

  textarea {
    width: 100%;
    max-width: 100%;
    padding: 10px;
    box-sizing: border-box;
    outline: none;
    border: 2px solid #333;
  }
</style>
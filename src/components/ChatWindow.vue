<template>
  <div class="chat-window">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }}</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, ref, onUpdated } from 'vue';

export default {
  setup() {
    const { error, documents } = getCollection('messages')

    const formattedDocuments = computed(() => {
      if(documents.value) {
        return documents.value.map(doc => {
          let time = formatDistanceToNow(doc.createdAt.toDate())
          return { ...doc, createdAt: time }
        })
      }
    })

    // auto-scroll to bottom of messages
    const messages = ref(null)

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight
    })

    return { error, documents, formattedDocuments, messages }
  }
}
</script>

<style>
  .chat-window {
    background-color: #e3e1ff;
    padding: 10px;
    border-radius: 20px;
    margin: 0 20px;

    @media (min-width: 500px) {
      margin: 20px;
    }
  }

  .messages {
    max-height: 500px;
    overflow: auto;
  }

  .single {
    padding: 10px;
    border-bottom: 5px solid white;
  }

  .single:last-child {
    border: none;
  }

  span {
    display: inline-block;
    margin-right: 10px;
    font-size: 15px;
  }

  .created-at {
    display: block;
    font-size: 10px;
    margin-bottom: 5px;
  }

  .name {
    font-weight: bold;
    font-size: 12px;
    letter-spacing: .9px;
    margin-right: 20px;
  }

  .message {
    font-family: monospace;
    font-size: 17px
  }
</style>
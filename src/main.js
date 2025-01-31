import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@/assets/main.scss";

// listen for init auth status
import { projectAuth } from "@/firebase/config";

let app

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount('#app')
  }
})


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/style.css'
import App from '@/App.vue'

// アプリケーションインスタンスを作成
const app = createApp(App)

// Piniaの設定
app.use(createPinia())

// アプリケーションをマウント
app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Calendar, Field, Form} from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(Form)
app.use(Field)
app.use(Calendar)
app.mount('#app')